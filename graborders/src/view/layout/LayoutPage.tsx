import React from "react";
import TabBottomNavigator from "./TabBottomNavigator";
import ScrollToTop from "./ScrollToTop";
function LayoutPage(props) {
  return (
    <div className="">
      {/* <Header /> */}
      <ScrollToTop />
      <div className="children__content">{props.children}</div>
      <TabBottomNavigator />
    </div>
  );
}

export default LayoutPage;
