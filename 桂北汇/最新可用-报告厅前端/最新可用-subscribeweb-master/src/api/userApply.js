import request from '@/utils/request'

/**
 * 查询用户待审批列表
 */
export function fetchListApply(params) {
  return request({
    url: '/rs/gbhApply/listApply',
    method: 'get',
    params: params
  })
}

/**
 * 查询用户已审批列表
 */
export function fetchOldListApply(params) {
  return request({
    url: '/rs/gbhApply/oldApply',
    method: 'get',
    params: params
  })
}

/**
 * 查询用户所有申请列表
 */
export function fetchAllListApply(params) {
  return request({
    url: '/rs/gbhApply/list',
    method: 'get',
    params: params
  })
}



// WEBPACK FOOTER //
// ./src/api/userApply.js