/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */
export function urlParse() {
  // 获取当前的 url 地址中的参数（查询字符串）
  let url = window.location.search
  // 将查询字符串解析为一个对象
  let obj = {}
  // 解析查询字符串
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // 匹配返回的数组形如 ['?id=12345', '&a=b']
  if (arr) {
    // 遍历返回的数组
    arr.forEach(item => {
      // -1- 将数组中的每一项的 第一个字符(? 或者 &)去掉
      // -2- 然后将数组的每一项用 = 拆分出来 形成一个新数组
      // -3- 然后就可以在新数组中拿到 key 和 value
      // -4- 将 key 和 value 保存到 对象 obj 中
      // -5- 最终返回 obj 即拿到了 url中的参数
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
  }
  return obj
}
