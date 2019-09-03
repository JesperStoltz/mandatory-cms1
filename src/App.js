import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Home from './Components/Home.js'
import Article from './Components/Article.js'
import Authorlist from './Components/Authorlist.js'
import './App.css';


function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <p className="header_title">Authors & Their Works</p>
        </header>

        <aside>
          <p className="aside_title">Pages</p>
          <div className="aside_pagelist">
            <ul className="pageList_ul">
              <li className="pageList_li">
                <Link className="pageList_li" to="/">Home</Link>
              </li>
              <li className="pageList_li">
                <Link className="pageList_li" to="/authorlist">Authors</Link>
              </li>
            </ul>
          </div>
        </aside>

        <main>
          {/* <Route exact path='/' component={Home} skip={skip} /> */}
          <Route exact path='/' component={() => <Home />} />
          <Route path="/article" component={Article} />
          <Route path="/authorlist" component={Authorlist} />
        </main>
      </div>
    </Router>
  );
}

export default App;
