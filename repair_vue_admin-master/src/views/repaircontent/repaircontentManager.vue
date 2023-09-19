<template>
  <div>

    <el-row>
      <el-col :span="24">
        <el-form ref="form"
                 :model="form"
                 size="mini"
                 inline
                 label-width="80px">
          <el-form-item label="维修号">
            <el-input v-model="form.repairid"></el-input>
          </el-form-item>
          <el-form-item label="学生id">
            <el-input v-model="form.stuid"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号">
            <el-input v-model="form.housenumber"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="confirmQuery">查询</el-button>
          <el-button icon="el-icon-download"
                     @click="exportExcel">导出</el-button>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  stripe
                  id="out-table"
                  style="width: 100%">
          <el-table-column prop="repairid"
                           label="维修ID"
                           width="180">
          </el-table-column>

          <el-table-column prop="stuid"
                           label="学生ID"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="报修人姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="workername"
                           label="维修工人姓名"
                           width="180">
          </el-table-column>

          <el-table-column prop="housenumber"
                           label="维修宿舍号">
          </el-table-column>
          <el-table-column prop="detail"
                           label="详情">
          </el-table-column>

          <el-table-column prop="status"
                           label="状态">
          </el-table-column>
          <el-table-column prop="createtime"
                           label="创建时间">
          </el-table-column>

          <el-table-column prop="updatetime"
                           label="更新时间">
          </el-table-column>
          <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <el-button size="small"
                         type="primary"
                         @click="onDetail(scope.$index,scope.row)">详情</el-button>

              <el-button size="small"
                         v-if="scope.row.status == '申请中'||scope.row.status == '处理中'"
                         type="success"
                         @click="fenpeiWorker(scope.$index,scope.row)">分配维修工人</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page.currentPage"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="page.pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="page.total">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="提示"
               :visible.sync="workerDialogVisible"
               width="30%"
               center>

      <el-form ref="form"
               :model="fenpeiForm"
               size="mini"
               inline
               label-width="80px">
        <el-form-item label="维修工人">
          <el-select v-model="fenpeiValue"
                     placeholder="请选择">
            <el-option v-for="item in workerOptions"
                       :key="item.workerid"
                       :label="item.name"
                       :value="item.workerid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="workerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onFenpeiWorker">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="详情"
               :visible.sync="DialogVisible"
               width="50%"
               append-to-body
               center>

      <el-form ref="form"
               :model="selectRow1"
               size="mini"
               inline
               label-width="120px">
        <el-form-item label="学生ID">
          <el-input v-model="selectRow1.stuid"
                    disabled></el-input>
        </el-form-item>

        <el-form-item label="维修ID">
          <el-input v-model="selectRow1.repairid"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="selectRow1.stuname"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="学生性别">
          <el-input v-model="selectRow1.stusex"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="学生电话">
          <el-input v-model="selectRow1.stuphone"
                    disabled></el-input>
        </el-form-item>

        <el-form-item label="维修工人ID"
                      v-if="selectRow1.workerid">
          <el-input v-model="selectRow1.workerid"
                    disabled></el-input>
        </el-form-item>

        <el-form-item label="联系电话"
                      v-if="selectRow1.phone">
          <el-input v-model="selectRow1.phone"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="维修工人姓名"
                      v-if="selectRow1.workername">
          <el-input v-model="selectRow1.workername"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="维修工人性别"
                      v-if="selectRow1.workersex">
          <el-input v-model="selectRow1.workersex"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="维修工人电话"
                      v-if="selectRow1.workerphone">
          <el-input v-model="selectRow1.workerphone"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="维修宿舍"
                      v-if="selectRow1.housenumber">
          <el-input v-model="selectRow1.housenumber"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="详情"
                      v-if="selectRow1.detail">
          <el-input v-model="selectRow1.detail"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="维修类型"
                      v-if="selectRow1.typename">
          <el-input v-model="selectRow1.typename"
                    disabled></el-input>
        </el-form-item>

        <el-form-item label="维修前图片"
                      v-if="selectRow1.startphoto">
          <div style="display:inline-block;"
               v-for="(item,i) in startSrcList"
               :key="i">
            <el-image style="width: 100px; height: 100px"
                      :z-index='zIndex'
                      :src="startSrcList[i]"
                      :preview-src-list="startSrcList">
            </el-image>
          </div>
        </el-form-item>

        <el-form-item label="维修后图片"
                      v-if="selectRow1.endphoto">
          <div style="display:inline-block;"
               v-for="(item,i) in endSrcList"
               :key="i">
            <el-image style="width: 100px; height: 100px"
                      :z-index='zIndex'
                      :src="endSrcList[i]"
                      :preview-src-list="endSrcList">
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="创建时间"
                      v-if="selectRow1.createtime">
          <el-input v-model="selectRow1.createtime"
                    style="width:100%;"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="维修物料">
          <div v-if="selectRow1.materiralList">
            <div v-for="(item,index) in selectRow1.materiralList"
                 :key="index">
              {{item.name}} * {{item.amount}}
            </div>
          </div>
          <div v-else>暂无</div>
        </el-form-item>

      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onFenpeiWorker">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getRepairList, getWorkerList, updateRepair } from "@/services/app.js";
export default {
  data() {
    return {
      options: [
        { value: "已完成", label: "已完成" },
        { value: "处理中", label: "处理中" },
        { value: "申请中", label: "申请中" },
        { value: "已撤销", label: "已撤销" },
      ],
      zIndex: 10000,
      DialogVisible: false,
      tableData: [],
      fenpeiForm: {},
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
      selectRow: {},
      selectRow1: {},
      workerOptions: [],
      fenpeiValue: "",
      workerDialogVisible: false,
      form: {
        repairid: "",
        stuid: "",
        name: "",
        housenumber: "",
        status: "",
      },
      startSrcList: [],
      startUrl: "",
      endSrcList: [],
      endUrl: "",
    };
  },
  created() {
    this.getRepairList();
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    exportExcel() {
// 导出表格的表头设置
      let allColumns = this.tableData;
      console.log(allColumns,"神奇")
      var columnNames = ['维修ID','学生ID','报修人姓名','维修工人姓名','维修宿舍号','详情','状态','创建时间','更新时间']
      var columnValues = ['repairid','stuid','name','workername','housenumber','detail','status','createtime','updatetime']

      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = columnNames
        const filterVal = columnValues

        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '维修报表')
      })
    },
    // 点击详情查看详细信息
    onDetail(index, row) {
      this.selectRow1 = row;
      this.DialogVisible = true;
      this.startSrcList = this.selectRow1.startphoto.split(",");
      this.startUrl = this.startSrcList[0];
      this.endSrcList = this.selectRow1.endphoto.split(",");
      this.endUrl = this.endSrcList[0];
      console.log(this.startSrcList, "this.startSrcList");
    },
    // 分配工人弹出框
    fenpeiWorker(index, row) {
      console.log(row, "这个是row");
      this.workerDialogVisible = true;
      this.selectRow = row;
      this.fenpeiWorkerType = this.selectRow.status == "申请中" ? 0 : 1;
      this.getWorkerList();
    },
    onFenpeiWorker() {
      if (!this.fenpeiValue) {
        this.$message({
          type: "warning",
          message: "请选择绑定的维修工人",
        });
        return;
      }
      console.log(this.fenpeiValue, "维修共ID");
      console.log(this.selectRow.repairid, "repairid");
      updateRepair({
        status: "处理中",
        repairid: this.selectRow.repairid,
        workerid: this.fenpeiValue,
      }).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "维修工人分配成功",
          });
          this.selectRow = null;
          this.fenpeiValue = "";
          this.workerDialogVisible = false;
          this.page.currentPage = 1;
          this.getRepairList();
        } else {
          this.$message({
            type: "warning",
            message: "维修工人分配失败，请检查",
          });
        }
      });
    },
    getWorkerList() {
      getWorkerList({
        page: 1,
        limit: 1000,
        statu: "正常",
      }).then((res) => {
        this.workerOptions = res.data.datalist.list;
        console.log(res, "这个是resgetWorker");
      });
    },
    confirmQuery() {
      this.page.currentPage = 1;
      this.getRepairList();
    },
    getRepairList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pagesize,
      };
      if (this.form.repairid) {
        params.repairid = this.form.repairid;
      }
      if (this.form.stuid) {
        params.stuid = this.form.stuid;
      }
      if (this.form.name) {
        params.name = this.form.name;
      }
      if (this.form.housenumber) {
        params.housenumber = this.form.housenumber;
      }
      if (this.form.status) {
        params.status = this.form.status;
      }

      getRepairList(params).then((res) => {
        this.tableData = res.data.datalist.list;
        this.page.total = res.data.datalist.total;
      });
    },
    queryDetail(index, row) {},
    handleSizeChange: function (size) {
      this.page.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage;
      this.getRepairList();
      console.log(this.page.currentPage, "this.page.currentPage");
    },
  },
};
</script>

<style>
</style>