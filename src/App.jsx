/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import CharacterProfile from './pages/CharacterProfile';
import Home from './pages/Home/Home';
import { MarvelProvider } from './store/MarvelContext';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="appContainer">
        <MarvelProvider>
          <Routes>

            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<CharacterProfile />} />
            <Route path="*" element={<Home />} />

          </Routes>
        </MarvelProvider>
      </div>
    </Router>
  );
}

export default App;
