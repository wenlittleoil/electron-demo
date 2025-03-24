const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

console.log("应用平台及版本：", process.platform, process.versions);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // 启用上下文隔离
      preload: path.join(__dirname, 'preload.js'), // 指定预加载脚本
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

  // 打开Chromium开发者工具面板
  // setTimeout(() => {
  //   win.webContents.openDevTools();
  // }, 5000);
}

app.whenReady().then(() => {
  ipcMain.handle('ping', (event, eventArg) => {
    // console.log('ping-arg: ', eventArg);

    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(`从渲染网页来设置窗口标题：${eventArg?.arg1}-${eventArg?.arg2}`);

    return `pong ${eventArg?.arg1} ${eventArg?.arg2}`;
  });

  ipcMain.on('hello', (event, eventArg) => {
    console.log('主进程收到hello事件', eventArg);
  });

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

/**
 * Electron官方团队为GitHub开源项目提供的自动更新模块
 * 通过部署自动更新服务update.electronjs.org，检查GitHub Releases是否有新版本可用，从而实现自动更新
 */
require('update-electron-app')();

