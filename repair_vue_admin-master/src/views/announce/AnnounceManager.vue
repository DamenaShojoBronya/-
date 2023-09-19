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
          <el-form-item label="公告ID">
            <el-input v-model="form.announceid"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
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
                     @click="addBtn">新增</el-button>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  v-loading="loading"
                  stripe
                  style="width: 100%">
          <el-table-column :show-overflow-tooltip="true"
                           prop="announceid"
                           label="公告ID"
                           width="180">
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true"
                           prop="title"
                           label="标题">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true"
                           prop="content"
                           label="内容">
          </el-table-column>
          <el-table-column prop="statu" :show-overflow-tooltip="true"
                           label="状态"
                           width="180">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.statu"
                         @change="onChangeSwitch(scope.row)"
                         active-text="有效"
                         active-value="有效"
                         inactive-value="无效"
                         inactive-text="无效">
              </el-switch>
            </template>

          </el-table-column>
          

          <el-table-column :show-overflow-tooltip="true"
                           prop="createtime"
                           label="创建时间">
          </el-table-column>
          <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <el-button size="small"
                         type="primary"
                         @click="showDetail(scope.$index,scope.row)">查看详细</el-button>
              <el-button size="small"
                         type="warning"
                         @click="showDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
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

    <el-dialog :title="title"
               :visible.sync="DialogVisible"
               width="30%"
               center>

      <div class="grid-content bg-purple-dark">
        <div style="text-align:center;width:100%;font-weight:700;">标题：{{selectionRow.title}}</div>
        <div style="margin:20px 0 ;">发布时间：{{selectionRow.createtime}}</div>
       <div>内容：</div>
        <div v-html="selectionRow.content"></div>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="DialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getAncList, delAnc, updAnc } from "@/services/app";
import AnnounceEdit from "./announceEdit";
export default {
  components: {
    AnnounceEdit,
  },
  data() {
    return {
      loading: false,
      form: {
        announceid: "",
        title: "",
        statu: "",
      },
      options: [
        {value:'有效',label: '有效'},
        {value:'无效',label: '无效'},
      ],
      title: "",
      DialogVisible: false,
      tableData: [],
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
      selectionRow: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.handleDataList(); // 获取列表数据
  },
  methods: {
    onChangeSwitch(row) {
      this.$confirm("此操作将修改公告的状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row,"神经病")
          updAnc(row).then((res) => {
            console.log(res, "你好阿");
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {
          console.log(row.statu);
          if(row.statu=='有效') {
            row.statu = '无效'
          }else {
            row.statu = '有效'
          }
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    showDetail(index,row) {
      this.DialogVisible = true;
      this.title = '公告详情';
      this.selectionRow = row;
      console.log(row)
    },
    showDel(index, row) {
      delAnc({
        announceid: row.announceid,
      })
        .then((res) => {
          if (res.code == 200) {
            this.page.currentPage = 1;
            this.$Message.success("删除成功");
            this.handleDataList();
          }
        })
        .catch(() => {
          this.$message({
            message: "警告哦，删除失败,请重试",
            type: "warning",
          });
        });
    },
    addBtn() {
      this.$router.replace("/announce/announceAdd");
    },
    handleSizeChange: function (size) {
      this.page.pagesize = size;
      console.log(this.page.pagesize, "this.page.pagesize");
    },
    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage;
      this.handleDataList();
      console.log(this.page.currentPage, "this.page.currentPage");
    },
    confirmQuery() {
      this.handleDataList();
    },
    /**
     * 获取用户列表
     * @param  {string} type 是否使用搜索, 默认值 undefined (不使用搜索)
     */
    handleDataList() {
      this.loading = true;
      getAncList({
        page: this.page.currentPage,
        limit: this.page.pagesize,
        announceid: this.form.announceid,
        title: this.form.title,
        statu: this.form.statu,
      }).then((res) => {
        this.loading = false;
        console.log("这个是获取到的数据", res);
        if (res.code == 200) {
          this.tableData = res.data.datalist.records;
          this.page.total = res.data.datalist.total;
        }
      });
    },
    /**
     * 在多选模式下有效，只要选中项发生变化时就会触发
     * @param  {array} selection 已选项数据
     */
    handleSelectionChange(selection) {
      console.log("会发送到这里吗");
      const ids = [];
      for (const item of selection) {
        ids.push(item["id"]);
      }
      this.toolbar = {
        ids: ids,
        number: selection.length,
      };
    },

    // 新增界面
    handleCreate() {
      this.$refs["edit"].handleModal("Create"); // 显示创建模态框
    },
    /**
     * 编辑界面
     * @param  {object} row 当前行数据
     */
    handleEdit(row) {
      this.$refs["edit"].handleModal("Edit", row); // 显示编辑模态框
    },
    /**
     * 删除用户
     * @param  {object} row 当前行数据
     */
    handleRemove(row) {
      this.$Loading.start();
      this.list.loading = true;
      // 模拟异步请求(删除)
      // setTimeout(() => {
      delAnc({
        announceid: row.announceid,
      })
        .then((res) => {
          this.$Message.success("删除成功");
          this.handleDataList();
        })
        .catch(() => {
          this.$Loading.error();
          this.list.loading = false;
        });
      // }, 500);
    },
  },
};
</script>
<style >
</style>