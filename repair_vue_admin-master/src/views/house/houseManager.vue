<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form ref="form"
                 :model="form"
                 size="mini"
                 inline
                 label-width="120px">
          <el-button type="success"
                     size="mini"
                     @click="add">新增</el-button>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="buildingnumber"
                           label="宿舍建筑楼"
                           width="180">
          </el-table-column>
          <el-table-column prop="remarks"
                           label="备注"
                           width="180">
          </el-table-column>
          <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <el-button size="small"
                         type="primary"
                         @click="update(scope.$index,scope.row)">修改</el-button>
              <el-button size="small"
                         @click="showDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog :title="title"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>

      <div class="grid-content bg-purple-dark">

        <el-form ref="form"
                 :model="form1"
                 label-width="80px">
          <el-form-item label="宿舍楼(例：3A)">
            <el-input v-model="form1.buildingnumber"></el-input>
          </el-form-item>
          <el-form-item label="remark">
             <el-input v-model="form1.remarks"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getHouseList,
  delHouse,
  addHouse,
  updHouse
} from "@/services/app.js";
export default {
  data() {
    return {
      title: "",
      form1: {
        buildingnumber: "",
        remarks: ''
      },
      form: {
        name: "",
      },
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
      tableData: [],
      centerDialogVisible: false,
      selectRow: {},
    };
  },
  created() {
    this.getHouseList();
  },
  methods: {
    // 修改
    update(index, row) {
      this.centerDialogVisible = true;
      this.form1 = {
        buildingnumber: row.buildingnumber,
        remarks: row.remarks,
        houseid: row.houseid
      };
      this.selectRow = row;
      this.title = "修改";
    },
    // 删除
    showDel(index, row) {
      delHouse({ houseid: row.houseid }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
         
          this.getHouseList();
        } else {
          this.$message({
            message: "删除出问题啦,请注意",
            type: "warning",
          });
        }
      });
    },
    // 新增
    add() {
      this.centerDialogVisible = true;
      this.form1 = {
        buildingnumber: "",
        remarks: ''
      };
      this.title = "新增";
    },
    // 确定
    confirmBtn() {
      if (!this.form1.buildingnumber) {
        this.$message({
          message: `请输入宿舍楼`,
          type: "warning",
        });
        return;
      }

      if (this.title == "新增") {
        addHouse(this.form1).then((res) => {
          console.log("res0", res);
          if (res.code == 200) {
            this.$message({
              message: `新增成功`,
              type: "success",
            });
            this.centerDialogVisible = false;
            this.getHouseList();
          }
        });
      } else {
        let params = { ...this.form1 };
        // params.materiallistid = this.selectRow.materiallistid;
        updHouse(params).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: `修改成功`,
              type: "success",
            });
            this.centerDialogVisible = false;
            this.getHouseList();
          }
        });
      }
    },
    confirmQuery() {
      this.page.currentPage = 1;
      this.getHouseList();
    },
    // 获取原料列表
    getHouseList() {
      getHouseList().then((res) => {
        this.tableData = res.data.datalist;
        console.log(this.tableData, "这个是res123456");
      });
    },
    handleSizeChange: function (size) {
      this.page.pagesize = size;
      console.log(this.page.pagesize, "this.page.pagesize");
    },
    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage;
      this.getMaterialList();
      console.log(this.page.currentPage, "this.page.currentPage");
    },
  },
};
</script>

<style>
</style>