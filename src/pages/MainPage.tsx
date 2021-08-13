import React from "react";
import { Header, Order, Footer } from "../components";
import { animateScroll } from "react-scroll";

const MainPage = () => {
  const orderRef: any = React.useRef(null);
  const scrollToOrderRef = () => {
    animateScroll.scrollTo(orderRef.current.offsetTop);
  };
  return (
    <div className="main-page">
      <div className="container">
        <Header />
        <Order refProp={orderRef} scrollToOrder={scrollToOrderRef} />
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
