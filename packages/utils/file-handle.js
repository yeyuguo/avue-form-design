
import { saveAs } from 'file-saver';
import {composeComponentKey} from '../const.js'

export function saveFile(content, filename) {
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename);
}




// 保存组合配置
export function saveConfigToLocal(keyname, value) {
  let config = localStorage.getItem(composeComponentKey)
  if(!config) {
    config = {
      formConfig: [],
      tableConfig: [],
    }
  }else{
    config = JSON.parse(config)
  }
  if(!config[keyname]) {
    config[keyname] = []
  }
  config[keyname].push(value)
  const result = JSON.stringify(config)
  try {
    localStorage.setItem(composeComponentKey, result)
    this.$confirm('已保存成功！是否需要下载成文件', '是否下载').then(()=>{
      saveFile( result, 'test.json')
    })
  } catch (error) {
    console.error('error', error)        
  }
}