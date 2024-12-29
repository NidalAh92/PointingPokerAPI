import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SprintCompoenent } from './components/SprintCompoenent'
import { JoinSprintComponent } from './components/JoinSprintComponent'
import { HomeComponent } from './components/HomeComponent'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SprintCompoenent />} />
        <Route path='/sprint/:sessionId/:sprintName' element={<JoinSprintComponent />} >
          <Route path="" element={<HomeComponent sessionId='' playerName=''  sprintName=''/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
