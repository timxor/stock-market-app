import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext';
import Dashboard from './components/Dashboard';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery';


  

import './App.css';

function App() {
  const location = useLocation(); 

  useEffect(() => {
    // Add event listener for clicking on sidebar items
    $(".sidebar ul li").on('click', function () {
      $(".sidebar ul li.active").removeClass('active');
      $(this).addClass('active');
    });

    // Add event listener for opening sidebar
    $('.open-btn').on('click', function () {
      $('.sidebar').addClass('active');
    });

    // Add event listener for closing sidebar
    $('.close-btn').on('click', function () {
      $('.sidebar').removeClass('active');
    });

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      $(".sidebar ul li").off('click');
      $('.open-btn').off('click');
      $('.close-btn').off('click');
    };
  }, []);

  return  (
    <AuthProvider>
      <div className="main-container d-flex">
        <div className="sidebar" id="side_nav">
          <div className="header-box px-2 pt-3 pb-4 d-flex justify-content-between">
            <h1 className="fs-4"> <img src="./images/treasure_chest-removebg-preview.png" className="logo-tc-img" style={{ width: '15%', height: 'auto' }} /> <span className="text-white">TradeTrove</span></h1>
            <button className="btn d-md-none d-block close-btn px-1 py-0 text-white"><i className="fal fa-stream"></i></button>
          </div>

          <ul className="list-unstyled px-2">
            <li className={location.pathname === '/dashboard' ? 'active' : ''}><Link to="/dashboard" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-home"> </i> Dashboard</Link></li>
            <li className={location.pathname === '/AddStock' ? 'active' : ''}><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-list"></i> Add Stock</a></li>
            <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block d-flex justify-content-between">
              <span><i className="fal fa-comment"></i> Messages</span>
              <span className="bg-dark rounded-pill text-white py-0 px-2">02</span>
            </a></li>
            <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-envelope-open-text"></i> Services</a></li>
            <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-users"></i> Customers</a></li>
          </ul>
          <hr className="h-color mx-2" />

          <ul className="list-unstyled px-2">
            <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-bars"></i> Settings</a></li>
            <li className=""><a href="#" className="text-decoration-none px-3 py-2 d-block"><i className="fal fa-bell"></i> Notifications</a></li>
          </ul>
        </div>

        <div className="content">
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
              <div className="d-flex justify-content-between d-md-none d-block">
                <button className="btn px-1 py-0 open-btn me-2"><i className="fal fa-stream"></i></button>
                <a className="navbar-brand fs-4" href="#"><span className="bg-dark rounded px-2 py-0 text-white">CL</span></a>
              </div>
              <button className="navbar-toggler p-0 border-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <i className="fal fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Profile</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="dashboard-content px-3 pt-4">
            <h2 className="fs-5"> Dashboard</h2>
            <Routes>

            <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
     

    </AuthProvider>
  );
}

export default App;