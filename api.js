var host = "http://www.bufantec.com/admin/xy/";

/**
 * 登陆之前需要注册测试账号
 * http://www.bufan.com/wx/liteDev/register?appId=yourappid&appSecret=yourappSecret
 * 返回结果为 code: success 表示注册成功
 * 
 * 删除账号
 * http://www.bufan.com/wx/liteDev/del?appId=yourappid
 * 返回结果为 code: success 表示删除成功
 */

var api = {
  // 登陆  两个参数: { code: wx.login返回的, appid: 测试号appid }  get
  login: host + "lite/student/doLogin",

  // 获取用户当前状态 0 初始化; 1 申请试听; 2 试听申请成功; 3 入学申请中; 4 入学申请通过
  // 参数 { id: uid } get
  status: host + `lite/student/getUserStatus`,

  // 申请申请占座  post  x-www-form-urlencoded
  applyListen: host + `lite/student/orderZhan`,

  // 获取学员明细 GET
  // 参数 { id: uid }
  detail: host + `lite/student/detail`,

  // 获取班级列表 GET 参数 { limit: 30 }
  classLs: host + `clazz/list`,

  // 获取宿舍列表 GET 参数 { limit: 30 }
  // 将获取的宿舍列表添加一项: 自选租住地
  dormLs: host + `dorm/list`,

  // 查看缴费信息  get { id: uid }
  cost: "lite/student/costList",

  // 入学申请 post  x-www-form-urlencoded
  applyStudy: host + `lite/student/orderRu`
}

/**
 * 申请试听课的参数
 * id: 用户id必填
 * name: 姓名
 * age: 年龄
 * sex: 性别 (0:男 1:女)
 * tel: 电话
 * education: 学历(下标)
 * major: 专业(学历是高中以上))
 * school: 学校名称
 * oldjob: 过去职位(已参加工作)
 * classType: 选择的课程类型(0:H5 1:UI)
 * startDate: 选择试听的时间
 * 
 * 参数以 xyUserLite.xx 的形式发往后台 故需要序列化
 * var xyUserLite = { id: "xxx", name: "libai"}
 * ==> xyUserLite.id=xxx&xyUserLite.name=libai
 * 人工实现方法 遍历对象 var str = `&xyUserLite.${i}=${xyUserLite[i]}`
 * 如果借助qs,使用qs方法 qs.stringify(xyUserLite, { allowDots: true})
 */

/**
 * 申请入学的参数
 * id: 用户id
 * tel2: 紧急联系人
 * manID: 身份证号
 * city: 城市的地市编码
 * cityText: 城市的文字版
 * classId: 选择的班级id
 * dormId: 选择的宿舍id,有它没有address
 * address: 自选租住地,有它没有dormId
 * 
 * 提交方式同上
 */


/**
 * 批准占座申请: http://www.bufan.com/admin/xy/student/confirmZhan?id=yourid
 * 批准入学申请: http://www.bufan.com/admin/xy/student/confirmRu?id=yourid
 */

export default api;