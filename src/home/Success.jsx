import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Footer1 from "./sections/Footer1";
import { BsPersonSquare } from "react-icons/bs";
import emailjs from '@emailjs/browser';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Container = styled.div`
    display: flex;
    width: 100%;
    color: black;
`;

const Left = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    background-color: #99a7ef;
    padding: 20px;
    border-right: 2px solid darkgray;

`;

const Right = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    padding: 20px;
    
    background-color: #ededed;
    border-left: 2px solid darkgray;



`;

const CongratsContainer = styled.div`
    background-color: rgba(225, 225, 225, 0.3);
    border-radius: 14px;
    width: fit-content;

`;
const Congrats = styled.h1`
    font-weight: bold;
    font-size: 72px;
    color: white;
    padding-left: 10px;
    padding-right: 10px;


`;

const Subtitile = styled.p`
    font-size: 20px;
    color: black;
    font-weight: 500;
`;

const DeatailsHeader = styled.h3`
    font-size: 40px;
    padding-left: 8px;
`;

const DetailsContainer = styled.div`
    margin: 5px;
    width: 100%;
    display: flex;
`;

const DetailsContainerLeft = styled.div`
    flex: 1;
`;

const DetailsContainerRight = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const DetailsItem = styled.p`
    margin: 5px;
    font-size: 20px;
    font-weight: 400;
`;

const Form = styled.form`

`

const Input = styled.input`

`

const BuildingContainer = styled.div`
    background-color: rgba(38, 217, 0, 0.44);
    border-radius: 14px;
    width: fit-content;

`;

const InvisibleContainer = styled.div``;

const Button = styled.button``;


const Success = () => {
  const user = useSelector(state => state.user.currentUser);
  const fNameRef = useRef(null);
  const emailRef = useRef(null);
  useEffect(() =>{
    document.getElementById("btn").click();
    window.scrollTo(0, 0);

    }, []);

  const handleClick = (e) => {
    document.getElementById("form").addEventListener("click", function(event){
      event.preventDefault()
    })
    emailjs.sendForm('service_96ebtug','template_atumeno', document.getElementById("form"), 'DKzOTniNVR0dDul-H').then((result) => {
        console.log('email sent')
    },
      (error) => {
      console.log("An error occurred, Please try again"+ error.text);
      });

  }


  return (
    <>
    <Container>
        <Left>
            <CongratsContainer>
                <Congrats>Congrats, {user.firstname}!!</Congrats>
            </CongratsContainer>
            <Subtitile style={{'marginBottom':'-15px', 'fontSize':'24px0', 'fontWeight':'600'}}>You're almost done with Shmyy Onboarding.</Subtitile>
            <Subtitile>We have recieved your subscription-- please allow 1-3 business days for your
                        Shmyy Store to be configured and tested. At that time, we will reach out via email regarding how
                        to use and access your Shmyy Store.
            </Subtitile>
            <Subtitile>See you soon!</Subtitile>
            <Subtitile style={{'marginTop':'-15px', 'color':'white'}}>-Shmyy Team</Subtitile>

        </Left>


        <Right>
            <DeatailsHeader>Account Details</DeatailsHeader>
            <DetailsContainer>
                <DetailsContainerLeft>
                    <BsPersonSquare color='#3e50b3' size={160}/>
                </DetailsContainerLeft>
                <DetailsContainerRight>
                    <DetailsItem>{user.firstname} {user.lastname}</DetailsItem>
                    <DetailsItem>{user.email}</DetailsItem>
                    <DetailsItem>{user.shop}</DetailsItem>
                    <BuildingContainer>
                        <DetailsItem style={{'paddingLeft':'5px', 'paddingRight':'5px'}}>Shmyy Store: Building</DetailsItem>
                    </BuildingContainer>
                </DetailsContainerRight>
            </DetailsContainer>
        </Right>
        <InvisibleContainer style={{'display':'none'}}>
            <Form id='form' onSubmit={(e) => handleClick(e)}>
                <Input required ref={fNameRef} name='name' value={user.shop}/>
                <Input required type='email' ref={emailRef} name='email' value={user.email}/>
            </Form > 
            <Button id='btn' style={{border:'5px solid darkblue'}}onClick={() =>handleClick()}></Button>
        </InvisibleContainer>

    </Container>
    <Footer1/>
    </>
  )
}

export default Success
