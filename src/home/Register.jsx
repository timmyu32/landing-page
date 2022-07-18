import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Footer1 from "./sections/Footer1";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    rgba(255,255,255,0.9),
    rgba(255,255,255,0.9)
  ),  
 
  `;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;  
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    color: black;
    font-size: 18px;
    font-weight: 500;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    cursor: pointer;
`
const AdminLink = styled.a`
    &:visited{
      color: black
    }
    &:link{
      color: black
    }
    &:active {
      color: black;
    }
`;




const Register = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);


    useEffect(() =>{
        noDefault();
        window.scrollTo(0, 0);

    }, []);
    
    const noDefault = () => {
        document.getElementById("form").addEventListener("click", function(event){
            event.preventDefault()
          })
    };

    const fNameRef = useRef(null);
    const lNameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const history = useHistory();



     const handleClick = () => {
        const data = {
                  firstname: fNameRef.current.value,
                  lastname: lNameRef.current.value,
                  phone: phoneRef.current.value,
                  email: emailRef.current.value,
              };
        if( data.firstname && data.lastname && data.phone && data.email ){
            console.log('data recieved')
            dispatch(loginSuccess({
              firstname: fNameRef.current.value,
              lastname: lNameRef.current.value,
              phone: phoneRef.current.value,
              email: emailRef.current.value,
            }))
            console.log(user)
            history.push('/get-started/depop');
        }else{
            alert("Passwords do not match, try again.")
        }
      }



  return (
    <div>
      <Container>
        <Wrapper>
          <Title>Let's Get Started</Title>
          <Title>Create A Seller Account with Shmyy.co</Title>
          <Form id='form'>
            <Input ref={fNameRef} placeholder="First Name"/>
            <Input ref={lNameRef} placeholder="Last Name"/>
            <Input type='email' ref={emailRef} placeholder="email"/>
            <Input type='tel' ref={phoneRef} placeholder="Phone Number"/>
            <Agreement>
              By creating an account, I consent to the processing of my personal data in 
              accordance with the <b>PRIVACY POLICY</b>.
            </Agreement>
          </Form >
          <Button onClick={() =>handleClick()}>SET UP DEPOP INTEGRATION</Button>
        </Wrapper>
        
      </Container>
      <div className='cont2' style={{'height':'fit-content', 'backgroundColor':'#000000'}}>
        <Footer1 />
      </div>
      
    </div>
  )
}

export default Register
