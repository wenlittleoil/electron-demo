import { FC, useEffect } from "react";

const index:FC<{}> = () => {
  useEffect(() => {
    const NOTIFICATION_TITLE = 'Notification Title 1'
    const NOTIFICATION_BODY = 'This is a test notification content 1'
    const CLICK_MESSAGE = 'Notification 1 clicked!'
    new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
      .onclick = () => {
        console.log(CLICK_MESSAGE)
      }
  }, []);
  return (
    <div>
      <div>
        <p>Web Notifications</p>
        <p>
          在浏览器中，需要向用户请求权限，在用户同意后才能发送通知；
          但在Electron中，默认情况下会自动授予权限，因此不需要请求权限，
          若设置了setPermissionRequestHandler，就需要处理请求权限。
        </p>
        <p>Click the button below to trigger a notification.</p>
        <button
          onClick={() => {
            const notification = new window.Notification('Notification Title 2', {
              body: "This is a test notification content 2",
            });
            notification.onclick = () => {
              console.log("Notification 2 clicked!");
            }
          }}
        >
          Show Notification
        </button>
      </div>
    </div>
  );
}

export default index;
