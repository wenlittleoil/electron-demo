const { ipcMain } = require("electron")
const path = require('path')
const fs = require('fs')
const https = require('https')

// 在操作系统磁盘上预先创建好要拖拽的实际文件
const subDir = 'dd-asset';

const dir = path.join(__dirname, subDir);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const iconName = path.join(dir, 'iconForDragAndDrop.png')
const icon = fs.createWriteStream(iconName)

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(path.join(dir, 'drag-and-drop-1.md'), '# First file to test drag and drop - 测试文件1')
fs.writeFileSync(path.join(dir, 'drag-and-drop-2.md'), '# Second file to test drag and drop - 测试文件2')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  response.pipe(icon)
});

module.exports = function() {
  // 在应用中，监听web主窗口中的拖拽事件，然后将拖拽控制权交由操作系统进行startDrag
  ipcMain.on('ondragstart', (event, filePath) => {
    console.log('监听web主窗口 - ondragstart');
    event.sender.startDrag({
      file: path.join(dir, filePath),
      icon: iconName,
    });
  });
}
