<template>
  <div id="edit-password">
    <Modal v-model="modal.visible"
           :title="modal.title"
           footer-hide>
      <IForm :key="modal.visible"
             ref="editPassword"
             label-position="top"
             :elem="editPasswordElem"
             :model="editPassword"
             :rules="editPasswordRule"
             :btn-loading="loading"
             :width="320"
             @on-submit="handleSubmit"
             @on-click="modal.visible = false"
             submit-text="Save password"
             button
             button-text="Cancel" />
      <!-- IForm -->
    </Modal>
  </div>
</template>
<script>
import { updGly } from "@/services/app";
export default {
  name: "EditPassword",
  data() {
    const validPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else {
        if (this.editPassword.passwordConfirmation) {
          // 对第二个密码框单独验证
          this.$refs["editPassword"].validateField("passwordConfirmation");
        }
        callback();
      }
    };
    const validPwdCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else {
        if (value !== this.editPassword.password) {
          callback(new Error("两次输入的密码不对，请检查!"));
        } else {
          callback();
        }
      }
    };
    return {
      // 加载状态
      loading: false,
      // 模态框属性
      modal: {
        title: "",
        visible: false,
      },
      // 表单元素数组
      editPasswordElem: [
        {
          label: "新密码",
          prop: "password",
          placeholder: "请输入新密码",
          type: "password",
        },
        {
          label: "确定新密码",
          prop: "passwordConfirmation",
          placeholder: "请再次确定你输入的新密码",
          type: "password",
        },
      ],
      // 表单数据对象
      editPassword: {
        password: "",
        passwordConfirmation: "",
      },
      // 表单验证规则
      editPasswordRule: {
        password: [
          {
            required: true,
            validator: validPwd,
            trigger: "blur",
          },
        ],
        passwordConfirmation: [
          {
            required: true,
            validator: validPwdCheck,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    showModal() {
      this.modal = {
        title: "修改密码",
        visible: true,
      };
      this.editPassword = {
        password: "",
        passwordConfirmation: "",
        id: this.$store.state.app.userInfo.id,
      };
    },
    handleSubmit() {
      this.$Loading.start();
      this.loading = true;
      updGly(this.editPassword)
        .then((res) => {
          if(res.code == 200) {
            this.$message({
              type: "success",
              message: "修改密码成功！",
            });
            this.$Loading.finish();
            this.loading = false;
            this.modal.visible = false;
            sessionStorage.removeItem('menu') 
            sessionStorage.removeItem('userInfo') 
            sessionStorage.removeItem('menuOpened') 
            sessionStorage.removeItem('menuActive') 
            this.$router.push("/login");
          }
        })
        .catch(() => {
          this.$Loading.error();
          this.loading = false;
        });
    },
  },
};
</script>
