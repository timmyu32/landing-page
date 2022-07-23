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
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(222,222,222,0.5);
 
  `;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;  
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #3f51b5;
    
`
const TitleContainer = styled.span`
    background-color: rgba(137, 155, 244, 0.3);
    border-radius: 14px;
    width: fit-content;
    padding-left: 4px;
    padding-right: 4px;
`;

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


const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    cursor: pointer;
    color: white;
    background-color: #798BE5;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    margin-top: 15px;
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 100px;
    height: auto;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #798be5;
  padding: 12px;
  color: white;
  border-radius: 8px;
  text-shadow: 0.5px 0.5px #d6d6d6;
`;

const ListHeader = styled.h2`

`;

const ListSubHeader = styled.h4``;

const List = styled.ul`
  list-style-type:none;
`;

const ListItem = styled.li`
  font-size: 20px;

`;

const DepopInfoForm = (props) => {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc ] = useState(null);
  const [shopName, setShopName ] = useState(null);
  const [continueBtn, setContinueBtn] = useState(true)
  const [imgFetched, setImageFetched ] = useState(false);
  const [severOK, setServerOK] = useState(false);
  const [stripeUrl, setStripeUrl] = useState(null)
  const [dataFetched, setDataFetched] =useState(false);
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
            setShopName(depopShop.current.value.toLowerCase())
            if(res.data.src == 'DEPOP SHOP NOT FOUND!'){
              setContinueBtn(false)
            }else{
              setContinueBtn(true)
            }
          })      
            
      }

    const handleClick2 = () => {
      setDataFetched(true);
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
          {!dataFetched &&
          <>
          <Title>Hey there {user.firstname}!</Title>
          
          <Title>What's the name of your<TitleContainer>Depop Shop</TitleContainer>?</Title>
          <Form id='form' onSubmit={(e) => {

            e.preventDefault(); 
            try {
              document.getElementById("continue").click();              
            } catch (error) {}
            }}>
            <Input ref={depopShop} placeholder="Ex. GeminiVintage"/>

          </Form >
          </>
          }
          {!severOK? 
          <>
          {imgFetched && !dataFetched &&
          <>
            <div className="contnr" style={{'marginTop':'10px','marginBottom':'18px', 'display':'flex', 'alignItems':'center', 'justifyContent':'center'}}>
              <TitleContainer style={{'marginRight':'10px'}}>
                <h4 style={{'marginLeft':'4px', 'marginRight':'4px', 'marginTop':'2px'}}>Is this your shop?</h4>
              </TitleContainer>
              <a target="_blank" rel="noopener noreferrer" href={'https://www.depop.com/'+shopName}>
              {continueBtn && <Avatar src={imageSrc} alt={imageSrc}/>}
              </a>
            </div>
            {!continueBtn &&
            <div className="contnr" style={{'marginTop':'10px','marginBottom':'18px', 'display':'flex', 'alignItems':'center', 'justifyContent':'center'}}>
              <TitleContainer style={{'marginRight':'10px'}}>
                <h4 style={{'marginLeft':'4px', 'marginRight':'4px', 'marginTop':'2px'}}>DEPOP SHOP NOT FOUND</h4>
              </TitleContainer>
            </div>
            }
            </>
            }
          {

          imgFetched?
          <>
          {dataFetched?
          <div className="btnCont" style={{'textAlign':'center'}}>
            <TitleContainer>
              <h4>Loading...</h4>
            </TitleContainer>
          </div>
          :
          <div className="btnCont" style={{'textAlign':'center'}}>
            {continueBtn && <Button style={{'marginRight':'3px'}} onClick={() =>handleClick2()}>YES, CONTINUE</Button>  }
  
            <Button style={{'marginLeftt':'3px'}} onClick={() => setImageFetched(false)}>NO, TRY AGAIN</Button>    
          </div>
          }

          </> 
          :
          <div className="btnCont" style={{'textAlign':'center'}}>
            <Button id='continue' onClick={() =>handleClick()}>CONTINUE</Button>
          </div> 
          }
          </>
          :
          <>
          <div className="btnCont" style={{'textAlign':'center'}}>
            <ListContainer>
              
              <ListHeader>Shmyy partners with <TitleContainer>Stripe</TitleContainer> to make Payment Proccessing a <TitleContainer>breeze!</TitleContainer></ListHeader>
              <ListSubHeader>In order to complete <TitleContainer>Stripe Onboarding</TitleContainer>, you may be asked to provide the following documents to confirm your identity:</ListSubHeader>
              <List>
                <ListItem>Social Security Number</ListItem>
                <ListItem>Photo ID</ListItem>
                <ListItem>Checking Account OR Debit Card</ListItem>
              </List>
              <ListSubHeader>If your are not able to provide these documents, Stripe will not allow your Shmyy Store to recieve payments.</ListSubHeader>
              <ListSubHeader>Please read and follow all steps carefully.</ListSubHeader>
            </ListContainer>
            <Button onClick={() =>window.location = stripeUrl }>CONTINUE to Stripe</Button>            
          </div> 
          
          </>}
                 
          
        </Wrapper>
      
      </Container>
        <Footer1 />
    </div>
  )
}

export default DepopInfoForm
