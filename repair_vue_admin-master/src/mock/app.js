import Mock from "mockjs";
import qs from "qs";

export default () => {
  // 用户登录
  Mock.mock(/\/login/, config => {
    const {user, pwd} = qs.parse(config.body);
    if (user === "admin" && pwd === "wasd@007") {
      return {
        data: {
          user_id: Mock.mock("@guid"),
          auth_token: Mock.mock("@guid"),
          real_name: "Admin"
        },
        error: {
          code: 0,
          msg: "Login success"
        }
      };
    }
    return {
      error: {
        code: 4000,
        msg: "Your account username or password is incorrect"
      }
    };
  });

  // 菜单获取
  Mock.mock(/\/menu/, {
    code: 200,
    data: [
      {
        path: "/",
        name: "首页",
        icon: "md-speedometer",
        compName: "Dashboard",
        compPath: "/dashboard"
      },
      // {
      //   path: "/test",
      //   name: "Test",
      //   icon: "md-document",
      //   compName: "Test",
      //   compPath: "/Test"
      // },
      // {
      //   path: "/hello",
      //   name: "Hello",
      //   icon: "md-chatbubbles",
      //   children: [
      //     {
      //       path: "/hello/hello-world",
      //       name: "HelloWorld",
      //       icon: "md-text",
      //       compName: "HelloWorld",
      //       compPath: "/hello/helloWorld"
      //     }
      //   ]
      // },
      // {
      //   path: "/manage",
      //   name: "Manage",
      //   icon: "md-folder-open",
      //   children: [
      //     {
      //       path: "/manage/users",
      //       name: "Users",
      //       icon: "md-people",
      //       compName: "Users",
      //       compPath: "/manage/users"
      //     }
      //   ]
      // },
      {
        path: "/announce",
        name: "公告管理",
        icon: "md-folder-open",
        children: [
          {
            path: "/announce/announceManager",
            name: "announceManager",
            icon: "md-people",
            compName: "announceManager",
            compPath: "/announce/AnnounceManager"
          }
        ]
      }
    ]
    
  });
//  function TestDecorator<T extends new  (...args: any [])=> any}>(constuction: T) {
//    return class extends constuction {

//    }
//  } 
  // 密码修改
  Mock.mock(/\/edit-password/, config => {
    const {currentPassword} = qs.parse(config.body);
    if (currentPassword === "wasd@007") {
      return {
        error: {
          code: 0,
          msg: "Edit password success"
        }
      };
    }
    return {
      error: {
        code: 4000,
        msg: "Your current password is incorrect"
      }
    };
  });
};
