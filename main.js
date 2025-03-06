const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

console.log("应用版本：", process.platform, process.versions);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: true, // 窗口左上角显示系统标准的最小化、最大化和关闭按钮等顶部栏外框区域
    fullscreen: false,
    alwaysOnTop: false,
    backgroundColor: '#000000'
  });

  // load a local HTML file
  win.loadFile('index.html');
  // load a remote URL
  // win.loadURL('https://fanyi.youdao.com/index.html#/TextTranslate');

  win.setAlwaysOnTop(false, 'screen-saver');
}

app.whenReady().then(() => {
  createWindow();

  // 创建应用程序菜单
  // const isMac = process.platform === 'darwin';
  // const template = [
  //   ...(isMac ? [{
  //     label: app.name,
  //     submenu: [
  //       { role: 'about' }, // 关于菜单
  //       { type: 'separator' },
  //       { role: 'quit' } // 退出菜单
  //     ]
  //   }] : [])
  // ];
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    console.log("activate!");
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // 在关闭一个应用的所有窗口后让它退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

