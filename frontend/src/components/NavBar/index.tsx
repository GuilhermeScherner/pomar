import React from 'react';
import { Link } from "react-router-dom";
import { Nav, ButtonOptions } from './styles';

const NavBar: React.FC = () => {
  return(
    <Nav>

      <Link to="/tree">
        <ButtonOptions color="#49A768">Árvores</ButtonOptions>
        </Link>

        <Link to="/specie">
           <ButtonOptions color="#DDFFDD">Espécies</ButtonOptions>
        </Link>

        <Link to="/group">
          <ButtonOptions color="#49A768">Grupos</ButtonOptions>
        </Link>

        <Link to="/harvest">
          <ButtonOptions color="#DDFFDD">Colheitas</ButtonOptions>
        </Link>

    </Nav>
    );
}

export default NavBar;