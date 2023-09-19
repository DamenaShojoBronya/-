<!--  -->
<template>
  <div class=''>

    <el-row>
      <el-col :span="24">
        <el-form ref="form"
                 :model="form"
                 size="mini"
                 inline
                 label-width="120px">
          <el-form-item label="维修工人ID">
            <el-input v-model="form.workerid"></el-input>
          </el-form-item>
          <el-form-item label="维修工人姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.statu"
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

          <el-button type="primary"
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
          <el-table-column prop="workerid"
                           label="维修工人ID"
                           width="180">
          </el-table-column>

          <el-table-column prop="name"
                           label="姓名">
          </el-table-column>
          <el-table-column prop="sex"
                           label="性别">
          </el-table-column>

          <el-table-column prop="statu"
                           label="状态"
                           width="180">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.statu"
                         @change="onChangeSwitch(scope.row)"
                         active-text="正常"
                         active-value="正常"
                         inactive-value="停用"
                         inactive-text="停用">
              </el-switch>
            </template>

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
          <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <el-button size="small"
                         type="primary"
                         @click="showDel(scope.$index,scope.row)">删除</el-button>

              <el-button size="small"
                         type="primary"
                         @click="showUpdate(scope.$index,scope.row)">修改</el-button>
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

    <el-dialog :title="workerTitle"
               :visible.sync="workerDialogVisible"
               width="30%"
               center>

      <el-form ref="form"
               :model="workerForm"
               size="mini"
               inline
               label-width="80px">
        <el-form-item label="维修工人姓名">
          <el-input v-model="workerForm.name"></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="workerForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <div class="demo-input-suffix">
            <el-radio v-model="workerForm.sex"
                      label="男">男</el-radio>
            <el-radio v-model="workerForm.sex"
                      label="女">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <div class="demo-input-suffix">
            <el-radio v-model="workerForm.statu"
                      label="正常">正常</el-radio>
            <el-radio v-model="workerForm.statu"
                      label="停用">停用</el-radio>
          </div>
        </el-form-item>

      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="workerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onWorkerCli">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  getWorkerList,
  delWorker,
  updWorker,
  addWorker,
} from "@/services/app.js";
export default {
  components: {},
  data() {
    return {
      form: {
        name: "",
        workerid: "",
        statu: "",
      },
      options: [
        { value: "正常", label: "正常" },
        { value: "停用", label: "停用" },
      ],
      workerDialogVisible: false,
      workerTitle: "新增",
      workerForm: {
        name: "",
        phone: "",
        sex: "男",
        statu: "正常",
      },
      tableData: [],
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
      selectRow: {},
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getWorkerList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    showUpdate(index, row) {
      this.workerTitle = "修改";
      this.selectRow = row;
      this.workerForm.workerid = row.workerid;
      this.workerForm.name = row.name;
      this.workerForm.sex = row.sex;
      this.workerForm.statu = row.statu;
      this.workerForm.phone = row.phone;
      this.workerDialogVisible = true;
    },
    // 点击增加的弹出框 确定按钮
    onWorkerCli() {
      if (this.workerForm.phone.length != 11) {
        this.$message({
          type: "warning",
          message: "手机号码必须为11位数",
        });
        return;
      }
      if (this.workerTitle == "新增") {
        addWorker(this.workerForm)
          .then((res) => {
            this.$message({
              type: "success",
              message: "新增成功!",
            });
            this.page.currentPage = 1;
            this.getWorkerList();
            this.workerDialogVisible = false;
          })
          .catch((err) => {
            this.$message({
              type: "warning",
              message: "新增失败",
            });
          });
      } else {
        updWorker(this.workerForm)
          .then((res) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.workerDialogVisible = false;
            this.page.currentPage = 1;
            this.getWorkerList();
          })
          .catch((err) => {
            this.$message({
              type: "warning",
              message: "修改失败",
            });
          });
      }
    },
    add() {
      this.workerTitle = "新增";
      this.workerForm = {
        name: "",
        phone: "",
        sex: "男",
        statu: "正常",
      };
      this.workerDialogVisible = true;
    },
    // 修改状态
    onChangeSwitch(row) {
      this.$confirm("此操作将修改维修工人的状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updWorker(row).then((res) => {
            console.log(res, "你好阿");
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {
          console.log(row.statu);
          if (row.statu == "正常") {
            row.statu = "停用";
          } else {
            row.statu = "正常";
          }
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    // 删除
    showDel(index, row) {
      console.log(row, "");
      delWorker({
        workerid: row.workerid,
      }).then((res) => {
        if (res.code == 200) {
          if (res.data.data == true) {
            this.$message({
              message: `恭喜你，删除成功`,
              type: "success",
            });
            this.page.currentPage = 1;
            this.getWorkerList();
          } else {
            this.$message({
              message: `请注意，删除失败`,
              type: "warning",
            });
          }
        }
      });
    },
    // 查询
    confirmQuery() {
      this.getWorkerList();
    },
    getWorkerList() {
      getWorkerList({
        page: this.page.currentPage,
        limit: this.page.pagesize,
        wokerid: this.form.wokerid,
        name: this.form.name,
        statu: this.form.statu,
      }).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.datalist.list;
          this.page.total = res.data.datalist.total;
        }
      });
    },
    handleSizeChange: function (size) {
      this.page.pagesize = size;
      console.log(this.page.pagesize, "this.page.pagesize");
    },
    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage;
      // this.getstudentList();
      this.getWorkerList();
      console.log(this.page.currentPage, "this.page.currentPage");
    },
  },
};
</script>
<style >
</style>