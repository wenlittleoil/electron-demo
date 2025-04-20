import { FC } from "react";

const index:FC<{}> = () => {

  return (
    <div>
      <div>
        <h3>Keyboard Shortcuts: 键盘快捷键</h3>
        <p>Hit CmdOrCtrl+E+W to see a message printed to the console.</p>
      </div>

      <div>
        <h3>Deep Links: 支持在浏览器中通过自定义协议electron-fiddle唤起应用</h3>
        <h5>
          <div>构建安装时生效、命令行启动模式下无效。</div>
          <div>协议 electron-fiddle://</div>
          <div>协议参数 open</div>
        </h5>

        <p>The protocol API allows us to register a custom protocol and intercept existing protocol requests.</p>
        <p>These methods allow you to set and unset the protocols your app should be the default app for. Similar to when a
          browser asks to be your default for viewing web pages.</p>

        <p>Open the <a href="https://www.electronjs.org/docs/latest/api/protocol">full protocol API documentation</a> in your
          browser.</p>

        -----

        <h3>Demo</h3>
        <p>
          First: Launch current page in browser
          <button 
            id="open-in-browser" 
            className="js-container-target demo-toggle-button"
            onClick={() => {
              window.shell.open();
            }}
          >
            Click to Launch Browser
          </button>
        </p>

        <p>
          Then: Launch the app from a web link!
          <a href="electron-fiddle://open">Click here to launch the app</a>
        </p>

        ----

        <p>You can set your app as the default app to open for a specific protocol. For instance, in this demo we set this app
          as the default for <code>electron-fiddle://</code>. The demo button above will launch a page in your default
          browser with a link. Click that link and it will re-launch this app.</p>


        <h3>Packaging</h3>
        <p>This feature will only work on macOS when your app is packaged. It will not work when you're launching it in
          development from the command-line. When you package your app you'll need to make sure the macOS <code>plist</code>
          for the app is updated to include the new protocol handler. If you're using <code>@electron/packager</code> then you
          can add the flag <code>--extend-info</code> with a path to the <code>plist</code> you've created. The one for this
          app is below:</p>

        <div>
          <h5>macOS plist</h5>
          <pre>
            <code>
              &lt;?xml version="1.0" encoding="UTF-8"?&gt;
              &lt;!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"&gt;
              &lt;plist version="1.0"&gt;
              &lt;dict&gt;
              &lt;key&gt;CFBundleURLTypes&lt;/key&gt;
              &lt;array&gt;
              &lt;dict&gt;
              &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;
              &lt;array&gt;
              &lt;string&gt;electron-api-demos&lt;/string&gt;
              &lt;/array&gt;
              &lt;key&gt;CFBundleURLName&lt;/key&gt;
              &lt;string&gt;Electron API Demos Protocol&lt;/string&gt;
              &lt;/dict&gt;
              &lt;/array&gt;
              &lt;key&gt;ElectronTeamID&lt;/key&gt;
              &lt;string&gt;VEKTX9H2N7&lt;/string&gt;
              &lt;/dict&gt;
              &lt;/plist&gt;
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default index;
