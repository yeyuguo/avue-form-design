
import { saveAs } from 'file-saver';

export function saveFile(content, filename) {
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename);
}
