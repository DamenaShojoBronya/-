<!--  -->
<template>
  <div>
      <el-upload
        :class="[hasMore?'':hideUpload?'hide':'']"
        list-type="picture-card"
        ref="upload"
        multiple
        :limit="limitUploadNum"
        action="https://upload-z2.qiniup.com"
        :data="qiniuData"
        :before-upload="uploadBefore"
        :on-change="uploadChange"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-preview="handlePictureCardPreview"
        :on-remove="onRemove"
        :on-exceed="handleExceed"
        accept="accept"
        :file-list="value"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getQINIUToken } from "@/services/app.js";
export default {
  props: {
    limitUploadNum: {
      type: Number,
      default: 1
    },
    value: {
      type:Array,
      default:()=>{
        return []
      }
    },
    accept: {
      type: String,
      default: ".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP"
    },
    hasMore:{
      type: Boolean,
      default: true
    },
    limitSize:{
      type: Number,
      default: 500
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hideUpload: false, //隐藏显示上传控件
      qiniuData: {
        key: "",
        token: ""
      },
      dialogImageUrl: "",  //大图的地址
      dialogVisible: false, 
      imageUrl: ""
    };
  },
  computed: {

  },
  created() {
    this.gettoken();
  },
  watch:{
    value(nval) {
      //判断是否有图片，有的话就隐藏上传控件，没有的话就显示上传控件
      //  this.hideUpload = this.value.length >= 1;
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.hideUpload = this.value.length >= 1;
  },
  methods: {
    //获取上传七牛token凭证
    gettoken() {
      getQINIUToken()
        .then(r => {
          this.qiniuData.token = r.data.data.token;
        })
        .catch(error => {
          this.$message.warning(`获取OSS的token失败，${error}`);
        });
    },
    // 超出文件数量触发
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传1个文件`);
    },
    //移除触发
    onRemove(file, fileList) {
        this.$emit("input", fileList);
    },
    //查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //校验上传文件大小
    uploadChange(file, fileList) {
      console.log("---------------",file,"++++++++++++++++",fileList)
    },
    //上传前触发
    uploadBefore(file) {
      //配置图片的名称
      let fname = file.name;
      fname = "img/" + fname.substring(0, fname.lastIndexOf(".")) + this.guid();
      this.qiniuData.key = fname;
      //判断图片大小
     const isLt2M = file.size / 1024 / 1024 < this.limitSize;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 300KB!');
        }
        console.log(isLt2M)
      return isLt2M;
    },
    //上传成功
    uploadSuccess(response, file, fileList) {

      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log("fileList+++",fileList);
      // console.log("response---",response);
      // console.log("file----++",this.imageUrl);
      let fileListUrl = '';
      let adjustform = [];
      console.log(fileList.length,"申请将")
      for(let i =0;i< fileList.length;i++){
        console.log(fileList[i],"fileList[i]");
        if(fileList[i].response){
          console.log(fileList[i].response,"nihao",i)
          fileListUrl = fileListUrl  + 'https://www.chendong00.top/'+fileList[i].response.key+","
          adjustform.push({
            url:'https://www.chendong00.top/'+fileList[i].response.key
          })
        }
      }

      console.log("lookadjustform",adjustform);
      this.$emit("input", adjustform);
    },
    //上传失败
    // eslint-disable-next-line no-unused-vars
    uploadError(err, file, fileList) {
      console.log(err);
    },
    guid: function() {
      var d = new Date().getTime();
      var guid = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
      });
      return guid;
    }
  }
};
</script>
<style lang="postcss" >
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
