import { FC, useState } from "react";
import './index.scss';

const index:FC<{}> = () => {
  return (
    <div className="page-spellchecker">
      <div>
        当英文单词拼写错误时，底部会出现红色波浪线或红点提示，例如输入<strong>hlo</strong>。
        当输入<strong>hello</strong>时，则会消失。
      </div>
      <div className="ipt">
        <input />
      </div>
      <div className="ipt">
        <textarea />
      </div>
    </div>
  );
}

export default index;
