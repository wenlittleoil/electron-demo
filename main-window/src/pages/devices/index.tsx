import { FC } from "react";

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

  return (
    <div>
      <div>
        <h3>WebUSB API</h3>
        <button 
          id="clickme"
          onClick={requestUSBDevice}
        >
          Test WebUSB
        </button>
      </div>
    </div>
  );
}

export default index;
