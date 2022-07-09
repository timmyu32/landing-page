  
import React, { useState, useEffect } from "react";
import ScrollTo from "../common/ScrollTo";
import { debounce, classList } from "../../utils";
import {
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { makeStyles } from '@mui/styles';

import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  card: {
    "& .card-header": {
      background: "rgba(0, 0, 0, 0.024)",
    },
    "& .card-header-highlighted": {
      background: "rgba(var(--primary),1)",
      "& span": {
        color: "#fff",
      },
    },
  },
}));

const Pricing1 = () => {
  const [state, setState] = useState({
    switchToggled: false,
    plan: "month",
    off: 10,
  });

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

  const classes = useStyles();

  const pricingList = [

    {
      title: "Starter",
      subtitle: "",
      price: 30,
      allowedOfferIndexList: [0, 1, 2, 3],
    },
    {
      title: "Intermediate",
      subtitle: "",
      price: 50,
      allowedOfferIndexList: [0, 1, 2, 3, 4],
    },
    {
      title: "Pro",
      subtitle: "",
      price: 60,
      allowedOfferIndexList: [0, 1, 2, 3, 4, 5,6],
    },

  ];

  const offerList = [
    "Custom Domain Name",
    "Web Hosting",
    "Shmyy Storefront Template",
    "Admin Site",
    "Depop Inventory Tracking",
    "Custom Design",
    "Data analytics",
  ];

  const getPriceList = () => {
    let { switchToggled, off } = state;

    if (switchToggled) {
      return [...pricingList].map((item) => {
        let plan = { ...item };
        let { price } = plan;

        if (price !== "Free") {
          price = price * 12;
          price = Math.round(price - (price * off) / 100);
        }
        plan.price = price;
        return plan;
      });
    }
    return pricingList;
  };

  const handleSwitchChange = () => {
    let { switchToggled, plan } = state;
    switchToggled = !switchToggled;
    switchToggled ? (plan = "Yr") : (plan = "Mo");
    setState({ ...state, switchToggled, plan });
  };

  return (
    <div style={{backgroundColor:'#d6d6d6'}} className="section section-pricing1" id="pricing1">
      <div className="container">
        {/* <div className="mb-6">
          <h2>Choose a Plan</h2>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={state.switchState}
                onChange={handleSwitchChange}
              />
            }
            label="Get up to 10% discount annually"
          />
        </div> */}

        <Grid style={{justifyContent:'center'}} container spacing={2}>
          {getPriceList().map((plan) => {
            let { title, subtitle, price, allowedOfferIndexList } = plan;

            return (
              <Grid item lg={3} md={3} sm={6} xs={12} key={title}>
                <Card className={clsx("text-center card", classes.card)}>
                  <div
                    className={clsx({
                      "card-header flex-column items-center p-3": true,
                      "card-header-highlighted": title === "Intermediate",
                    })}
                  >
                    <span className="text-16">{title}</span>
                    <span className="text-small">{subtitle}</span>
                  </div>
                  <Divider className="mb-2" />
                  <CardContent className="pricing1__card-content">
                    <h1 className="mt-0 mb-0 text-32">
                      {typeof price == "number"
                        ? `$ ${price} per ${state.plan}`
                        : "Free"}
                    </h1>

                    <h3 className="mt-0 mb- text-24">
                        {title === 'Starter' ? <div>$100 upfront</div> :<></>}
                        {title === 'Intermediate' ? <div>$280 upfront</div> :<></>}
                        {title === 'Pro' ? <div>$350 upfront</div> :<></>}
                    </h3>

                    {offerList.map((offer, index) => (
                      <div 
                        key={index}
                        style={{fontSize:'16px', fontWeight:'bold'}}
                        className={clsx({
                          "px-3 py-2": true,
                          "text-muted": !allowedOfferIndexList.includes(index),
                        })}
                      >
                        
                        {allowedOfferIndexList.includes(index) ? offer : '     -     '}
                      </div>
                    ))}

                    
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          
        </Grid>
        <div className="text-center mt-4">
                    <h5 style={{fontSize:'12px'}}>*Standard 3.5% transaction fee applies for all plans</h5>
                      <ScrollTo to="cta2" onScroll={close}>
                        <Button style={{backgroundColor:'#798be5', cursor:'pointer'}} variant="contained">
                          Free Demo
                        </Button>
                      </ScrollTo>
                    </div>
      </div>
    </div>
  );
};

export default Pricing1;
