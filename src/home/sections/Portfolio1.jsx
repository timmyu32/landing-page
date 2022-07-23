import React from "react";

import { Button, Icon, IconButton, Grid, Divider, Card } from "@mui/material";

const Portfolio1 = () => {

  const portfoioList = [
    {
      imageUrl: "./assets/images/shopping.png",
      name: "Getting started is easy",
      description: `We'll stock your storefront with the products you're already listing for sale.`,
    },
    {
      imageUrl: "./assets/images/Mar-Business_1.jpg",
      name: "Let's talk numbers",
      description: `Utilize the Shmyy Admin Dashboard to list new products, send updates/alerts to customers via emails, view analytics and more!`,
    },
    {
      imageUrl: "./assets/images/Payment.png",
      name: "Payments are hassle free",
      description: `Your storefront comes fully equipped with Stripe payment processing.`,
    },
    
  ];

  return (
    <section className="section" id="portfolio1">
      <div className="container">
        <div className="section__header">
          <h2 style={{textAlign:'center', fontSize:'36px'}}>Take control of your store – <span style={{'textDecoration':'underline', 'fontWeight':'bold'}}>every step of the way.</span></h2>
          {/* <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            unde inventore molestias ab adipisci eius nisi placeat at.
          </p> */}
        </div>
        <Grid container spacing={3}>
          {portfoioList.map((portfolio, index) => (
            <Grid item md={4} sm={4} key={index}>
              <Card className="relative h-full card" key={index}>
                <img
                  className="w-full"
                  src={portfolio.imageUrl}
                  alt="portfolio"
                />
                <div className="flex-column justify-between">
                  <div className="px-4 pt-4">
                    <h5 className="m-0 text-16 font-bold">{portfolio.name}</h5>
                    <p className="mb-4" style={{'fontWeight':'bold'}}>{portfolio.description}</p>
                    <Divider />
                  </div>
                  {/* <div className="px-4 py-2">
                    <IconButton>
                      <Icon>link</Icon>
                    </IconButton>
                    <IconButton>
                      <Icon>share</Icon>
                    </IconButton>
                  </div> */}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* <div className="text-center pt-9">
          <Button variant="contained" size="large" color="secondary">
            load more
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Portfolio1;
