const { session } = require("electron");

function handleDeviceAccess(mainWindow) {
  // const _session = mainWindow.webContents.session;
  const _session = session.defaultSession;
  _session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      console.log('请求permission: ', permission);
      if ([
        'usb', 
        'openExternal',
        'notifications',
      ].includes(permission)) {
        callback(true); // 允许访问
      } else {
        callback(false); // 拒绝其他权限
      }
    }
  );
}

module.exports = handleDeviceAccess;
