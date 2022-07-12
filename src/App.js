import React from 'react';
import { API_KEY, API_URL } from './config';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Shop } from './Components/Shop';

const App = () => {

  return (
    <React.Fragment>
      <Header />
      <Shop />
      <Footer />
    </React.Fragment>
  )
};

export default App;
