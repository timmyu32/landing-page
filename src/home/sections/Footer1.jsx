import React, { useState } from "react";

import { Grid, Button, Icon } from "@mui/material";
import { makeStyles } from '@mui/styles';

import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  footerSection: {
    "& h4:after": {
      content: '" "',
      position: "absolute",
      bottom: -8,
      left: 0,
      height: 2,
      width: 64,
      background: palette.secondary.main,
    },
  },
}));

const Footer1 = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  return (
    <div className={clsx("bg-light-dark")} id="footer1">
      <div className="container">
        <Grid container>
          <Grid item lg={6} md={6} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">About Us</h4>
              <p className="text-inherit">
              Take control of your Depop selling experience with Shmyy
              </p>
              <p className="text-inherit">
                Copyright © 2022 Shmyy.co, All rights reserved.
              </p>
              <Button variant="contained" style={{backgroundColor:'#798be5', cursor:'pointer'}}>
                Contact Us
              </Button>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">Contact</h4>
              <div className="px-4 my-8 flex items-center mx--4">
                <Icon style={{color:'#798be5'}}>mail</Icon>
                <div className="pl-4">
                  <h5 className="m-0 p-0 text-16">Email</h5>
                  <p className="m-0 p-0 text-inherit">contact@shmyy.co</p>
                </div>
              </div>

            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">Referral Program</h4>
              <p className="text-inherit">
                Happy with Shmyy? Want to get paid to spread the news? Ask about our Referral Program to see if you qualify.
              </p>
              <hr />
              <a href='https://www.freepik.com/vectors/market-research'>Market research vector created by jcomp - www.freepik.com</a>
              <a href="https://storyset.com/business">Business illustrations by Storyset</a>
              <a href="https://storyset.com/online">Online illustrations by Storyset</a>
              <a href='https://www.freepik.com/vectors/checkout'>Checkout vector created by storyset - www.freepik.com</a>
              <a href='https://www.freepik.com/vectors/teamwork-illustration'>Teamwork illustration vector created by pch.vector - www.freepik.com</a>
              {/* <div className="mt-8">
                <a href="#linkedin" className="px-2">
                  <img
                    className="h-24 w-24"
                    src="./assets/images/social-linkedin.png"
                    alt=""
                  />
                </a>
                <a href="#twitter" className="px-2">
                  <img
                    className="h-24 w-24"
                    src="./assets/images/social-twitter.png"
                    alt=""
                  />
                </a>
                <a href="#facebook" className="px-2">
                  <img
                    className="h-24 w-24"
                    src="./assets/images/social-facebook.png"
                    alt=""
                  />
                </a>
              </div> */}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer1;
