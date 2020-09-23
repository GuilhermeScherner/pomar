import React from 'react';
import { Link } from 'react-router-dom';

import { Head, Title } from './styles';


const Header: React.FC = () => {
  return(
    <Head>
      <Link to="/"><Title>O Pomar</Title> </Link>
    </Head>
    );
}

export default Header;