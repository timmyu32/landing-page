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
  const mql = window.matchMedia('(max-width: 480px)');

  let mobileView = mql.matches;

  return (
    <div className={clsx("section text-black")} id="cta3">
      <div className="container">
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid item lg={4} md={4} sm={12} xs={12}>
            {mobileView?<></>:
          <ScrollTo to="cta2" onScroll={close}>
              <Button onClick={()=>gaEventTracker('Free Demo 1')} style={{backgroundColor:'#798be5', color:'white'}} size="large" color="secondary" variant="contained">
                  Free Demo
              </Button>
            </ScrollTo>
            }


          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12} >
              
              <h1 style={{fontSize:'36px'}}>Say goodbye to <span style={{'fontWeight':'bold', 'backgroundColor':'#798be5', 'borderRadius':'5px', 'paddingLeft':'4px','paddingRight':'4px',}}>seller's fees</span>. </h1>
              <h3 style={{'marginLeft':'15px'}}>Shmyy does not take any percentage of your final sale price as a fee.</h3>
              <h5 style={{'marginLeft':'30px'}} className="text-inherit">
              Stripe takes 2.99% + $0.30 per transaction– after that, the all the money goes where it should: <span style={{'fontWeight':'bold', 'textDecoration':'underline'}}>to the seller NOT the platform.</span>
            </h5>

          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CallToAction1;
