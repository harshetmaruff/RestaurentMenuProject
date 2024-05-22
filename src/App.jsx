import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuItem from './Components/MenuItem/MenuItem'
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:menuId" element={<Home />} />
        <Route path="/:menuId/:itemId" element={<MenuItem />}/>
      </Routes>
    </Router>
  );
}

export default App;