import React from "react";


import { TbDeviceMobile } from "react-icons/tb";

import { BsFillCloudCheckFill } from "react-icons/bs";

import { MdEmail } from "react-icons/md";


import { FaGlobeAmericas } from "react-icons/fa";
import { Button, Icon, Card, CardContent, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';

import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  card: {
    borderTop: "2px solid black",
    "& .icon": {
      fontSize: 64,
    },

    "&:hover": {
      borderTop: "2px solid rgba(var(--primary), 1)",
      "& .icon": {
        color: "rgba(var(--primary),1)",
      },
    },
  },
}));

const Services1 = () => {
  const classes = useStyles();

  const serviceList = [
    {
      icon: <BsFillCloudCheckFill/>,
      title: "Web Hosting",
      text:
        "You handle the selling, let us handle the servers. We'll set you up with a dedicated web server able to seamlessly scale to meet your store's individual needs.",
    },
    {
      icon: "depop",
      title: "Automatic Depop Inventory Tracking",
      text:
        "Items on your storefront will automatically stay in sync with what's for sale on Depop– if it's sold-out/listed there, it's sold/listed here. Simple.",
    },
    {
      icon: <MdEmail/>,
      title: "Automatic Email Marketing",
      text:
        "No need to waste time learning complicated email automation– we've got you covered. We send email alerts for important customer events automatically on your behalf.",
    },
    {
      icon: <TbDeviceMobile/>,
      title: "Modern Desktop & Mobile Site",
      text:
        "Over 65% of Ecommerce is done via mobile. Don't be late to the party. Catch eyes and break necks with a modern desktop site and a sleek, responsive mobile web application.",
    },
    
  ];

  return (
    <section style={{backgroundColor:'#3E50B3'}} className="section" id="service1">
      <div className="container">
        <div className="section__header">
          <h2 style={{textAlign:'center', color:'white', fontSize:'32px'}}>Don't sweat the tech stuff...</h2>
          {/* <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            unde inventore molestias ab adipisci eius nisi placeat at.
          </p> */}
        </div>

        <Grid style={{justifyContent:'center'}} container spacing={3} alignContent="stretch">
          {serviceList.map((service) => (
            <Grid item md={3} sm={6} key={service.title}>
              <Card className={clsx("card h-full", classes.card)}>
                <CardContent className="flex-column justify-between min-h-full">
                  <div className="flex-grow">
                    <div className="text-center mb-4">
                      {service.icon === 'depop' ?<Icon style={{marginTop:'-10px'}} className="icon">
                      <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTAiIGhlaWdodD0iNTAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgaWQ9Im9yaWdpbmFsLWljb24iIGZpbGw9IiMwMDAwMDAiPjxwYXRoIGQ9Ik0xNTEuMzYsMTYuODc2NjRoLTQ0LjcyYy0xLjkwMjMyLDAgLTMuNDQsMS41Mzc2OCAtMy40NCwzLjQ0djM0LjRoLTM5LjU2Yy0yNy41MDI4LDAgLTQ5Ljg4LDIyLjM3NzIgLTQ5Ljg4LDQ5Ljg4YzAsMjcuNTAyOCAyMi4zNzcyLDQ5Ljg4IDQ5Ljg4LDQ5Ljg4aDg3LjcyYzEuOTAyMzIsMCAzLjQ0LC0xLjUzNzY4IDMuNDQsLTMuNDR2LTEzMC43MmMwLC0xLjkwMjMyIC0xLjUzNzY4LC0zLjQ0IC0zLjQ0LC0zLjQ0ek04NC4yOCw4OS4xMTY2NGgxOC45MnYzMC45NmgtMTguOTJjLTguNTM0NjQsMCAtMTUuNDgsLTYuOTQ1MzYgLTE1LjQ4LC0xNS40OGMwLC04LjUzNDY0IDYuOTQ1MzYsLTE1LjQ4IDE1LjQ4LC0xNS40OHoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/>
                      </Icon>: <Icon className="icon">{service.icon}</Icon>}

                    </div>
                    <h3 className="text-24" style={{fontWeight:'bold'}}>{service.title}</h3>
                    <p style={{'fontWeight':'bold'}}>{service.text}</p>
                  </div>
                  {/* <div className="pt-4">
                    <Button>READ MORE</Button>
                  </div> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Services1;
