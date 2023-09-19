import request from '@/utils/request'

/**
 * 审批单位同意审批接口
 */

export function applyUpdate(data) {

  var param;
  data.approvalOpinion = 1;
  param = {"id": data.id, "approvalOp": data.approvalOpinion};
  // console.log(param);
  return request({
    url: '/rs/gbhApprovalUnit/approval',
    method: 'post',
    data: param
  })
}

/**
 * 审批单位同意审批接口
 */

export function applyUpdate1(data) {

  var param;
  data.approvalOpinion = 2;
  param = {"id": data.id, "approvalOp": data.approvalOpinion};
  // console.log(param);
  return request({
    url: '/rs/gbhApprovalUnit/approval',
    method: 'post',
    data: param
  })
}

/**
 * 查询审批单位待审批列表
 */
export function fetchList(params) {
  return request({
    url: '/rs/gbhApprovalUnit/listApply',
    method: 'get',
    params: params
  })
}

/**
 * 查询审批单位已审批列表
 */
export function fetchOldList(params) {
  return request({
    url: '/rs/gbhApprovalUnit/oldApply',
    method: 'get',
    params: params
  })
}

/**
 * 查询审批单位所有申请列表
 */
export function fetchAllList(params) {
  return request({
    url: '/rs/gbhApprovalUnit/allApply',
    method: 'get',
    params: params
  })
}

/**
 * 查询所有场地信息
 */
export function fetchAllPlace() {
  return request({
    url: '/rs/gbhPlace/list',
    method: 'get',
  })
}

/**
 * 查询所有借用部门信息
 */
export function fetchAllBorrowUnit() {
  return request({
    url: '/api/search/BorrowUnit',
    method: 'get',
  })
}




// WEBPACK FOOTER //
// ./src/api/approvalUnit.js