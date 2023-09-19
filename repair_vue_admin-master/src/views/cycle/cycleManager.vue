<template>
  <div>
    <el-button type="primary"
               @click.prevent="addCycle">新增</el-button>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="photo"
                           label="轮播图"
                           width="180">
            <template slot-scope="scope">

              <img :src="scope.row.photo"
                   style="width:100px;height:100px;" />

            </template>

          </el-table-column>
          <el-table-column prop="statu"
                           label="状态"
                           width="180">
            <template slot-scope="scope">

              <el-switch v-model="scope.row.statu"
                         @change="onChangeSwitch(scope.row)"
                         active-text="显示"
                         active-value=1
                         inactive-value=0
                         inactive-text="隐藏">
              </el-switch>

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

    <el-dialog title="提示"
               :visible.sync="cycleDialogVisible"
               width="30%"
               center>

      <div class="grid-content bg-purple-dark">
        <uploadCom :limitUploadNum="limitUploadNum"
                   :multiple="true"
                   v-model="bannerPic"
                   list-type="picture"
                   :show-file-list="true"></uploadCom>
        <div class="demo-input-suffix">
          状态：
          <el-radio v-model="radio"
                    label="1">显示</el-radio>
          <el-radio v-model="radio"
                    label="2">隐藏</el-radio>
        </div>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cycleDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCycleList, updCycle, addCycle, delCycle } from "@/services/app.js";
import uploadCom from "@/components/upload-com/uploadCom";
export default {
  name: "cycleManager",
  components: {
    uploadCom,
  },
  data() {
    return {
      radio: "1",
      cycleDialogVisible: false,
      limitUploadNum: 1,
      bannerPic: [],
      hospitalId: "",
      tableData: [],
      page: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
      },
    };
  },

  created() {
    this.getCycleList();
  },
  methods: {
    onChangeSwitch(e) {
      this.$confirm("此操作将修改轮播图状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updCycle(e).then((res) => {
            console.log(res, "你好阿");
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {
          if (e.statu == "显示") {
            e.statu = "隐藏";
          } else {
            e.statu = "显示";
          }
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
      console.log(e, "急急急");
    },
    showDel(index, row) {
      console.log(index, row, "123");
      delCycle({ cycleid: row.cycleid }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.page.currentPage = 1;
          console.log("百度");
          this.getCycleList();
        } else {
          this.$message({
            message: "删除出问题啦,请注意",
            type: "warning",
          });
        }
      });
    },
    getCycleList() {
      getCycleList({
        page: this.page.currentPage,
        limit: this.page.pagesize,
      }).then((res) => {
        console.log(res, "你好阿");
        if (res.code == 200) {
          this.tableData = res.data.datalist.records;
          // current: 1
          // pages: 1
          // size: 10
          // total: 4
          this.page.total = res.data.datalist.total;
        }
        // this.page.pagesize = res.data.datalist.size
      });
    },

    handleSizeChange: function (size) {
      this.page.pagesize = size;
      console.log(this.page.pagesize, "this.page.pagesize");
    },
    handleCurrentChange: function (currentPage) {
      this.page.currentPage = currentPage;
      this.getCycleList();
      console.log(this.page.currentPage, "this.page.currentPage");
    },
    addCycle() {
      console.log(123);
      this.cycleDialogVisible = true;
    },
    submitBtn() {
      let bannerPic = [];
      let itemPic = "";
      for (let i of this.bannerPic) {
        console.log("------------", i);
        // itemPic = "http://hyjfile.qn.phd91.com/" + i.response.key;
        itemPic = i.url;
        bannerPic.push(itemPic);
      }
      console.log(bannerPic, "bannerPic", this.radio);
      if (bannerPic.length <= 0) {
        this.$message({
          message: "请选择轮播图",
          type: "warning",
        });
        return;
      }
      addCycle({
        photo: bannerPic[0],
        statu: this.radio,
      }).then((res) => {
        console.log(res, "这个是res");
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          this.cycleDialogVisible = false;
          this.page.currentPage = 1;
          this.getCycleList();
        }
      });
      // let params = {
      //   bannerList: JSON.stringify(bannerPic),
      //   hospitalId: this.hospitalId
      // };
      // bannerSubmit(params).then(res => {
      //   console.log(res, "this is res上传成功");
      // });
    },
  },
};
</script>

<style lang="postcss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.demo-input-suffix {
  margin-top: 20px;
}
</style>