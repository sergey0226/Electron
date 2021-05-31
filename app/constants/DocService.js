import JsPdf from 'jspdf';
import html2canvas from 'html2canvas';
import fs from 'fs';

const {dialog} = require('electron').remote;

window.html2canvas = html2canvas;
class DocService {
  createPdf = (html,landscape = false,format = false) => {
    html2canvas(html,{scale:2})
    .then(canvas => {
      const doc = new JsPdf({
        orientation: landscape?'l':'p',
        unit: 'mm',
        format: [canvas.height,canvas.width]
      })
      const options = {
        filters :[
          {name: 'PDF', extensions: ['pdf']},
         ]
      }
      doc.addImage(canvas.toDataURL('png'),'image/png',5,0,canvas.width/2.9,canvas.height/2.9);
      dialog.showSaveDialog( options, (filename) => {
          const ism   = fs.createWriteStream(filename,{ encoding: 'binary' })
          ism.write(Buffer.from(doc.output('arraybuffer')))
          ism.end(()=>{
          });
        });
        return true;
    })
    .catch(()=>{
      
    })
  };
}

const Doc = new DocService();
export default Doc;
