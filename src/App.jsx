import React from 'react';
import Home from './pages/Home';
import { MarvelProvider } from './store/MarvelContext';
import './App.sass';

function App() {
  return (

    <div className="appContainer">
      <MarvelProvider>
        <Home />
      </MarvelProvider>

    </div>

  );
}

export default App;
