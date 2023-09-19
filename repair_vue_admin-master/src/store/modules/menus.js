import router from "@/router";
import utils from "@/utils";
import {
  _getMenuList
} from "@/services/app";

const state = {
  menu: JSON.parse(sessionStorage.getItem("menu")) || [], // 主菜单
  menuActive: sessionStorage.getItem("menuActive") || "/", // 激活主菜单
  menuOpened: sessionStorage.getItem("menuOpened") || "", // 展开子菜单
  routes: sessionStorage.getItem("menu") ? true : false // 动态路由添加状态
};

const getters = {
  getMenu: state => state.menu,
  getMenuActive: state => state.menuActive,
  getMenuOpened: state => state.menuOpened
};

const mutations = {
  // 获取菜单
  MENU: (state, data) => {
    // 判断动态路由是否已添加
    if (!state.routes) {
      // 获取动态路由
      const routes = utils.getRoutes(data);
      // 添加动态路由
      router.options.routes = routes;
      router.addRoutes(routes);
      // 动态路由添加状态
      state.routes = true;
    }

    state.menu = data; // 获取菜单
    sessionStorage.setItem("menu", JSON.stringify(data));
  },
  // 选择菜单
  MENU_SELECT: (state, data) => {
    router.push(data); // 路由跳转
    state.menuActive = data.split("?")[0]; // 激活菜单
    state.menuOpened = `/${data.split("/")[1]}`; // 展开菜单
    sessionStorage.setItem("menuActive", data);
    sessionStorage.setItem("menuOpened", state.menuOpened);
  },
  // 重置菜单
  MENU_RESET: state => {
    state.menu = [];
    state.menuActive = "/";
    state.menuOpened = "";
    sessionStorage.clear();
  }
};

const actions = {
  // 获取菜单
  handleMenu: ({
    commit
  }) => {
    // _getMenuList().then(res => {
    commit("MENU", [{
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
        children: [{
          path: "/announce/announceManager",
          name: "公告",
          icon: "md-people",
          compName: "announceManager",
          compPath: "/announce/AnnounceManager"
        },{
          path: "/announce/announceAdd",
          name: "新增公告",
          icon: "md-people",
          compName: "announceAdd",
          compPath: "/announce/announceAdd"
        }]
      },
      {
        path: "/comment",
        name: "评论管理",
        icon: "md-folder-open",
        children: [{
          path: "/comment/commentManager",
          name: "评论",
          icon: "md-people",
          compName: "commentManager",
          compPath: "/comment/commentManager"
        }]
      },
      {
        path: "/cycle",
        name: "轮播图管理",
        icon: "md-folder-open",
        children: [{
          path: "/cycle/cycleManager",
          name: "轮播图",
          icon: "md-people",
          compName: "cycleManager",
          compPath: "/cycle/cycleManager"
        }]
      },
      {
        path: "/student",
        name: "学生管理",
        icon: "md-folder-open",
        children: [{
          path: "/student/studentManager",
          name: "学生管理",
          icon: "md-people",
          compName: "studentManager",
          compPath: "/student/studentManager"
        }]
      },
      {
        path: "/worker",
        name: "维修工人管理",
        icon: "md-folder-open",
        children: [{
          path: "/worker/workerManager",
          name: "维修工人管理",
          icon: "md-people",
          compName: "workerManager",
          compPath: "/worker/workerManager"
        }]
      },
      {
        path: "/repaircontent",
        name: "维修管理",
        icon: "md-folder-open",
        children: [{
          path: "/repaircontent/repaircontentManager",
          name: "维修管理",
          icon: "md-people",
          compName: "repaircontentManager",
          compPath: "/repaircontent/repaircontentManager"
        }]
      },
      {
        path: "/materialManager",
        name: "物料管理",
        icon: "md-folder-open",
        children: [{
          path: "/material/materialManager",
          name: "物料管理",
          icon: "md-people",
          compName: "materialManager",
          compPath: "/material/materialManager"
        }]
      },
      {
        path: "/typelistManager",
        name: "报修类型管理",
        icon: "md-folder-open",
        children: [{
          path: "/typelist/typelistManager",
          name: "报修类型管理",
          icon: "md-people",
          compName: "typelistManager",
          compPath: "/typelist/typelistManager"
        }]
      },
      {
        path: "/houseManager",
        name: "宿舍管理",
        icon: "md-folder-open",
        children: [{
          path: "/house/houseManager",
          name: "宿舍管理",
          icon: "md-people",
          compName: "houseManager",
          compPath: "/house/houseManager"
        }]
      }

    ]);

    commit("MENU_SELECT", "/");
    // });
  }
  // 激活菜单
  // handleMenuSelect: ({
  //   commit
  // }, name) => {
  //   commit('MENU_SELECT', name)
  // }
};

export default {
  state,
  getters,
  mutations,
  actions
};
