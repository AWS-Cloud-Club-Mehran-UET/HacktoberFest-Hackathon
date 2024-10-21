import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import muetLogo from '../src/assets/muet.png'; 
import hrImage from '../src/assets/hr.png'; 

const HomeContainer = styled.div`
  display: flex;
  position: static;
  top:0;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background: transparent;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  

  @media (max-width: 1200px) {
    flex-direction: column;
    text-align: center; /* Centering content on smaller screens */
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1200px) {
    align-items: center;
    margin-bottom: 20px; /* Add space between text and image on small screens */
  }
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    width: 60px;
  }
`;

const UniName = styled.h2`
  font-size: 2.5rem;
  margin: 0;
  color: #313260;
  font-weight: 500;

  @media (max-width: 1200px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const RightContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    margin-top: 20px; 
  }
`;

const HRimg = styled.img`
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  

  @media (max-width: 1200px) {
    max-width: 90%;
  }
`;

const Cta = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 500px;
  margin-left: 120px;
  justify-content: center;

  @media (max-width: 1200px) {
    flex-direction: column; /* Stack buttons vertically on small screens */
    align-items: center;
    gap: 10px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #EBFDFF;
  border-color: #EBFDFF;
  color: #5D4E6D;
  padding: 12px 20px;
  font-size: 1.2rem;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(62, 142, 222, 0.2); /* Button shadow */
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #2c6ab1;
    border-color: #2c6ab1;
    box-shadow: 0 6px 16px rgba(44, 106, 177, 0.3); /* Add shadow on hover */
  }

  @media (max-width: 1200px) {
    font-size: 1rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Banner>
        <LeftContent>
          <Logo src={muetLogo} alt="University Logo" />
          <UniName>MY MUET - HR Management</UniName>
        </LeftContent>
        <RightContent>
          <HRimg src={hrImage} alt="HR" />
        </RightContent>
      </Banner>
      <Cta>
        <Link to="/login">
          <StyledButton type="primary" size="large">
            Login
          </StyledButton>
        </Link>
        <Link to="/dashboard">
          <StyledButton type="primary" size="large" icon={<ArrowRightOutlined />}>
            Go to Dashboard
          </StyledButton>
        </Link>
      </Cta>
    </HomeContainer>
  );
}

export default Home;
