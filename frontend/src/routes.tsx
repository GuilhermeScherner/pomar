import React  from 'react';
import {BrowserRouter, Route} from 'react-router-dom' 
import {Container} from './assets/styles/styles'

import Header from './components/Header';
import NavBar from './components/NavBar';
import Group from './pages/Group';
import Harvest from './pages/Harvest';
import Home from './pages/Home'
import Specie from './pages/Specie';
import Tree from './pages/Tree';


function Routes(){
  return(
    <Container className="routes">
      <BrowserRouter>
        <Header />
        <NavBar />
        <div className="content">
          <Route path="/" exact component={Home} />
          <Route path="/tree" exact component={Tree} />
          <Route path="/specie" exact component={Specie} />
          <Route path="/harvest" exact component={Harvest} />
          <Route path="/group" exact component={Group} />
        </div>
      </BrowserRouter>
    </Container>
  )
}

export default Routes;