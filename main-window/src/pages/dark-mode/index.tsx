import { FC, useState } from "react";

const MODE = {
  system: "跟随系统",
  light: "白天模式",
  dark: "暗黑模式",
}

type TMode = keyof typeof MODE;

const index:FC<{}> = () => {
  const [mode, setMode] = useState<TMode>('system');
  return (
    <div>
      <button 
        id="toggle-dark-mode"
        onClick={async () => {
          const themeSource = await window.darkMode?.toggle();
          setMode(themeSource);
        }}
      >
        Toggle App Theme
      </button>
      <button 
        id="reset-to-system"
        onClick={async () => {
          const themeSource = await window.darkMode?.reset();
          setMode(themeSource);
        }}
        style={{
          marginLeft: "10px",
        }}
      >
        Reset to System Theme
      </button>
      <p>
        当前背景色模式：{MODE[mode]}
      </p>
    </div>
  );
}

export default index;
