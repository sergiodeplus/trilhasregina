import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Badges from './pages/Badges';
import Objetivos from './pages/Objetivos';
import Admin from './pages/Admin';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/objetivos" element={<Objetivos />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
