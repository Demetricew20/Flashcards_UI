import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavbarPage from './Components/Navbar/NavBar';
import Landing from './Components/LandingPage/Landing';
import Cards from './Components/CardsPage/Cards';
import CardCollections from './Components/CardCollection/CardCollection';
import FlashcardServices from './Services/request'

class  App extends Component {
  constructor(props){
    super(props);
    this.state = {
      collections: null,
      cards: null
    }
  };

  

  async componentDidMount(){
    this.getCards();
    this.getAllCollections();
  };

  getCards(){
    FlashcardServices.getAllFlashcards()
    .then(response => {
      this.setState({
        cards: response.data
      })
    })
  };

  getAllCollections(){
    FlashcardServices.getAllCollections()
    .then(response => {
      this.setState({
        collections: response.data
      })
    })
  };




  render(){
  return (
    
    <div className="App">
      <Router>
      <NavbarPage/>
      <Route exact path='/'>
        <Landing/>
      </Route>
      <Route path='/card-collections'>
        <CardCollections key={this.state} collections={this.state.collections} cards={this.state.cards}/>
      </Route>
      <Route path='/cards'>
        <Cards/>
      </Route>
      </Router>
      
    </div>
  );
    }
}

export default App;
