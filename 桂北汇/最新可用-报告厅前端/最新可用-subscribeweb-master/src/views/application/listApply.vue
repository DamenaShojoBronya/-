<template>
   
  <div class="app-container">
    <div class="table-container">
      <el-card class="filter-container" shadow="never">
        <el-button type="primary" style="background-color: #0086b3" @click="exportExcel">导出</el-button>
        <el-button type="primary" style="background-color: #1cd66c" @click="handleCommand">默认排序</el-button>
        <el-button type="primary" style="background-color: #0086b3" @click="timeDescSort">时间降序</el-button>
        <el-button type="primary" style="background-color: #0086b3" @click="timeAscSort">时间升序</el-button>
        <el-button type="primary" style="background-color: #0086b3" @click="todaySort">筛选当天</el-button>
        <!-- <el-button type="primary" style="background-color: #0086b3" @click="timeSotr">时间排序</el-button> -->


        <div style="margin-left: 90%">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">状态筛选<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">未处理</el-dropdown-item>
              <el-dropdown-item command="1">已处理</el-dropdown-item>
              <el-dropdown-item command="2">全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-card>
      <el-table id="outTable" ref="adminTable" :data="applyList" style="width: 100%; margin: 0 auto"
        v-loading="listLoading" border>
        <el-table-column label="编号" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="借用单位" width="120" align="center">
          <template slot-scope="scope">{{
            borrowUnitMap.get(scope.row.borrowId)
          }}</template>
        </el-table-column>
        <el-table-column label="借用时间" width="185" align="center">
          <template slot-scope="scope">{{
            formatDateTime(scope.row.beginTime, scope.row.endTime)
          }}</template>
        </el-table-column>
        <el-table-column label="场地" width="110" align="center">
          <!--          <template slot-scope="scope">{{(scope.row.placeId == 1?'西区报告厅':scope.row.placeId == 2?'东区报告厅':'体育馆报告厅')}}</template>-->
          <template slot-scope="scope">{{
            placeMap.get(scope.row.placeId)
          }}</template>
        </el-table-column>
        <el-table-column label="会议内容" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.meetingContent }}</template>
        </el-table-column>
        <el-table-column label="字幕文字" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="借用人" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.borrower }}</template>
        </el-table-column>
        <el-table-column label="联系方式" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.telephone }}</template>
        </el-table-column>
        <el-table-column label="审批领导" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.approvalLeader }}</template>
        </el-table-column>
        <el-table-column label="借用单位意见" width="110" align="center">
          <template slot-scope="scope">{{
              scope.row.borrowOpinion == 1
                ? "已同意"
                : scope.row.borrowOpinion == 2
                ? "已拒绝"
                : "未处理"
            }}
          </template>
        </el-table-column>
        <el-table-column label="审批单位意见" width="110" align="center">
          <template slot-scope="scope">{{
              scope.row.approvalOpinion == 1
                ? "已同意"
                : scope.row.approvalOpinion == 2
                ? "已拒绝"
                : "未处理"
            }}
          </template>
        </el-table-column>
        <el-table-column label="申请进度" width="110" align="center">
          <template slot-scope="scope">{{
              scope.row.processingProgress == 0
                ? "单位初审中"
                : scope.row.processingProgress == 1
                ? "终审中"
                : scope.row.processingProgress == 2
                ? "已同意"
                : "已拒绝"
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="applyUpdate(scope.row)">同意
            </el-button>
            <el-button size="mini" type="text" @click="applyUpdate1(scope.row)">拒绝
            </el-button>
            <el-button size="mini" type="text" @click="handleUpdate(scope.row)">预览打印
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize" :page-sizes="[100,10, 15, 20,]" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    fetchApplyList,
    getInfo
  } from "@/api/login";
  import {
    formatDate
  } from "@/utils/date";
  import {
    fetchList,
    fetchOldList,
    fetchAllList,
    fetchAllPlace,
    fetchAllBorrowUnit,
    applyUpdate,
    applyUpdate1,
  } from "@/api/approvalUnit";
  import {
    fetchListApply,
    fetchOldListApply,
    fetchAllListApply,
  } from "@/api/userApply";
  import FileSaver from "file-saver";
  import XLSX from "xlsx";

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 100,
  };
  const defaultAdmin = {
    id: null,
    username: null,
    password: null,
    nickName: null,
    email: null,
    note: null,
    status: 1,
  };
  export default {
    name: "adminList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        applyList: null,
        applyOldList: null,
        total: null,
        userFlag: null,
        placeList: null,
        placeName: null,
        placeMap: null,
        borrowUnitList: null,
        borrowUnitMap: null,
        listStatus: null,
        timeSotr: null
      };
    },
    created() {
      this.getApplyList();
      this.handleCommand();
    },

    methods: {
      // 默认排序
      defaultSort() {

      },

      // 默认时间降序排序
      timeDescSort() {
        var list = this.applyList.slice(0)
        for (var i = 0; i < list.length - 1; i++) {
          // 内层循环,控制比较的次数，并且判断两个数的大小
          for (var j = 0; j < list.length - 1 - i; j++) {
            // 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
            if (list[j].beginTime < list[j + 1].beginTime) {
              var temp = list[j];
              list[j] = list[j + 1];
              list[j + 1] = temp;
            }
          }
        }
        this.applyList = list
        // console.log(this.applyList, list)
      },

      // 默认时间升序排序
      timeAscSort() {
        var list = this.applyList.slice(0)
        for (var i = 0; i < list.length - 1; i++) {
          // 内层循环,控制比较的次数，并且判断两个数的大小
          for (var j = 0; j < list.length - 1 - i; j++) {
            // 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
            if (list[j].beginTime > list[j + 1].beginTime) {
              var temp = list[j];
              list[j] = list[j + 1];
              list[j + 1] = temp;
            }
          }
        }
        this.applyList = list
      },

      // 筛选当天数据
      todaySort() {
        // 一天的毫秒数量
        var days = 86400000;
        var list = this.applyList.slice(0)
        var tem = [];
        for (var i = 0; i < list.length; i++) {
          var time = Date.parse(new Date()) - list[i].beginTime;
          if (time > 0 && time < days) {
            tem.push(list[i]);
            console.log("当天" + i);
          }
        }
        this.applyList = tem.slice();
      },

      exportExcel() {
        var xlsxParam = {
          raw: true,
        }; //转换成excel时，使用原始的格式
        var wb = XLSX.utils.table_to_book(
          document.querySelector("#outTable"),
          xlsxParam
        );
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], {
              type: "application/octet-stream;charset=utf-8",
            }),
            "申请表.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },

      getApplyList() {
        this.listLoading = true;
        getInfo().then((response) => {
          this.userFlag = response.data.roles;

          fetchAllPlace().then((response) => {
            this.placeList = response.data;
            var map = new Map();
            for (let i = 0; i < this.placeList.length; i++) {
              map.set(this.placeList[i].id, this.placeList[i].name);
            }
            this.placeMap = map;
            fetchAllBorrowUnit().then((response) => {
              this.borrowUnitList = response.data;
              var map = new Map();
              for (let i = 0; i < this.borrowUnitList.length; i++) {
                map.set(
                  this.borrowUnitList[i].id,
                  this.borrowUnitList[i].department
                );
              }
              this.borrowUnitMap = map;
            });
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.handleCommand(this.listStatus);
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.handleCommand(this.listStatus);
      },
      handleUpdate(apply) {
        this.$router.push({
          name: "application", //跳转的页面
          params: {
            applyObj: apply, //我们要传递的参数
            placeMap: this.placeMap,
            borrowUnitMap: this.borrowUnitMap,
          },
        });
      },
      applyUpdate(row) {
        console.log(row);
        this.$confirm("是否要审批?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            applyUpdate(row).then((response) => {
              this.$message({
                type: "success",
                message: "审批成功!",
              });
              this.handleCommand();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消审批",
            });
          });
      },
      applyUpdate1(row) {
        console.log(row);
        this.$confirm("是否要审批?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            applyUpdate1(row).then((response) => {
              this.$message({
                type: "success",
                message: "审批成功!",
              });
              this.handleCommand();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消审批",
            });
          });
      },
      formatDateTime(beTime, enTime) {
        if (beTime == null || beTime === "") {
          return "N/A";
        }
        var beginTime = formatDate(new Date(beTime), "MM 月 dd 日 hh 时 mm 分 ");
        var endTime = formatDate(new Date(enTime), "MM 月 dd 日 hh 时 mm 分 ");

        return beginTime + "至" + endTime;
      },
      handleCommand(command) {
        this.listLoading = true;
        getInfo().then((response) => {
          this.userFlag = response.data.roles;
          if (this.userFlag[0] === "普通用户") {
            if (command === "0") {
              fetchListApply(this.listQuery).then((response) => {
                this.listLoading = false;
                this.applyList = response.data.list;
                this.total = response.data.total;
                this.listStatus = "0";
              });
            } else if (command === "1") {
              fetchOldListApply(this.listQuery).then((response) => {
                this.listLoading = false;
                this.applyList = response.data.list;
                this.total = response.data.total;
                this.listStatus = "1";
              });
            } else {
              fetchAllListApply(this.listQuery).then((response) => {
                this.listLoading = false;
                this.applyList = response.data.list;
                this.total = response.data.total;
                this.listStatus = "3";
              });
            }
          } else {
            if (command === "0") {
              fetchList(this.listQuery).then((response) => {
                this.listLoading = false;
                this.applyList = response.data.list;
                this.total = response.data.total;
                this.listStatus = "0";
              });
            } else if (command === "1") {
              fetchOldList(this.listQuery).then((response) => {
                this.listLoading = false;
                this.applyList = response.data.list;
                this.total = response.data.total;
                this.listStatus = "1";
              });
            } else {
              fetchAllList(this.listQuery).then((response) => {
                this.listLoading = false;
                this.applyList = response.data.list;
                this.total = response.data.total;
                this.listStatus = "3";
              });
            }
          }
        });
      },
    },
  };

</script>


<style>
  .list-layout {
    margin: 0 auto;
    position: relative;
    justify-content: center;
    align-items: center;
    /*right: 140px;*/
    top: 40px;
    width: 90%;
    height: 100%;
  }

  .el-dropdown-link {
    cursor: pointer;
    font-size: medium;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>



// WEBPACK FOOTER //
// src/views/application/listApply.vue
