
const globalDataEle = document.getElementById('global-data');
if (globalDataEle) {
  console.log(window.customGlobalField?.globalMethod?.());

  const globalData = window.customGlobalField?.globalData;
  globalDataEle.innerText = "全局数据：" + JSON.stringify(globalData);

  // 主进程和渲染进程之间的IPC通讯
  window.customGlobalField.ping(1).then((result) => {
    console.log(result);
  });
}

document.getElementById("open-file")?.addEventListener('click', async () => {
  const result = await window.customGlobalField.openFile();
  const ele = document.getElementById('open-file-result');
  ele && (ele.innerText = "打开文件结果：" + JSON.stringify(result));
});

document.getElementById("send-event-to-main-process")?.addEventListener('click', () => {
  window.customGlobalField.hello();
});

window.customGlobalField.onMessageFromMain((arg) => {
  const ele = document.createElement('p');
  ele.innerText = `网页渲染进程收到来自主进程的消息：${arg}`;
  document.body.appendChild(ele);
});
