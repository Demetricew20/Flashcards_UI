import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './Components/Navbar/NavBar';
import Account from './Components/AccountPage/Account';
import Landing from './Components/LandingPage/Landing';

class  App extends Component {






  render(){
  return (
    
    <div className="App">
      <Router>
      <NavbarPage/>
      <Route path='/home'>
        <Landing/>
      </Route>
      <Route path='/account'>
        <Account/>
      </Route>
      </Router>
      
    </div>
  );
    }
}

export default App;
