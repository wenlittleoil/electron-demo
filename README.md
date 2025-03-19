# 使用electron开发macOS/Windows/Linux跨平台桌面应用

## 操作步骤
1. 查看当前npm镜像源：`npm config get registry`
2. 设置npm国内镜像源：`npm config set registry https://registry.npmmirror.com`
3. 设置electron国内镜像源：`vim ~/.bash_profile`
4. 在最后一行添加`export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/`并保存，然后`source ~/.bash_profile`
5. 运行`npm i && npm start`

## 相关版本
1. 开发平台macOS 10.14.6，安装python3版本3.13.2，安装xcode-select版本2354
2. 开发平台nodejs版本v18.19.0
3. 开发平台项目包管理工具yarn版本1.22.21

## 相关命令
1. 开发：`npm run start`
2. 打包构建：`npm run make` 或 `DEBUG=electron-forge:* npm run make` 生成 `out`文件夹

## 使用@electron-forge/publisher-github自动化发布到GitHub远程
1. 参考文档：https://www.electronjs.org/zh/docs/latest/tutorial/%E6%8E%A8%E9%80%81%E6%9B%B4%E6%96%B0%E6%95%99%E7%A8%8B
2. 编辑`forge.config.js`，配置GitHub远程仓库`publishers - @electron-forge/publisher-github - config - repository`
3. 在macOS上`vim ~/.bash_profile`设置环境变量`export GITHUB_TOKEN=your-github-token`
4. `source ~/.bash_profile`后，验证是否设置成功`echo $GITHUB_TOKEN`
5. `npm run publish`

