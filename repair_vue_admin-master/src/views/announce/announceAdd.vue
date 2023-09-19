<!--  -->
<template>
  <div class=''>
    <div style="display:flex;line-height:50px;">
      <div style="margin-right:20px;">标题:</div><el-input v-model="title" placeholder="请输入title" style="width:20%;"></el-input>
    </div>
    <div id="div1">
      
    </div>

    <el-button type="button" class="btn" @click="getEditorData">新增公告</el-button>
    <!-- <h3>内容预览</h3>
    <textarea name="" id="" cols="170" rows="20" readonly v-model="editorData"></textarea> -->

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  addAnc,
  updAnc, // 创建编辑
} from "@/services/app";
import E from "wangeditor";
export default {
  components: {},
  data() {
    return {
      title: '',
      editorData: ''
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
    const editor = new E("#div1");
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
       this.editorData = newHtml
    }
    // 或者 const editor = new E( document.getElementById('div1') )
    editor.create();
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      console.log(this.editorData);
      addAnc({content:this.editorData,statu:'有效',title: this.title})
          .then((res) => {
            console.log(res, "这个是res");
             if(res.code == 200) {
               this.$message({
                message: '恭喜你，新增成功',
                type: 'success'
              });
              this.$router.replace('/announce/announceManager')
             }
          })
          .catch(() => {
           this.$message({
            message: '警告哦，新增失败',
            type: 'warning'
          });
          });
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
};
</script>
<style >
</style>