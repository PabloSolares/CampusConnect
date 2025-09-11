import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../UI/Users/Login';
import Register from '../UI/Users/Register';
import Recuperar from '../UI/Users/Recuperar';

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/recover' element={<Recuperar />}></Route>

        </Routes>
    </BrowserRouter>
  );
}

export default Router