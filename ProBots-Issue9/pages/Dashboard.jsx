import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* Adjust for navbar height */
  background-color: transparent; /* Transparent background */
  gap: 40px; /* Space between the boxes */
  padding: 20px;
`;

const Box = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  background-color: #555091; /* Background color for the boxes */
  color: white;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    background-color: #414079; /* Slightly darker shade on hover */
    transform: translateY(-5px); /* Lift effect on hover */
  }
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Box to="/hr">HR Admin</Box>
      <Box to="/employee">Employees</Box>
    </DashboardContainer>
  );
};

export default Dashboard;
