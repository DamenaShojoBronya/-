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
          <el-form-item label="学生名称">
            <el-input v-model="form.stuname"></el-input>
          </el-form-item>
          <el-form-item label="维修工人名称">
            <el-input v-model="form.workername"></el-input>
          </el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="confirmQuery">查询</el-button>

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
                           prop="workerid"
                           label="维修工人ID"
                           width="180">
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true"
                           prop="workername"
                           label="维修工人名称">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true"
                           prop="workerhead"
                           label="维修工人头像">
            <template slot-scope="scope">
              <img :src="scope.row.workerhead"  v-if="scope.row.workerhead"
                   style="width:100px;height:100px;" />
                   <div v-else>无</div>
            </template>

          </el-table-column>
          <el-table-column :show-overflow-tooltip="true"
                           prop="stuid"
                           label="学生ID">
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true"
                           prop="stuname"
                           label="学生姓名">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true"
                           prop="stuhead"
                           label="学生头像">
            <template slot-scope="scope">
              <img :src="scope.row.stuhead"  v-if="scope.row.stuhead"
                   style="width:100px;height:100px;" />
                   <div v-else>无</div>
            </template>
          </el-table-column>
          <el-table-column prop="content"
                           label="评价内容">
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true"
                           prop="createtime"
                           label="创建时间">
          </el-table-column>
          <!-- <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <el-button size="small"
                         type="primary"
                         @click="showDetail(scope.$index,scope.row)">查看详细</el-button>
              <el-button size="small"
                         type="warning"
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
import { getComList, delAnc } from "@/services/app";
import CommentEdit from "./commentEdit";
export default {
  components: {
    CommentEdit,
  },
  data() {
    return {
      form: {
        workername:'',
        stuname: ''
      },
      tableData: [],
      loading: false,
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
      selectionRow: {},
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
    handleDataList(type) {
      this.loading = true;
      getComList({
        page: this.page.currentPage,
        limit: this.page.pagesize,
        stuname: this.form.stuname,
        workername:this.form.workername
      }).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.data.datalist.list;
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