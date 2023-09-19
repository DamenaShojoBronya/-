<template>
  <div>
    <el-card class="mine-layout">
      <!--    <el-button @click="flag =true">编辑</el-button>-->
      <p style="text-align: center">桂林电子科技大学北海校区报告厅借用申请单</p>
      <p style="margin-top: 30px">
        <a style="margin-left: 10px">序号：{{ applyObj.id }}</a>
        <a style="margin-left: 420px">填表日期：{{ applyObj.createTime | formatDateTime }}</a>
      </p>
      <el-table :data="tableData" border>
        <el-table-column label="借用单位">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="title" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.psd }}</span>
          </template>
        </el-table-column>

        <el-table-column label="借用时间">
          <template slot-scope="scope">
            <span>{{ scope.row.name2 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="date" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.psd2 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="printC">
        <button @click="printBtn" style="color: #ff2023; font-size: large">
          打 印
        </button>
      </div>
    </el-card>
  </div>
</template>


<script>
  import {
    formatDate
  } from "../../utils/date";

  export default {
    data() {
      return {
        flag: false,
        applyObj: null,
        applyList: null,
        placeMap: null,
        borrowUnitMap: null,
        title: null,
        tableData: null,
        date: null,
      };
    },
    created() {
      this.getParams();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === "") {
          return "N/A";
        }
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      },
    },
    methods: {
      printBtn() {
        window.print();
        return;
      },
      getParams() {
        var applyObj = this.$route.params.applyObj;
        if (applyObj.remarks) {

        }
        console.log("this.applyObj", applyObj);
        var placeMap = this.$route.params.placeMap;
        var borrowUnitMap = this.$route.params.borrowUnitMap;
        this.applyObj = applyObj;

        this.placeMap = placeMap;
        this.borrowUnitMap = borrowUnitMap;

        this.title = this.borrowUnitMap.get(this.applyObj.borrowId);
        var beginTime = formatDate(
          new Date(this.applyObj.beginTime),
          "MM 月 dd 日 hh 时 mm 分 "
        );
        var endTime = formatDate(
          new Date(this.applyObj.endTime),
          "MM 月 dd 日 hh 时 mm 分 "
        );

        this.date = beginTime + "至" + endTime;
        this.tableData = [{
            name: "会议内容",
            psd: this.applyObj.meetingContent,
            name2: "",
            psd2: "",
          },
          {
            name: "参会人数",
            psd: this.applyObj.numCount,
            name2: "会议要求",
            psd2: this.applyObj.meetingReq,
          },
          {
            name: "场地",
            psd: placeMap.get(this.applyObj.placeId),
            name2: "文字字幕",
            psd2: this.applyObj.title,
          },
          {
            name: "借用人",
            psd: this.applyObj.borrower,
            name2: "联系方式",
            psd2: this.applyObj.telephone,
          },
          {
            name: "借用单位领导",
            psd: this.applyObj.approvalLeader,
            name2: "审批单位负责人",
            psd2: this.applyObj.remarks == "" ? "" : this.applyObj.remarks,
          },
          {
            name: "借用单位意见",
            psd: this.applyObj.borrowOpinion === 1 ? "同意" : "不同意",
            name2: "审批单位意见",
            psd2: this.applyObj.approvalOpinion === 1 ? "同意" : "不同意",
          },
          {
            name: "备注",
            psd: this.applyObj.remarks,
            name2: "",
            psd2: "",
          },
        ];
      },
    },
  };

</script>

<style>
  .mine-layout {
    margin: 0 auto;
    position: relative;
    justify-content: center;
    align-items: center;
    /*right: 140px;*/
    top: 10px;
    width: 800px;
    height: 650px;
  }

  .printC {
    margin-left: 80%;
    margin-top: 5%;
  }

  @media print {
    /*.el-table--border {*/
    /*  !*border-right: #ff1627;*!*/
    /*  !*border-bottom: #ff1627;*!*/
    /*}*/

    .mine-layout {
      margin: 0 0 0 -20%;
    }

    .printC {
      display: none;
    }

    .navbar[data-v-797e31be] {
      display: none;
    }

    #app .sidebar-container {
      display: none;
    }
  }

</style>



// WEBPACK FOOTER //
// src/views/application/index.vue
