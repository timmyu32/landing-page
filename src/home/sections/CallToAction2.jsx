import { useRef, useState } from "react";
import { TextField, Button, Icon } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import emailjs from '@emailjs/browser';
import styled from 'styled-components';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  button: {
    position: "absolute",
    right: 3,
    zIndex: 2,
  },
}));

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(./assets/images/cta2img.jpg) center no-repeat;
  background: linear-gradient(
    rgba(255,255,255,0.9),
    rgba(255,255,255,0.9)
  ),  

 
  `;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px; 
`;

const FormContainer = styled.div`
    flex: 10;
`;

const ImageContainer = styled.div`
    flex: 1;

`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    border-radius: 5px;
    outline: none;
    padding: 10px;
    color: black;
    font-size: 18px;
    font-weight: bold;
    background-color: #D6D6D6;
`


const CallToAction2 = () => {
  const classes = useStyles();
  const fNameRef = useRef(null);
  const emailRef = useRef(null);
  const [message, setMessage] = useState("Request your Free Demo!");
  const [subMessage, setSubMessage] = useState("What's shown in the Demo?");
  const [showList, setShowList] = useState(true);


  const handleClick = (e) => {
    document.getElementById("form").addEventListener("click", function(event){
      event.preventDefault()
    })
    emailjs.sendForm('service_96ebtug','template_0eu0ggr', document.getElementById("form"), 'DKzOTniNVR0dDul-H').then((result) => {
      console.log("");
      setMessage("Message Recieved!")
      setSubMessage("Be on the lookout from an email from our team abour your Free Demo.")
      setShowList(false);
      },
      (error) => {
      console.log("An error occurred, Please try again"+ error.text);
      });

  }
  

  return (
    <section style={{backgroundColor:'#798be5'}} className="section section-cta2" id="cta2">
      <Container>
        <Wrapper>
            <h1 style={{fontSize:'40px', color:'black', textShadow: "0 4px 4px rgba(0, 0, 0, 0.3)"}} className="mb-">{message}</h1>
            <h4 style={{color:'black', textShadow: "0 4px 4px rgba(0, 0, 0, 0.3)"}}>{subMessage}</h4>
            
            {showList &&
            <ul>
              <li style={{fontWeight:'bold',color:'black', fontSize: '16px', textShadow: "0 4px 4px rgba(0, 0, 0, 0.3)"}}>Shmyy Storefront Template</li>
              <li style={{fontWeight:'bold',color:'black', fontSize: '16px', textShadow: "0 4px 4px rgba(0, 0, 0, 0.3)"}}>Shmyy Admin Site</li>
              <li style={{fontWeight:'bold',color:'black', fontSize: '16px', textShadow: "0 4px 4px rgba(0, 0, 0, 0.3)"}}>Payment Processing</li>
              <li style={{fontWeight:'bold',color:'black', fontSize: '16px', textShadow: "0 4px 4px rgba(0, 0, 0, 0.3)"}}>Inventory Management</li>
            </ul>
            }
            <Form id='form' onSubmit={(e) => handleClick(e)}>
              <Input required ref={fNameRef} name='name' placeholder="What can we call you?"/>
              <Input required type='email' ref={emailRef} name='email' placeholder="Email"/>
            </Form >          
            <Button style={{border:'5px solid darkblue'}}onClick={() =>handleClick()}
                className={clsx(
                  "bg-primary rounded text-13 text-white px-7 py-11px mt-2",
                  classes.button
                )}
              >
                <span className="ml-2">Free Demo</span>
              </Button>
        </Wrapper>       
      </Container>
      
      {/* <div className="container">
        <div className="max-w-770 mx-auto">
          <h2 className="mb-8">Request your Free Demo</h2>
          <h4>What's shown in the Demo?</h4>
          <ul>
            <li>Shmyy Storefront Template</li>
            <li>Shmyy Admin Site</li>
            <li>Payment Processing</li>
            <li>Inventory Management</li>
          </ul>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Your Email:"
            fullWidth
            InputProps={{
              style: {
                borderRadius: 300,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: "0.75rem",
                background: "rgba(255,255,255,0.87)",
              },
              endAdornment: (
                <Button
                  className={clsx(
                    "bg-primary rounded text-13 text-white px-7 py-11px",
                    classes.button
                  )}
                >
                  <span className="ml-2">SUBSCRIBE</span>
                </Button>
              ),
            }}
          />
        </div>
      </div> */}
    </section>
  );
};

export default CallToAction2;
