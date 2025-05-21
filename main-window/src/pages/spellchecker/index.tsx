import { FC, useState } from "react";
import './index.scss';

const index:FC<{}> = () => {
  return (
    <div className="page-spellchecker">
      <div>
        对于输入编辑类型的元素，当英文单词拼写错误时，底部会出现红色波浪线或红点提示，例如输入<i>hlo</i>。
        当输入<i>hello</i>时，则会消失。
      </div>
      <div className="ipt">
        <input />
      </div>
      <div className="ipt">
        <textarea />
      </div>

      <div className="non-ipt">对于非输入编辑类型元素，正常显示而不会有拼写检查</div>
      <div>hlo world</div>
    </div>
  );
}

export default index;
