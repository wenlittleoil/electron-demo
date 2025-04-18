const { ipcMain, nativeTheme } = require("electron");

function handleDarkMode() {
  ipcMain.handle('dark-mode:toggle', async (event) => {
    // 切换应用主题色
    nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
    return nativeTheme.themeSource;
  });
  ipcMain.handle('dark-mode:reset', async (event) => {
    // 设置应用主题色跟随系统主题色
    nativeTheme.themeSource = 'system';
    return nativeTheme.themeSource;
  });
}

module.exports = handleDarkMode;
