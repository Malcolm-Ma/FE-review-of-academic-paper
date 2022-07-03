/**
 * @file layout index
 * @author Mingze Ma
 */

import Header from "./Header";
import Main from "./Main";

import './index.less';

export default () => {

  return (
    <div className="apr-frame">
      <Header />
      <div className="frame-content">
        <Main />
      </div>
    </div>
  );
};
