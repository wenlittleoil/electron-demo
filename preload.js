/**
 * 预加载脚本包含在浏览器窗口加载网页之前运行的代码，其可访问 DOM 接口和 Node.js 环境
 */
const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.querySelector('video');
  if (videoElement) {
    videoElement.play();
  }
  const versionsElement = document.getElementById('versions');
  if (versionsElement) {
    versionsElement.innerText = 
      `应用平台及版本：${process.platform}, ${JSON.stringify(process.versions)}`;
  }
});

contextBridge.exposeInMainWorld("customGlobalField", {
  globalData: {
    a: 100,
    b: "hello",
  },
  globalMethod: () => {
    return "globalMethod";
  },

  ping: (arg1) => ipcRenderer.invoke('ping', {
    arg1,
    arg2: 2,
  }),
  openFile: () => ipcRenderer.invoke('open-file'),
  hello: () => ipcRenderer.send('hello', 'world'),
  onMessageFromMain: (callback) => {
    ipcRenderer.on('msg-from-main', (event, arg) => callback(arg));
  },
});

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  reset: () => ipcRenderer.invoke('dark-mode:reset'),
});

contextBridge.exposeInMainWorld('shell', {
  open: () => ipcRenderer.send('shell:open')
});
