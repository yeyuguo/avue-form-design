import { option } from './option'
import { dicList } from './dic'
import { deepClone } from '@utils/deepClone'
export const crudDecoder = {
  getOptionKV: function () {
    // option.column
    let kvObj = new Object();
    let selectTypeList = new Array()
    option.group.forEach(ele => {
      if (ele['column']) {
        ele.column.forEach(e => {
          // console.log(JSON.stringify(e))
          kvObj[e.prop] = "";
          if (e.type === 'select') {
            selectTypeList.push(e.prop);
          }

        })

      }
    })
    selectTypeList.forEach(e => {
      kvObj['$' + e] = "";
    })
    return kvObj;

  },
  //根据输入框类型填充
  prefillDicList: (ele) => {
    if (ele.type && ele.type.length > 0) {
      for (let i = 0; i < dicList.length; i++) {
        let item = dicList[i];
        // console.log(JSON.stringify(item))
        if (item.value === ele.type) {
          ele['$' + ele.type] = item.label
          break;
        }
      }
    } else {
      ele['type'] = 'input'
      ele['$type'] = "输入框"
    }

    Object.keys(ele).forEach(e => {
      if (e.includes('$')) {
        let key = e.replace("$", "")
        if (ele[key] === 'true') {
          ele[e] = '是'
        } else if (ele[key] === 'false') {
          ele[e] = '否'
        }

      }
    })
    //console.log("prefillDicList:"+JSON.stringify(ele))
  },
  // 预览数据格式 转成 表格编辑格式
  decode: function (opt, boolAsStr = false) {//boolAsStr bool 是否按字符串处理,默认不按字符处理
    // console.log(opt)
    if (Object.keys(opt).length == 0) return;
    var column = opt.column;
    let objList = new Array()
    let optKV = this.getOptionKV();
    for (var i = 0; i < column.length; i++) {
      var e = column[i];
      let obj = deepClone(optKV);
      Object.keys(e).forEach(key => {
        //   console.log("key:"+key+","+e[key])
        if (boolAsStr && (e[key] === true || e[key] === false)) {//boolean 转为字符串方式，不然form 的select 报错
          e[key] = "" + e[key]
        }
        obj[key] = e[key];
      })
      this.prefillDicList(obj)


      objList.push(obj)
    }

    //console.log("decoder decode:"+JSON.stringify(objList))
    return objList;
  }, 
  // 表格数组 编辑项 转成 预览数据格式
  encodeAry: function(data=[]) {
    let dataList = deepClone(data)
    function vaild (option = {}, ele = '') {
      const result = option[ele] + '' || '';
      return !result || ele.includes('$')
    }
    dataList = dataList.map(item=> {
      Object.keys(item).forEach(keyname=>{
        if(vaild(item, keyname)){
          delete item[keyname];
        }
      })
      return item
    })
    return {
      column: dataList
    }
  }
}