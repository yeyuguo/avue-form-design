/** 对 localstorage 里的数据保存和更新
 * option {Object} {type, isSaveFile, } 
 *  type:  Array, Object, String
 * todo 验证
 */
export localConfig = function(keyname, option) {
  const localstorageKey = keyname
  // 更新数据方式 对象/数组/直接替换
  const updateHandle = function(data) {
    if(!data) {
      data = eval(option.type)
    }else{
      data = JSON.parse(config)
    }
    return data
  }
  function get() {
    let config = localStorage.getItem(localstorageKey)

    config = updateHandle(config)
    try {
      localStorage.setItem(localstorageKey, JSON.stringify(config))
      saveFile( result, 'test.json')
    } catch (error) {
      console.error('error', error)        
    }
  }
  function set(data) {
    const result = typeof data === 'string' ? JSON.stringify(data)
    try {
      localStorage.setItem(localstorageKey, result)
      if(option.isSaveFile){
        import('file-saver').then( handle => {
          handle.saveFile(result, 'test.json')
        })
        // saveFile(result, 'test.json')
      }
    } catch (error) {
      console.error('error', error)        
    }
  }

  return {
    get,
    set
  }
}