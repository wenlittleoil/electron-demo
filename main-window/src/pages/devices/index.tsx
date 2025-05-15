import { FC, useEffect, useState } from "react";
import './index.scss';
import classNames from "classnames";

enum EStatus {
  online = 'online',
  offline = 'offline',
}

const index:FC<{}> = () => {

  async function requestUSBDevice() {
    try {
      const device = await (navigator as any).usb.requestDevice({
        // filters: [{ vendorId: 0x05ac }], // 替换为你的设备 vendorId
        filters: [],
      });
      console.log('Connected USB device:', device);
    } catch (err) {
      console.error('USB access denied:', err);
    }
  }

  const [networkStatus, setNetworkStatus] = useState<EStatus>();
  useEffect(() => {
    // 网络连接状态检测
    const updateOnlineStatus = () => {
      setNetworkStatus(navigator.onLine ? EStatus.online : EStatus.offline);
    }

    updateOnlineStatus(); // 初始化时调用一次检查网络状态
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    }
  }, []);

  return (
    <div className="page-devices">
      <div>
        <h3>WebUSB API</h3>
        <button 
          id="clickme"
          onClick={requestUSBDevice}
        >
          Test WebUSB
        </button>
        <div className="network-status-wrap">
          网络连接状态：
          <span 
            className={classNames("network-status", {
              "online": networkStatus === EStatus.online,
              "offline": networkStatus === EStatus.offline,
            })}
          >
            {networkStatus === EStatus.online ? '在线' : '离线'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default index;
