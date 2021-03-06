import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './Components/Navbar/NavBar';
import Landing from './Components/LandingPage/Landing';
import Cards from './Components/CardsPage/Cards';
import CardCollections from './Components/CardCollection/CardCollection';
import FlashcardServices from './Services/request';

const App = () => {


  return (
    
    <div className="App">
      <Router>
      <NavbarPage/>
      <Route exact path='/'>
        <Landing/>
      </Route>
      <Route path='/card-collections'>
        <CardCollections />
      </Route>
      <Route path='/cards'>
        <Cards/>
      </Route>
      </Router>
      
    </div>
  );
}

export default App;
