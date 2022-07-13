import React, { useState, useEffect } from "react";
import { Grid, Icon, Fab, darken } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ScrollTo from "../common/ScrollTo";
import clsx from "clsx";
import { debounce, classList } from "../../utils";
import useAnalyticsEventTracker from '../useAnalyticsEventTracker';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "5rem 0px !important",
    overflow: "visible !important",
    background:
      "url(./assets/images/home-bg.jpg) center center/cover no-repeat",
    "& h1, h2, h3, h4, h5, h6, button": {
      color: "#fff",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "100px 0 !important",
      textAlign: "center",
      "& .list": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  },
  title: {
    textShadow: "0 4px 4px rgba(0, 0, 0, 0.22)",
  },
  whiteButton: {
    background: "#fff !important",
    "&:hover": {
      background: `${darken("#ffffff", 0.1)} !important`,
    },
  },
  product: {
    position: "relative",
    top: "-70px",
    "& img": {
      width: "100%",
      borderRadius: "0.5rem",
      boxShadow:
        "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    },
    [theme.breakpoints.down("md")]: {
      left: 0,
      top: 0,
    },
  },
  productLink: {
    position: "absolute",
    top: "-100px",
    left: "-30px",
    textAlign: "center",
    display: "block",
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "37px 20px",
    boxSizing: "border-box",
    overflow: "hidden",
    boxShadow: "0 14px 32px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",

    "&:hover": { boxShadow: "0 19px 32px rgba(0, 0, 0, 0.4)" },

    [theme.breakpoints.down("md")]: {
      display: "none !important",
    },
  },
}));

const Intro1 = () => {
  const classes = useStyles();
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
    <section className={clsx("section text-white")} id="intro1">
      <div className={classes.introWrapper}>
        <div className="container">
          <Grid container spacing={3} justify="center">
            <Grid item md={6}>
              <h1 className={clsx("mb-6 text-48", classes.title)}>
                Connect with all your customers from one platform.
              </h1>
              <div className="text-22 mb-10">
                Grow your Depop shop into a brand with Shmyy – accept payments, handle shipping, market to your base and more, all from one place.
              </div>

              {/* <div className="mb-10 list">
                <div className="flex items-center mb-4">
                  <Icon color="secondary" className="mr-2">
                    check
                  </Icon>
                  Unlimited Projects.
                </div>
                <div className="flex items-center mb-4">
                  <Icon color="secondary" className="mr-2">
                    check
                  </Icon>
                  Unlimited Team Members.
                </div>
                <div className="flex items-center mb-4">
                  <Icon color="secondary" className="mr-2">
                    check
                  </Icon>
                  Unlimited Disk Space.
                </div>
              </div> */}

              <div>
                {/* <Fab
                  variant="extended"
                  size="large"
                  color="primary"
                  aria-label="Buy"
                  className="px-6 text-18 m-2"
                >
                  <Icon className="mr-4">flight_takeoff</Icon>
                  Take off
                </Fab> */}
                <ScrollTo to="cta2" onScroll={close}>
                  <Fab 
                    onClick={()=>gaEventTracker('Free Demo 1')}
                    variant="extended"
                    size="large"
                    aria-label="Download"
                    cursor='pointer'
                    className={clsx("px-6 text-18 m-2")}
                    style={{backgroundColor:'#798be5'}}
                  >
                    {/* <Icon className="mr-4">alarm_on</Icon> */}
                    Free Demo
                  </Fab>
               </ScrollTo>
                
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.product}>
                {/* <a
                  href="https://themeforest.net/user/mh_rafi/portfolio"
                  className={classes.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-32 font-bold">$16</div>
                  <span className="text-14">Buy On ThemeForest</span>
                </a> */}
                <img
                  style={{transform:'scale(0.8)'}}
                  src="./assets/images/screenshots/land.jpg"
                  alt=""
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Intro1;
