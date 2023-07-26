import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AdminPage from "./container/AdminPage/AdminPage";
import AdminAddDish from "./container/AdminAddDish/AdminAddDish";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/admin' element={(<AdminPage />)} />
        <Route path='/admin/addDish' element={(<AdminAddDish />)} />
      </Routes>
    </>
  );
}

export default App;
