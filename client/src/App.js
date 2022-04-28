import React from 'react';
import './App.css';
//Components
import Header from './components/Header';
import AddEmployee from './components/AddEmployee';
import ListEmployee from './components/ListEmployee';
import EditEmployee from './components/EditEmployee';

//React-router
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <Header/>
      <br/>    
      <Routes>
        <Route exact path = '/' element = {<ListEmployee />} />
        <Route path = '/list' element = {<ListEmployee />} />
        <Route path = '/add' element = {<AddEmployee />} />
        <Route path = '/edit/:id' element = {<EditEmployee />} />
      </Routes>
      
  </div>
  );
}

export default App;
