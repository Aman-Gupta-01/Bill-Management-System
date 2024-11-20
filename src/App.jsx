import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerTable from "./components/CustomerTable";
import SideNav from "./components/sideNav";
import BillGenerator from "./components/BillGenerator";
import LoginPage from './components/LoginPage'
import Protected from "./components/Protected";
import TheBill from "./components/TheBill";
import Home from "./components/Home"; 

const App = () => {
  
  return (
  <>
    <BrowserRouter>
      <SideNav />
      <Routes>
        <Route path="/" element={<Protected Component={Home} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/CustomerTable" element={<Protected Component={CustomerTable} />} />
        <Route path="/BillGenerator" element={<Protected Component={BillGenerator} />} />
        <Route path="/download-bill" element={<TheBill />} />
      </Routes>
    </BrowserRouter>
  </>
  );
};

export default App;