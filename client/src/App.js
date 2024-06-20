import {ThemeProvider} from "styled-components";
import styled from 'styled-components';
import { lightTheme } from './utils/Theme';
import Authentication from './pages/Authentication';
import { useState } from 'react';
import { useSelector } from "react-redux";
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';

const Container=styled.div`
background:${({theme})=> theme.bg};
color:${({theme})=> theme.text_primary};
height:100vh;
overfow-x:hidden;
overflow-y:hidden;
transition: all 0.2s ease;
`;

function App() {

  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
    <ThemeProvider theme ={lightTheme}>
      {currentUser? 
      <Container>
        <Navbar  currentUser={currentUser}/>
        <Routes>
        <Route path="/" exact element={<Dashboard/>}/>
        <Route path="/workouts"  element={<Workout/>}/>
        </Routes>
      </Container>:
      <Container>
        <Authentication/>
      </Container> 
}
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
