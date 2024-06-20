import React from 'react';
import styled from 'styled-components';
import LogoImage from "../utils/Imgaes/Logo.png";
import AuthImage from "../utils/Imgaes/AuthImage.jpg";
import { useState } from 'react';
import SignUp from "../Component/SignUp";
import SignIn from "../Component/SignIn";


const Conatiner = styled.div`
display:flex;
height:100%;
background:${({theme})=> theme.bg};
@media (max-width:700px){
flex-direction:column;
}`;

const Left=styled.div`

flex:1;
background:blue;
position:relative;
@media (max-width:700px){
display:none;
}
`;
const Right=styled.div`
flex:1;
display:flex;
flex-direction:column;
position:relative;
padding:40px;
gap:16px;
justify-content:center;
align-items:center;
`;
const Logo=styled.img`
position:absolute;
width:70px;
top:40px;
left:60px;
z-index:10;
`;
const Image=styled.img`
position:absolute;
height:100%;
width:100%;
`;
const Text=styled.div`
font-size:16px;
text-align:center;
margin-top:10px;
color:${({theme})=> theme.text_secondary}
@media (max-width){
font-size:14px;
}
`;
const TextButton=styled.span`
color:${({theme})=>theme.primary};
cursor:pointer;
transition:all 0.3s ease;
font-weight:600;
`;



const Authentication = () => {

    const[login, setLogin]=useState(true);
  return (
    <Conatiner>
<Left>
    <Logo src={LogoImage}/>
    <Image src={AuthImage}/>

    
</Left>
<Right>
    {login?
    <>
    <SignIn/>
    <Text>Dont have an Account? <TextButton onClick={()=>setLogin(false)}>SignUP</TextButton></Text>
    </>:<>
    <SignUp/>
    <Text>Already have an Account? <TextButton  onClick={()=>setLogin(true)} >SignIN</TextButton></Text>
    </>}
</Right>
    </Conatiner>
  )
}

export default Authentication