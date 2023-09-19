<template>
  <div class="all">
    <div class="title">
      <h3>报告厅预约申请单</h3>
    </div>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 借用时间 -->
        <el-form-item label="借用时间">
          <el-col :span="11">
            <el-date-picker value-format="timestamp" v-model="form.beginTime" type="datetime" placeholder="开始时间">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker value-format="timestamp" v-model="form.endTime" type="datetime" placeholder="结束时间">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 借用单位 -->
        <el-form-item label="借用单位">
          <el-select v-model="form.borrowId" @change="changeBorrow" placeholder="借用单位">
            <el-option v-on:click="changeBorrow" v-for="item in borrowUnit" :key="item.id" :label="item.department"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 单位领导 -->
        <el-form-item label="单位领导">
          <el-select v-model="form.approvalLeader" placeholder="先选择借用单位">
            <el-option v-for="item in approvalLeader" :key="item.id" :label="item.leader" :value="item.leader">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 参会人数 -->
        <el-form-item label="参会人数">
          <el-input v-model="form.numCount"></el-input>
        </el-form-item>
        <!-- 会议要求 -->
        <el-form-item label="会议要求">
          <el-input v-model="form.meetingReq"></el-input>
        </el-form-item>
        <!-- 单位领导 -->
        <el-form-item label="报告厅">
          <el-select v-model="form.placeId" placeholder="请选择报告厅">
            <el-option v-for="item in meetingRoom" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 字幕文字 -->
        <el-form-item label="字幕文字">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 借用人 -->
        <el-form-item label="借用人">
          <el-input v-model="form.borrower" :disabled="true"></el-input>
        </el-form-item>
        <!-- 联系电话 -->
        <el-form-item label="联系电话">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <!-- 会议内容 -->
        <el-form-item label="会议内容">
          <el-input type="textarea" v-model="form.meetingContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发送申请</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>


<script>
  import {
    getUserInfo,
    getBorrowUnit,
    getBorrowUnidLeader,
    getPlaceHall,
    postFormData
  } from "@/api/meApplication";

  export default {
    name: 'meApplication',
    // props:{
    //  borrower : {
    //    type:String,
    //    default:""
    //  }
    // },
    data() {
      return {
        form: {
          // 表单数据
          beginTime: null, //开始时间戳
          endTime: null, // 结束时间戳
          borrowId: null, //借用单位ID
          placeId: null, //场地ID
          meetingContent: null, //会议内容
          numCount: null, //会议人数
          meetingReq: null, //会议要求
          borrower: null, //借用人
          telephone: null, //电话

          // 非表单数据
          id: 0, // 编号
          approvalLeader: null, //借用单位审批领导
          approvalId: 0, //审批单位
          createTime: 0, //创建时间戳
          remarks: "", //申请备注
          approvalOpinion: 0, //审批单位意见
          borrowOpinion: 0, //借用单位意见
          feedback: "", //不同意反馈
          processingProgress: 0 //处理进度，0未处理，1部门初审，2单位复审，3已完成
        },
        borrowUnit: null,
        approvalLeader: null,
        meetingRoom: null,
      }
    },
    created() {

      var timestamp = (new Date()).getTime();
      this.form.createTime = timestamp
      /**
       *查询借用人 
       */
      getUserInfo().then((res) => {
        this.form.borrower = res.data.username;
      })
      /**
       * 查询所有借用部门信息
       */
      getBorrowUnit().then((res) => {
        // console.log(this.form.borrower)
        this.borrowUnit = res.data;
        // console.log("this.form.borrowId", this.form.borrowId)

      })
      /**
       * 查询借用单位的领导
       */
      getBorrowUnidLeader(1).then((res) => {
        this.approvalLeader = res.data;
        // console.log(res.data)
      })
      /**
       * 查询所有场地信息
       */
      getPlaceHall().then((res) => {

        let meetingRoom = res.data
        meetingRoom.forEach(element => {
          element.name += ('(' + element.size + ')')
        });
        // console.log(meetingRoom)
        this.meetingRoom = meetingRoom
      })


    },
    methods: {

      onSubmit() {
        console.log(this.form)
        var flag = this.booleanFormData(this.form)
        if (flag) {
          postFormData(this.form).then((res) => {
            alert(res.message)
            // console.log(res)
          })
        }

      },

      changeBorrow(e) {
        console.log(this.form.borrowId);
        getBorrowUnidLeader(this.form.borrowId).then((res) => {
          // console.log(res.data)
          this.form.approvalLeader = res.data[0].leader;
          this.approvalLeader = res.data;

        })
      },
      booleanFormData(data) {
        // 判断表单还有什么值没填
        var formData = data
        for (let key in formData) {
          if (key == "telephone") {
            if (formData[key].length != 11) {
              // wx.showToast({
              //   title: '电话号码不正确',
              //   icon: 'none',
              //   image: '',
              // });
              alert(project + '\n' + '还没填哦!');

              return false
            }

          }
          if (formData[key] == null || formData[key] == "" || formData[key] == 0) {

            // beginTime: null, //开始时间戳
            // endTime: null, // 结束时间戳
            // borrowId: null, //借用单位ID
            // approvalLeader: null, //借用单位审批领导
            // placeId: null, //场地ID
            // meetingContent: null, //会议内容
            // numCount: null, //会议人数
            // meetingReq: null, //会议要求
            // borrower: null, //借用人
            // telephone: null, //电话
            // console.log(typeof (formData[key]) + "-----" + formData[key])

            var project
            switch (key) {
              case "beginTime":
                project = "开始时间"
                break;
              case "endTime":
                project = "结束时间"

                break;
              case "borrowId":
                project = "借用单位"

                break;
                // case "approvalLeader":
                //   project = "单位领导"

                //   break;
              case "placeId":
                project = "借用场地"

                break;
              case "meetingContent":
                project = "会议内容"

                break;
              case "numCount":
                project = "会议人数"

                break;
              case "meetingReq":
                project = "会议要求"

                break;
              case "title":
                project = "字幕文字"

                break;
              case "borrower":
                project = "借用人"

                break;
              case "telephone":
                project = "联系电话"

                break;
            }
            alert(project + '\n' + '还没填哦!');
            return false
          }
          return true
        }
      }

    }
  }

</script>


<style>
  .all {
    margin-top: 10px;
    border-radius: 60px;
    width: 80%;
    margin: auto;
    border: 2px solid #eee;
    padding: 10px 40px;
    text-align: center;
    max-width: 800px;
  }

  .title {
    margin: auto;
    font-size: 30px;
    text-align: center;
    /* color: ; */
  }

  .form {}

  .time {
    display: flex;
  }

</style>
