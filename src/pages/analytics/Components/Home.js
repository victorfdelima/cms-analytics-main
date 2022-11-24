import React, { useEffect } from "react";
import Dashboard from "../Dashboard/dashboard";
import styled from "styled-components";
import Footer from "./footer";
import { useAuthContext } from "../context/AuthContext";
import { useAuthContextAPI } from "../context/AuthContext";
import { useCookies } from 'react-cookie'

export default function Home() {
  const { token, client } = useAuthContext();
  const { onInitClient, onSetToken } = useAuthContextAPI();
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])



  const onGetToken = () => {
    client.requestAccessToken();
 
  }



  useEffect(() => {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      callback: (response) => {
        
        onSetToken(response.access_token, );
    
      },
      
    },
    
    );
    
    onInitClient(client);
  }, [onInitClient, onSetToken]);


  const response = token


    let expires = new Date()
    expires.setTime(expires.getTime() + (response * 1000))
    setCookie('access_token', response, { path: '/',  expires})
    setCookie('refresh_token', response, {path: '/', expires})

    console.log('access_token', response)

  


  //Salva token no local e no session

  localStorage.setItem('access_token', response)






  return (
    <div className="App">
      {token ? (
         <Dashboard />
        
      ) :  (
        <div>
        <Title>Google Analytics Dashboard</Title>
        <ButtonContainer>
          <button
          onClick={onGetToken}>Get access token</button>
        </ButtonContainer>
        <Footer />
        </div>
      )
      }
    </div>
  );
}

const ButtonContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10vmin;
  margin-top: 0;
`;
