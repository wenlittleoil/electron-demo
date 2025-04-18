const { session } = require("electron");

function handleDeviceAccess(mainWindow) {
  // const _session = mainWindow.webContents.session;
  const _session = session.defaultSession;
  _session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      console.log('permission', permission);
      if (permission === 'usb' || permission === 'usb-device') {
        console.log('USB permission requested');
        callback(true); // 允许访问
      } else {
        callback(false); // 拒绝其他权限
      }
    }
  );
}

module.exports = handleDeviceAccess;
