
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
