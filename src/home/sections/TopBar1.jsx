import React, { useState, useEffect } from "react";
import { debounce, classList } from "../../utils";
import { Icon, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import ScrollTo from "../common/ScrollTo";

const TopBar1 = () => {
  const [isTop, setIsTop] = useState(true);
  const [isClosed, setIsClosed] = useState(true);

  let scrollableElement = document.querySelector(".scrollable-content");
  if (!scrollableElement) scrollableElement = window;

  let handleScrollRef = null;
  let toggleIcon = isClosed ? "menu" : "close";

  const handleScroll = () => {
    return debounce(({ target: { scrollTop } }) => {
      let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
      setIsTop(isCurrentTop);
    }, 20);
  };

  handleScrollRef = handleScroll();

  const close = () => {
    setIsClosed(false);
  };

  useEffect(() => {
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScrollRef);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScrollRef);
      }
    };
  }, [scrollableElement, handleScrollRef]);

  return (
    <section
      className={classList({
        header: true,
        "header-fixed": !isTop,
        closed: isClosed,
      })}
    >
      <div  className="container header-container">
        <div className="brand">
          <img src="./assets/images/Transparent Logo.png" alt=""  style={{transform:'scale(2)'}}/>
        </div>
        <ul className="navigation">
          {/* <li>
            <NavLink to="/demos">Demos</NavLink>
          </li> */}
          <li>
            <ScrollTo to="intro1" onScroll={close}>
              Home
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="portfolio1" onScroll={close}>
              Why Shmyy?
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="service1" onScroll={close}>
              Services
            </ScrollTo>
          </li>
          {/* <li>
            <ScrollTo to="faq1" onScroll={close}>
              FAQs
            </ScrollTo>
          </li> */}
          <li>
            <ScrollTo to="pricing2" onScroll={close}>
              Pricing
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="cta2" onScroll={close}>
              Free Demo
            </ScrollTo>
          </li>
          
          <li>
            <ScrollTo to="footer1" onScroll={close}>
              Contact
            </ScrollTo>
          </li>
        </ul>
        <div className="m-auto" />
        <ul className="navigation">
          <li>
            <a href="/get-started/info">
              <Icon className="mr-4">clipboard</Icon> Get Started
            </a>
          </li>
        </ul>
        <IconButton
          className="header__toggle"
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        >
          <Icon>{toggleIcon}</Icon>
        </IconButton>
      </div>
    </section>
  );
};

export default TopBar1;
