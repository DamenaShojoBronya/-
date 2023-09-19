<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form ref="form"
                 :model="form"
                 size="mini"
                 inline
                 label-width="120px">
          <el-form-item label="原料名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-button type="primary"
                     size="mini"
                     @click="confirmQuery">查询</el-button>
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
          <el-table-column prop="content"
                           label="分类"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="名称"
                           width="180">
          </el-table-column>

          <el-table-column prop="amount"
                           label="数量"
                           width="180">
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
                         @click="update(scope.$index,scope.row)">修改</el-button>

              <el-button size="small"
                         @click="showDel(scope.$index,scope.row)">删除</el-button>
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

    <el-dialog :title="title"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>

      <div class="grid-content bg-purple-dark">

        <el-form ref="form"
                 :model="form1"
                 label-width="80px">
          <el-form-item label="物料名称">
            <el-input v-model="form1.name"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number v-model="form1.amount"
                             :min="1"
                             :max="10000000000"></el-input-number>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="form1.content"></el-input>
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
  getMatlistList,
  addMatlist,
  delMatlist,
  updMatlist,
} from "@/services/app.js";
export default {
  data() {
    return {
      title: "",
      form1: {
        name: "",
        amount: 0,
        content: "",
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
    this.getMaterialList();
  },
  methods: {
    // 修改
    update(index, row) {
      this.centerDialogVisible = true;
      this.form1 = {
        name: row.name,
        amount: row.amount,
        content: row.content,
      };
      this.selectRow = row;
      this.title = "修改";
    },
    // 删除
    showDel(index, row) {
      delMatlist({ materiallistid: row.materiallistid }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.page.currentPage = 1;
          console.log("百度");
          this.getMaterialList();
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
        name: "",
        amount: 0,
        content: "",
      };
      this.title = "新增";
    },
    // 确定
    confirmBtn() {
      if (!this.form1.name) {
        this.$message({
          message: `请输入物料名`,
          type: "warning",
        });
        return;
      } else if (!this.form1.amount) {
        this.$message({
          message: `数量需要大于0`,
          type: "warning",
        });
        return;
      }

      if (this.title == "新增") {
        addMatlist(this.form1).then((res) => {
          console.log("res0", res);
          if (res.code == 200) {
            this.$message({
              message: `新增成功`,
              type: "success",
            });
            this.centerDialogVisible = false;
            this.getMaterialList();
          }
        });
      } else {
        let params = { ...this.form1 };
        params.materiallistid = this.selectRow.materiallistid;
        updMatlist(params).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: `修改成功`,
              type: "success",
            });
            this.centerDialogVisible = false;
            this.getMaterialList();
          }
        });
      }
    },
    confirmQuery() {
      this.page.currentPage = 1;
      this.getMaterialList();
    },
    // 获取原料列表
    getMaterialList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pagesize,
      };
      params.name = this.form.name;
      getMatlistList(params).then((res) => {
        console.log(res, "这个是res123");
        this.tableData = res.data.datalist.records;
        this.page.total = res.data.datalist.total;
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