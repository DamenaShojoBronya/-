<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form ref="form"
                 :model="form"
                 size="mini"
                 inline
                 label-width="80px">
          <el-form-item label="学生ID">
            <el-input v-model="form.stuid"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号">
            <el-input v-model="form.housenumber"></el-input>
          </el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="confirmQuery">查询</el-button>

          <el-upload class="upload-demo"
                     :show-file-list=false
                     action=""
                     :on-change="handleChange"
                     :on-exceed="handleExceed"
                     :on-remove="handleRemove"
                     :file-list="fileListUpload"
                     :limit="limitUpload"
                     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                     :auto-upload="false">
            <div style="display:flex;">
              <el-button size="small"
                       type="primary">导入学生信息</el-button>
            <div class="btns">
              <el-link 
                       href="https://www.chendong00.top/%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%28%E8%AF%B7%E5%8A%A1%E5%BF%85%E4%BF%9D%E8%AF%81%E4%BF%A1%E6%81%AF%E6%AD%A3%E7%A1%AE%29.xlsx"
                       :underline="false"
                       style="margin-left:15px">
                <el-button size="mini"
                           type="warning">导入学生模板下载</el-button>
              </el-link>
            </div>
            <div slot="tip"
                 class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
            </div>
            
          </el-upload>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="stuid"
                           label="学号"
                           width="180">
          </el-table-column>

          <el-table-column prop="name"
                           label="姓名">
          </el-table-column>
          <el-table-column prop="sex"
                           label="性别">
          </el-table-column>
          <el-table-column prop="housenumber"
                           label="宿舍号">
          </el-table-column>

          <el-table-column prop="statu"
                           label="状态">
          </el-table-column>
          <el-table-column prop="phone"
                           label="手机号码">
          </el-table-column>
          <el-table-column prop="nickname"
                           label="微信名称">
          </el-table-column>
          <el-table-column prop="role"
                           label="角色">
          </el-table-column>
          <el-table-column prop="headportraits"
                           width="200"
                           label="微信头像">
            <template slot-scope="scope">

              <img :src="scope.row.headportraits"
                   style="width:80px;height:80px;" />

            </template>
          </el-table-column>
          <el-table-column prop="createtime"
                           label="创建时间">
          </el-table-column>

          <el-table-column prop="updatetime"
                           label="更新时间">
          </el-table-column>
          <!-- <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <el-button size="small"
                         type="primary"
                         @click="showDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="this.page.currentPage"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="this.page.pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="page.total">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getStuList, addStus } from "@/services/app.js";
export default {
  data() {
    return {
      form: {
        stuid: "",
        name: "",
        housenumber: "",
      },
      fileListUpload: [],
      limitUpload: 1,
      fileTemp: null,
      tableData: [],
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.getstudentList();
  },
  methods: {
    confirmQuery() {
      this.page.currentPage = 1;
      this.getstudentList();
    },
    getstudentList() {
      getStuList({
        page: this.page.currentPage,
        limit: this.page.pagesize,
        stuid: this.form.stuid || "",
        name: this.form.name || "",
        housenumber: this.form.housenumber || "",
      }).then((res) => {
        console.log(res, "这个是什么");
        if (res.code == 200) {
          this.tableData = res.data.datalist.list;
          this.page.total = res.data.datalist.total;
        }
      });
    },
    showDel(index, row) {},
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      console.log(file, fileList);
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },

    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          console.log(outdata, "这个是我想要的值");

          this.da = [...outdata];
          let arr = [];
          this.da.map((v) => {
            let obj = {};
            obj.name = v["姓名"];
            obj.sex = v["性别"];
            obj.phone = v["手机号码"];
            obj.stuid = v["学号"];
            obj.housenumber = v["宿舍号"];
            obj.stuid = Number(obj.stuid);
            arr.push(obj);
          });

          console.log(arr, "baiduyixia");
          for (let i = 0; i < arr.length; i++) {
            addStus(arr[i]).then((res) => {
              if (res.code == 200) {
                _this.$message({
                  message: `恭喜你，新增第${i + 1}条成功`,
                  type: "success",
                });
              } else {
                _this.$message.error(`错了哦，新增第${i}条失败`);
              }
              if (i == arr.length - 1) {
                _this.getstudentList();
              }
            });
          }
          return arr;
        };

        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    handleExceed() {
      console.log("超过了");
    },
    handleSizeChange: function (size) {
      this.page.pagesize = size;
      console.log(this.page.pagesize, "this.page.pagesize");
    },
    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage;
      this.getstudentList();
      console.log(this.page.currentPage, "this.page.currentPage");
    },
  },
};
</script>

<style>
</style>