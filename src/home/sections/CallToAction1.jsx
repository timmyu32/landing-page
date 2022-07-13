import React, { useState, useEffect } from "react";
import { debounce, classList } from "../../utils";
import { Grid, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ScrollTo from "../common/ScrollTo";
import useAnalyticsEventTracker from '../useAnalyticsEventTracker';

import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  sectionBG: ({ bg }) => ({
    background: `url(${
      bg || "./assets/images/home-bg.jpg"
    }) center center/cover no-repeat`,
  }),
}));

const CallToAction1 = ({ bg }) => {
  const classes = useStyles({ bg });
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

  const gaEventTracker = useAnalyticsEventTracker('Interest Clicks');


  return (
    <div className={clsx("section text-white", classes.sectionBG)} id="cta1">
      <div className="container">
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <h2 style={{fontSize:'36px'}}>Find out if Shmyy is a good fit for you.</h2>
            <h4 className="text-inherit">
              Put your card away, you won't need it. Sign up for a free demo.
            </h4>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} className="text-center">
            <ScrollTo to="cta2" onScroll={close}>
              <Button onClick={()=>gaEventTracker('Free Demo 1')} style={{backgroundColor:'white'}} size="large" color="secondary" variant="contained">
                  Free Demo
              </Button>
            </ScrollTo>

          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CallToAction1;
