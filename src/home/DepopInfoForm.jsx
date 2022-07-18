import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess, addShop } from '../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import Footer1 from "./sections/Footer1";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const Container = styled.div`
  width: 100%;
  height: 100vh;
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
const Avatar = styled.img`
    border-radius: 50%;
`;



const DepopInfoForm = (props) => {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc ] = useState(null);
  const [shopName, setShopName ] = useState(null);

  const [imgFetched, setImageFetched ] = useState(false);
  const [severOK, setServerOK] = useState(false);
  const [stripeUrl, setStripeUrl] = useState(null)
  const user = useSelector(state => state.user.currentUser);
  const depopShop = useRef(null);
  const history = useHistory();

    useEffect(() =>{
        noDefault();
        window.scrollTo(0, 0);

    }, []);
    
    const noDefault = () => {
        document.getElementById("form").addEventListener("click", function(event){
            event.preventDefault()
          })
    };




     const handleClick = () => {
          const res = axios.get(process.env.REACT_APP_API_URL + "/api/depop-info/get/" +depopShop.current.value).then(res => {
            setImageSrc(res.data.src)
            console.log(res.data.src)
            setImageFetched(true)
            setShopName(depopShop.current.value)
          })      
            
      }

    const handleClick2 = () => {
      dispatch(addShop(shopName))
      const res = axios.post(process.env.REACT_APP_API_URL + "/api/sripe-onboard/",{
        user,
        shop: shopName
      }).then(
        (res) => {
          console.log(res.data)
          setStripeUrl(res.data.url)
          setServerOK(true);
        }
      )

    }

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>Hey there {user.firstname}!</Title>
          <Title>What's the name of your Depop Shop?</Title>
          <Form id='form'>
            <Input ref={depopShop} placeholder="Ex. GeminiVintage"/>

          </Form >
          {!severOK? 
          <>
          {imgFetched &&
            <div className="contnr" style={{'marginTop':'10px','marginBottom':'18px', 'display':'flex', 'alignItems':'center', 'justifyContent':'center'}}>
              <a href={'https://www.depop.com/'+shopName}>
                <Avatar src={imageSrc}/>
              </a>
            </div>
            
            }
          {
          imgFetched? 
          <Button onClick={() =>handleClick2()}>SET UP STRIPE INTEGRATION</Button>    
          :
          <Button onClick={() =>handleClick()}>CONTINUE</Button>
          }
          </>
          :
          <>
          <Button onClick={() =>window.location = stripeUrl }>CONTINUE to Stripe</Button>
          
          </>}
                 
          
        </Wrapper>
      
      </Container>
        <Footer1 />
    </div>
  )
}

export default DepopInfoForm
