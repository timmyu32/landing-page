import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess, addShop , addCustomerId} from '../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import Pricing2 from "./sections/Pricing2";
import Footer1 from "./sections/Footer1";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const Container = styled.div`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #d6d6d6;
 
  `;

const Heading = styled.div`
    padding-top: 1%;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-bottom: -70px;

`;
const Header = styled.h1``;
const SubHeader = styled.h4``;

const PricingCont = styled.div`
    align-items: center;
`;
const TitleContainer = styled.span`
    background-color: rgba(137, 155, 244, 0.3);
    border-radius: 14px;
    width: fit-content;
    padding-left: 4px;
    padding-right: 4px;
`;

const ChoosePlan = () => {
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();



  useEffect(() => {
    if(user.customer_id == undefined ){
      createCustomer();
    }
  }, [])

  const createCustomer = () => {
    const res = axios.post(process.env.REACT_APP_API_URL + "/api/sripe-onboard/create-customer",{
        email: user.email
      }).then(
        (res) => {
          dispatch(addCustomerId(res.data['c_id']));
        }
      )
  }

  return (
    <div>
        <Container>
            <Heading>
            <Header>
                <TitleContainer> Congrats {user.firstname}!</TitleContainer> Your Shmyy Store is ready to accept payments.
            </Header>
            <SubHeader>
                Now it's time to select a plan.
            </SubHeader>
            </Heading>
            <PricingCont>
                <Pricing2 />
            </PricingCont>
            <Footer1 />

        </Container>
      
    </div>
  )
}

export default ChoosePlan
