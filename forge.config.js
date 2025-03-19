const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    // 应用程序图标
    icon: 'src/assets/icons/app-icon',
    // 不设置的话默认取package.json中的name字段
    name: 'My-Electron-Demo', // 应用名称，macOS生效
  },
  rebuildConfig: {},
  makers: [
    {
      // 生成Windows应用安装包.exe
      name: '@electron-forge/maker-squirrel', // 只能在Windows开发机上构建，否则需要在系统安装wine来模拟Windows环境
      config: {
        name: 'My-Electron-Demo-Windows', // 应用名称，Windows生效
      },
    },
    {
      // 生成macOS应用安装包.app
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      // 生成macOS应用安装包.dmg
      name: '@electron-forge/maker-dmg', // 内置依赖electron-installer-dmg，只能在macOS开发机上构建
      config: {
        // dmg安装向导窗口配置
        name: 'My-Electron-Demo-macOS', // 窗口标题
        background: './src/assets/icons/app-installer-bg.png', // 窗口背景图片
        icon: './src/assets/icons/app-icon.icns', // 窗口显示应用图标
        format: 'ULFO',
      },
    },
    {
      // 生成Linux应用安装包.deb
      name: '@electron-forge/maker-deb',
      config: {
        productName: 'My-Electron-Demo-Linux', // 应用名称，Linux生效
      },
    },
    {
      // 生成Linux应用安装包.rpm
      name: '@electron-forge/maker-rpm',
      config: {
        productName: 'My-Electron-Demo-Linux', // 应用名称，Linux生效
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    // 当前版本的Electron Forge不支持Fuse V1，所以暂时注释掉
    // new FusesPlugin({
    //   version: FuseVersion.V1,
    //   [FuseV1Options.RunAsNode]: false,
    //   [FuseV1Options.EnableCookieEncryption]: true,
    //   [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    //   [FuseV1Options.EnableNodeCliInspectArguments]: false,
    //   [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    //   [FuseV1Options.OnlyLoadAppFromAsar]: true,
    // }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'wenlittleoil', // github-user-name
          name: 'electron-demo', // github-repo-name
        },
        prerelease: false,
        draft: true
      }
    }
  ],
};
