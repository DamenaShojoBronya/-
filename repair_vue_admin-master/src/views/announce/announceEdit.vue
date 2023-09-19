<template>
  <div id="user-edit">
    <div id="div1">
      <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
    </div>
  </div>
</template>
<script>
import {
  addAnc,
  updAnc, // 创建编辑
} from "@/services/app";
import E from "wangeditor";
export default {
  name: "UserEdit",
  data() {
    // 自定义验证(年龄)
    const validAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Age cannot be empty"));
      }
      // 模拟异步验证
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      // 模态框属性
      modal: {
        title: "",
        visible: false,
      },
      // 表单数据
      edit: {
        title: "",
        content: "",
        statu: "",
      },
      // 初始表单数据
      init: "",
      // 加载状态
      loading: {
        form: false,
        btn: false,
      },
      // 表单元素
      userElem: [
        {
          label: "title",
          prop: "title",
          placeholder: "Enter title",
        },
        {
          label: "content",
          prop: "content",
          placeholder: "请输入内容",
          element: "textarea",
        },
        {
          label: "statu",
          prop: "statu",
          element: "radio",
          option: [
            {
              label: "显示",
              value: "1",
            },
            {
              label: "隐藏",
              value: "0",
            },
          ],
        },
      ],
      // 表单验证(用户)
      userRule: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.init = Object.assign({}, this.edit); // 复制初始表单数据
    const editor = new E("#div1"); // 传入两个元素
    console.log(editor);
    editor.create();
  },
  methods: {
    /**
     * 显示模态框
     * @param  {string} title 模态框标题名称
     * @param  {object} row 当前行数据
     */
    handleModal(title, row) {
      this.modal = {
        title: title,
        visible: true,
      };
      this.loading.form = true; // 表单加载状态
      if (title === "Create") {
        this.handleCreate(); // 创建
      } else {
        this.handleEdit(row); // 编辑
      }
    },
    // 创建
    handleCreate() {
      this.edit = Object.assign({}, this.init);
      this.handlePatch(); // 获取补丁数据
    },
    // 编辑
    handleEdit(row) {
      // 模拟异步请求(获取详情)
      setTimeout(() => {
        const edit = Object.assign({}, row);
        this.edit = {
          ...edit,
        };
        this.handlePatch(); // 获取补丁数据
      }, 800);
    },
    // 获取补丁数据
    handlePatch() {
      const _false = false;
      const data = this.userElem.filter(
        (name) => name.option && !name.option.length
      );
      let total = data.length;
      if (!total) {
        this.loading.form = _false; // 表单加载状态
        return;
      }
      for (const item of data) {
        if (item["prop"] === "city") {
          // 模拟异步请求(获取补丁数据-城市)
          setTimeout(() => {
            item["option"] = this.city;
            total--;
            this.loading.form = total ? true : _false; // 补丁完成状态
          }, 800);
        }
        if (item["prop"] === "hobby") {
          // 模拟异步请求(获取补丁数据-爱好)
          setTimeout(() => {
            item["option"] = this.hobby;
            total--;
            this.loading.form = total ? true : _false; // 补丁完成状态
          }, 400);
        }
      }
    },
    // 表单提交
    handleSubmit() {
      this.loading.form = true; // 表单加载状态

      this.$Loading.start();
      this.loading.btn = true;
      const payload = this.edit;
      console.log(payload, "这个是payload");
      // 模拟异步请求(编辑 Or 新增)
      if (this.modal.title === "Create") {
        addAnc(payload)
          .then((res) => {
            console.log(res, "这个是res");
            this.$Message.success(res.error.msg);
            this.$emit("on-update");
            this.$Loading.finish();
            this.loading.btn = false;
            this.modal.visible = false;
          })
          .catch(() => {
            this.$Loading.error();
            this.loading.btn = false;
            this.modal.visible = false;
          });
      } else {
        console.log(payload.params,"payload.params");
        updAnc(payload.params)
          .then((res) => {
            console.log(res, "这个是res");
            if (res.code == 200) {
              this.$Message.success(res.error.msg);
              this.$emit("on-update");
              this.$Loading.finish();
              this.loading.btn = false;
              this.modal.visible = false;
            }
          })
          .catch(() => {
            this.$Loading.error();
            this.loading.btn = false;
            this.modal.visible = false;
          });
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
</style>
