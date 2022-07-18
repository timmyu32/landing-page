import React from "react";
import { makeStyles } from '@mui/styles';
import axios from "axios";
import {
  Grid,
  Card,
  IconButton,
  Divider,
  Icon,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import EuroIcon from "../common/icons/EuroIcon";
import StarterIcon from "../common/icons/StarterIcon";
import TieIcon from "../common/icons/TieIcon";
import CompanyIcon from "../common/icons/CompanyIcon";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  cardWrapper: {
    position: "relative",
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      height: "60%",
      left: "-1000px",
      right: "-1000px",
      top: "20%",
      background: palette.primary.main,
      opacity: 0.1,
      zIndex: -1,
    },
  },
  card: {
    padding: "2rem",
    border: `1px solid ${palette.background.default}`,
    borderRadius: 8,
    zIndex: 1,
    transition: "all 400ms",
    "&:hover": {
      border: `1px solid ${palette.primary.main}`,
      boxShadow: theme.shadows[6],
      "& [class^='MuiButtonBase-']": {
        background: palette.primary.main + "!important",
        "& [class^='MuiSvgIcon-']": {
          fill: palette.primary.contrastText + "!important",
        },
      },
    },
  },
}));

const Pricing2 = (props) => {
  const classes = useStyles();

  const user = useSelector(state => state.user.currentUser);

  const featureList = [
    "Custom Domain Name",
    "Web Hosting",
    "Shmyy Storefront Template",
    "Admin Site",
    "Depop Inventory Tracking",
    "Custom Design",
    "Data analytics",
  ];

  const planList = [
    {
      title: "Starter",
      icon: StarterIcon,
      price: 29.99,
      allowedOfferIndexList: [0, 1, 2, 3],

    },
    {
      title: "Business",
      icon: TieIcon,
      price: 49.99,
      allowedOfferIndexList: [0, 1, 2, 3, 4],

    },
    {
      title: "Ultimate",
      icon: CompanyIcon,
      price: 59.99,
      allowedOfferIndexList: [0, 1, 2, 3, 4, 5,6],
    },
  ];

  const handleClick = (product_id) => {
    const res = axios.post(process.env.REACT_APP_API_URL + "/api/stripe/create-checkout-session",
    {
      product_id: product_id,
      customer_id: user.customer_id
    }).then(res =>
    {
      const url = res.data.url; 
      window.location = url;
    }
    )
  }
  const getInitFee = (title) => {
    switch(title) {
      case "Starter":
        return 25
        break;
      case "Business":
        return 30
        break;
      case "Ultimate":
        return 30
        break;
      default:
        return 25
    }
  }

  return (
    <section className="section" id="pricing2">
      <div className="container">
        {/* <div className="max-w-400 mb-16 text-center mx-auto">
          <h1 className="mt-0 font-normal text-44">Our Services</h1>
          <p className="mb-16">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
        </div> */}

        <div className={classes.cardWrapper}>
          <Grid container spacing={2} style={{justifyContent:'center'}}>
              
        


            {planList.map((plan, ind) => {
              let { title, subtitle, price, allowedOfferIndexList } = plan;
              return (
              <Grid key={ind} item lg={3} md={3} sm={6} xs={12}>
                <Card className={classes.card} elevation={2}>
                  <div className="flex items-center mb-6">
                    <IconButton className="mr-4 p-3 bg-light-primary rounded hover-bg-primary">
                      <plan.icon color="primary" fontSize="large" />
                    </IconButton>
                    <div>
                      <h3 className="text-primary m-0">{plan.title}</h3>
                      <p className="m-0">
                        ${" "}
                        <span className="text-32 font-medium text-primary">
                          {plan.price}
                        </span>
                        /mo
                      </p>
                      <p style={{'fontWeight':'bold'}}className="m-0">
                        + $
                        <span className="text-20 font-small text-primary">
                          { getInitFee(plan.title)  }
                        </span>
                        {" "}initial fee
                      </p>
                    </div>
                  </div>

                  <Divider className="bg-primary"></Divider>

                  <div className="my-8">

                    {featureList.map((item, ind) => (
                      <div key={ind} className="flex items-center">
                        <Icon className="mr-4" color="primary">
                          {allowedOfferIndexList.includes(ind)? 'done': ''}
                        </Icon>
                        <p className="my-2">{allowedOfferIndexList.includes(ind)? item: '-'}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick= {() => handleClick(plan.title)}
                    className="rounded px-6"
                    variant="contained"
                    color="primary"
                  >
                    Select
                  </Button>
                </Card>
              </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Pricing2;
