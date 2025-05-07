const { 
  app, 
  BrowserWindow, 
  Menu, 
  ipcMain, 
  MessageChannelMain, 
  nativeTheme, 
  globalShortcut,
  shell,
} = require('electron');
const { dialog } = require('electron/main');
const path = require('path');
const handleDeviceAccess = require('./src/main/handleDeviceAccess');
const handleDarkMode = require('./src/main/handleDarkMode');
const handleDragDrop = require('./src/main/handleDragDrop');

// console.log("应用平台及版本：", process.platform, process.versions);

// process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

let mainWindow;

// 将当前app设置为electron-fiddle协议的默认处理程序
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}

/**
 * The return value of this method indicates whether or not this instance of your application successfully obtained the lock. 
 * If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.
 */
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit();
} else {
  // Windows 和 Linux 上
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
    dialog.showErrorBox('Welcome Back On Windows/Linux', `You arrived from: ${commandLine.pop().slice(0, -1)}`);
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    afterReady();
  });

  // MacOS 上
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back On MacOS', `You arrived from: ${url}`);
  });
}

const openFile = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) return;
  return filePaths[0];
}

function createWindow () {
  // 主窗口（渲染进程一）
  mainWindow = new BrowserWindow({
    show: true, // 是否展示窗口
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true, // 是否启用上下文隔离
      nodeIntegration: false, // 是否启用Node.js集成
      preload: path.join(__dirname, 'preload.js'), // 指定预加载脚本
      sandbox: true, // 该渲染进程启用沙盒模式
      // experimentalFeatures: true, // 启用实验性 API（包括 WebUSB）
    },
    frame: true, // 窗口左上角显示系统标准的最小化、最大化和关闭按钮等顶部栏外框区域
    fullscreen: false,
    alwaysOnTop: false,
    /**
     * 设置启动窗口瞬间的主题色
     * nativeTheme指的是electron应用主题色，启动时默认采用系统主题色，但跟系统主题色互相独立
     */
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#333' : '#ddd',
  });

  handleMainWindow(mainWindow);

  // load a local HTML file
  // mainWindow.loadFile('index.html');

  // integrate with a local Create-React-App project
  if (process.env.CUSTOM_ENV === 'local') {
    // 本地开发环境
    const LOCAL_DEV_MAIN_WINDOW_HOST = 'http://localhost:5173/#/examples/dark-mode';
    mainWindow.loadURL(LOCAL_DEV_MAIN_WINDOW_HOST);
  } else {
    // 测试或生产包环境
    // 本地文件系统file协议不支持h5路由的History模式，只能使用Hash模式
    mainWindow.loadFile('main-window/dist/index.html', {
      query: {},
      hash: '#/examples/dark-mode',
    });
  }

  // load a remote URL
  // mainWindow.loadURL('https://fanyi.youdao.com/index.html#/TextTranslate');

  mainWindow.setAlwaysOnTop(false, 'screen-saver');

  const wc = mainWindow.webContents;
  wc.on('did-navigate', (event, url) => {
    console.log('导航启动:', url);
  });
  wc.on('did-navigate-in-page', (event, url) => {
    console.log('页面导航发生变化:', url);
  });

  // 从主进程UI界面发送消息到网页渲染进程
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('msg-from-main', 888),
          label: 'Send Msg to Renderer',
        },
      ]
    },
    {
      label: "菜单2",
      submenu: [
        {
          label: "菜单2-1",
          click: () => {
            console.log("菜单2-1");
          }
        },
        {
          label: "菜单2-2",
          click: () => {
            console.log("菜单2-2");
          }
        },
      ]
    },
    {
      label: "菜单3",
      submenu: [],
    },
    {
      label: '导航',
      submenu: [
        {
          label: '前进',
          click: () => {
            const canGoForward = wc.canGoForward();
            console.log("前进", canGoForward);
            if (canGoForward) {
              wc.goForward();
            }
          },
        },
        {
          label: '后退',
          click: () => {
            const canGoBack = wc.canGoBack();
            console.log("后退", canGoBack);
            if (canGoBack) {
              wc.goBack();
            }
          },
        },
        {
          label: '历史路由栈信息',
          click: () => {
            const currentIndex = wc.getActiveIndex();
            const totalLength = wc.length();
            console.log(`当前页面索引: ${currentIndex}, 总历史记录长度: ${totalLength}`);
          },
        }
      ],
    },
    {
      // 自定义应用菜单后，原来默认的开发者工具快捷键失效，需要手动添加
      label: '开发者',
      submenu: [
        {
          label: '切换开发者工具',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
          }
        },
        {
          label: '帮助',
          role: 'help',
          // 快捷键英文大小写不敏感
          accelerator: process.platform === 'darwin' ? 'Command+H' : 'Ctrl+H',
          click: () => { console.log('Electron Help!') },
        },
      ]
    },
  ]);
  Menu.setApplicationMenu(menu);

  if (process.platform === "darwin") {
    const dockMenu = Menu.buildFromTemplate([
      {
        label: '自定义程序坞菜单1',
        click: () => {
          console.log('自定义程序坞菜单1');
        },
      },
      {
        label: '自定义程序坞菜单2',
        click: () => {
          console.log('自定义程序坞菜单2');
        },
      },
    ]);
    // 在macOS上设置程序坞右键菜单，在其它平台上app.dock为undefined
    app.dock.setMenu(dockMenu);
  }

  // 打开Chromium开发者工具面板
  // setTimeout(() => {
  //   mainWindow.webContents.openDevTools();
  // }, 5000);

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key.toLowerCase() === 'w') {
      console.log("捕获web键盘事件-按下W键", input);
      event.preventDefault();
    }
  });

}

// 全局所有渲染器均启用沙盒模式
app.enableSandbox();
function afterReady() {
  ipcMain.handle('ping', (event, eventArg) => {
    // console.log('ping-arg: ', eventArg);
    return `pong ${eventArg?.arg1} ${eventArg?.arg2}`;
  });

  ipcMain.handle('open-file', openFile);

  ipcMain.on('hello', (event, eventArg) => {
    const webContents = event.sender;
    const mainWindow = BrowserWindow.fromWebContents(webContents);
    mainWindow.setTitle(`从渲染网页来设置窗口标题：${eventArg}`);

    console.log('主进程收到hello事件', eventArg);
  });

  globalShortcut.register('CommandOrControl+E+G', () => {
    // CommandOrControl 意指在macOS上使用`Command`，在Windows/Linux上使用`Control`
    console.log('全局键盘快捷键，即使当前应用程序没有获得键盘焦点');
  });

  handleMessage();

  createWindow();

  app.on('activate', () => {
    console.log("activate!");
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

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
// require('update-electron-app')();

function handleMainWindow(mainWindow) {
  handleDeviceAccess(mainWindow);
}

function handleMessage() {
  handleDarkMode();
  handleDragDrop();
}

// Handle window controls via IPC
ipcMain.on('shell:open', () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked');
  // const pagePath = path.join('file://', pageDirectory, 'index.html');
  const pagePath = "https://www.baidu.com";
  console.log("应用内唤起浏览器网页: ", __dirname, pageDirectory, pagePath);
  shell.openExternal(pagePath);
});

