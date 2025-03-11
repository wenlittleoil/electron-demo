const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    // 应用程序图标
    icon: 'src/assets/icons/app-icon',
    // 应用名称，不设置的话默认取package.json中的name字段
    name: 'My-Electron-Demo-macOS', // macOS生效
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // 应用名称，不设置的话默认取package.json中的name字段
        name: 'My-Electron-Demo-Windows', // Windows生效
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        productName: 'My-Electron-Demo-Linux', // Linux生效
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        productName: 'My-Electron-Demo-Linux', // Linux生效
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
};
