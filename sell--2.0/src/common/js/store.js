/**
 * 向 localStorage 存储数据
 */
export function saveToLocal(id, key, value) {
  // 将seller中的数据都存贮到 本地 _seller_ 中
  let seller = window.localStorage._seller_
  // 第一次存贮的时候 创建seller 然后为其添加属性和值
  if (!seller) {
    seller = {}
    seller[id] = {}
    // 如果不是第一次存贮
  } else {
    seller = JSON.parse('seller')
    // 判断如果没有这个商家
    if (!seller[id]) {
      seller[id] = {}
    }
    // 最后将值保存到 key 中
    seller[id][key] = value
  }
  // 将seller 转为 json 格式数据存贮到 locaStorage
  localStorage._seller_ = JSON.stringify(seller)
}

/**
 * 读取 localStorage 中的存储数据
 */
export function loadFromToLocal(id, key, _default) {
  // 先获取到存贮的数据 seller
  let seller = window.localStorage._seller_
  // 判断 seller 是否存在 不存在就返回默认值
  if (!seller) {
    return _default
  }
  // seller存在 就根据id获取到当前商家的 seller下的数据
  seller = JSON.parse(seller)[id]
  // 如果没有id这个字段
  if (!seller) {
    return _default
  }
  // 将最终取到的数据返回
  let ret = seller[key]
  return ret || _default
}
