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
