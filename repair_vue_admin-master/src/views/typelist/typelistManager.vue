<!--  -->
<template>
  <div class=''>
    <el-row>
      <el-col :span="24">
        <el-form ref="form"
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
          <el-table-column prop="name"
                           label="名称"
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
          <el-form-item label="类型名称">
            <el-input v-model="form1.name"></el-input>
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
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { updType, addType, DelType, getTypeList } from "@/services/app";
export default {
  components: {},
  data() {
    return {
      title: "",
      form1: {
        name: "",
      },
      tableData: [],
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
      centerDialogVisible: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTypeList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    add() {
      this.centerDialogVisible = true;
      this.title = "新增";
      this.form1.name = ''
    },
    confirmBtn() {
      if (!this.form1.name) {
        this.$message({
          message: `请输入类型名称`,
          type: "warning",
        });
        return;
      }
      if (this.title == "新增") {
        addType(this.form1).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: `新增成功`,
              type: "success",
            });
            this.centerDialogVisible = false;
            this.getTypeList();
          }
        });
      } else {
        let params = { ...this.form1 };
        params.typeid = this.selectRow.typeid;
        updType(params).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: `修改成功`,
              type: "success",
            });
            this.centerDialogVisible = false;
            this.getTypeList();
          }
        });
      }
    },
    update(index, row) {
      this.selectRow = row;
      this.form1.name = row.name;
      this.centerDialogVisible = true;
      this.title = "修改";
    },
    showDel(index, row) {
      DelType({ typeid: row.typeid }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          
          this.getTypeList();
        } else {
          this.$message({
            message: "删除出问题啦,请注意",
            type: "warning",
          });
        }
      });
    },
    getTypeList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pagesize,
      };
      getTypeList(params).then((res) => {
        console.log(res, "这个是res123");
        this.tableData = res.data.datalist;
      });
    },
    handleSizeChange: function (size) {
      this.page.pagesize = size;
      console.log(this.page.pagesize, "this.page.pagesize");
    },
    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage;
      this.getTypeList();
      console.log(this.page.currentPage, "this.page.currentPage");
    },
  },
};
</script>
<style >
</style>