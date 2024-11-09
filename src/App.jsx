import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import SearchPageResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/results" element={<SearchPageResults/> }/>
      </Routes>
    </Router>
  );
}

export default App
