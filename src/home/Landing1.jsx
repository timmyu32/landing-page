import React, { useEffect } from "react";
import { scrollTo } from "../utils";
import Intro1 from "./sections/Intro1";
import TopBar from "./sections/TopBar1";
import Services1 from "./sections/Services1";
import Portfolio1 from "./sections/Portfolio1";
import LandingPricing2 from "./sections/LandingPricing2";
// import Testimonial1 from "./sections/Testimonial1";
import CallToAction1 from "./sections/CallToAction1";
import CallToAction2 from "./sections/CallToAction2";

import FAQ1 from "./sections/FAQ1";
import Pricing2 from "./sections/Pricing2";
// import Contact1 from "./sections/Contact1";
import Footer1 from "./sections/Footer1";

const Landing1 = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="landing">
      <TopBar />
      <Intro1 />
      <Portfolio1 />
      <CallToAction1/>
      <Services1 />
      {/* <Testimonial1 /> */}
      {/* <FAQ1/> */}
      <LandingPricing2 />
      {/* <Contact1 /> */}
      <CallToAction2/>
      <Footer1 />
    </div>
  );
};

export default Landing1;
