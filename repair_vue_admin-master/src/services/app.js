import ax from "@/utils/axios";

export const _login = params =>{
  return  ax.post("/project/login/glylogin", params).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} // 用户登录
export const _getMenuList = () => ax.get("/menu"); // 获取菜单
export const _editPwd = params => ax.post("/edit-password", params); // 修改密码




export const getAncList = params => {
  return ax.get("repairApi/project/announce/getAncList", {
    params
  }).then(res=> {
    return res;
  }).catch(err=>err);
}; // 

export const addAnc = data => {
  return ax.post("repairApi/project/announce/addAnc", data).then(res=> {
    return res;
  }).catch(err=>err);
}; // 

export const userLogin = params =>{
  return  ax.get("repairApi/project/login/glylogin", {params}).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 


// GET 接口描述：获取评论列表
export const getComList = params =>{
  return  ax.get("repairApi/project/comment/getComList", {params}).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 






export const delAnc = params =>{
  return  ax.get("repairApi/project/announce/delAnc", {params}).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 
export const updAnc = params =>{
  return  ax.post("repairApi/project/announce/updAnc", params).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 


// 获取七牛token  GET 
export const  getQINIUToken = () =>{
  return  ax.get("repairApi/qiniuOss/token" ).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
}

// GET
export const getCycleList = params =>{
  return  ax.get("repairApi/project/cycle/getCycleList", { params } ).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 

// POST 
export const updCycle = params =>{
  return  ax.post("repairApi/project/cycle/updCycle",  params  ).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 


// POST 
export const addCycle = params =>{
  return  ax.post("repairApi/project/cycle/addCycle",  params).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 

// GET /project/cycle/delCycle
export const delCycle = params =>{
  return  ax.get("repairApi/project/cycle/delCycle",  { params }).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 


// GET /project/student/getStuList
export const getStuList = params =>{
  return  ax.get("repairApi/project/student/getStuList",  { params }).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 

// GET /project/worker/getWorkerList
// 接口描述：获取维修工人列表
export const getWorkerList = params =>{
  return  ax.get("repairApi/project/worker/getWorkerList",  { params }).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 


// /project/student/addStus接口描述:增加学生
export const addStus = params =>{
  return  ax.post("repairApi/project/student/addStus", params).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 

// 
export const getRepairList = params =>{
  return  ax.get("repairApi/project/repair/getRepairList", { params }).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 

// POST /project/repair/updRep
export const updateRepair = params =>{
  return  ax.post("repairApi/project/repair/updRep",  params ).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 


// /project/worker/delWorker 接口描述：删除维修工人
export const delWorker = params =>{
  return  ax.get("repairApi/project/worker/delWorker",  {params} ).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 


// POST /project/worker/updWorker 接口描述：更新维修工人
export const updWorker = params =>{
  return  ax.post("repairApi/project/worker/updWorker",  params ).then(res=> {
    console.log(res,"这个是res");
    return res;
  }).catch(err=>err);
} 

//GET /project/materiallists/getMatlistList 接口描述：获取所有物料字典表列表
export const getMatlistList = params =>{
  return  ax.get("repairApi/project/materiallists/getMatlistList",  {params} ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 


// POST /project/materiallists/addMatlist 接口描述:增加字典表物料

export const addMatlist = params =>{
  return  ax.post("repairApi/project/materiallists/addMatlist",  params ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 

// GET /project/materiallists/delMatlist 接口描述：删除字典表物料
export const delMatlist = params =>{
  return  ax.get("repairApi/project/materiallists/delMatlist",  {params} ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 

// POST /project/materiallists/updMatlist 接口描述：更新字典表物料

export const updMatlist = params =>{
  return  ax.post("repairApi/project/materiallists/updMatlist",  params ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 

// GET /project/typelist/getTypeList 接口描述：获取所有报修类型列表
export const getTypeList = params =>{
  return  ax.get("repairApi/project/typelist/getTypeList",  {params} ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 




// GET /project/typelist/DelType 接口描述：删除报修类型
export const DelType = params =>{
  return  ax.get("repairApi/project/typelist/DelType",  {params} ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 

// POST /project/typelist/addType 接口描述:增加报修类型

export const addType = params =>{
  return  ax.post("repairApi/project/typelist/addType",  params ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 

// POST /project/typelist/updType 接口描述：更新报修类型
export const updType = params =>{
  return  ax.post("repairApi/project/typelist/updType",  params ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 


// 新增维修工人 接口描述:增加维修工人
export const addWorker = params =>{
  return  ax.post("repairApi/project/worker/addWorker",  params ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 

// POST /project/login/updGly 接口描述：修改管理员
export const updGly = params =>{
  return  ax.post("repairApi/project/login/updGly",  params ).then(res=> {
    console.log(res,"这个是getMatlistList");
    return res;
  }).catch(err=>err);
} 


// GET /project/house/getHouseList 接口描述：获取房屋
export const getHouseList = () =>{
  return  ax.get("repairApi/project/house/getHouseList").then(res=> {
    console.log(res,"这个是getHouseList");
    return res;
  }).catch(err=>err);
} 


// GET /project/house/getHouseList 接口描述：删除房屋
export const delHouse = (params) =>{
  return  ax.get("repairApi/project/house/delHouse", {params}).then(res=> {
    console.log(res,"这个是delHouse");
    return res;
  }).catch(err=>err);
} 


// POST /project/addHouse 接口描述：修改管理员
export const addHouse = params =>{
  return  ax.post("repairApi/project/house/addHouse",  params ).then(res=> {
    console.log(res,"这个是addHouse");
    return res;
  }).catch(err=>err);
} 


// POST /project/addHouse 接口描述：修改管理员
export const updHouse = params =>{
  return  ax.post("repairApi/project/house/updHouse",  params ).then(res=> {
    console.log(res,"这个是addHouse");
    return res;
  }).catch(err=>err);
} 