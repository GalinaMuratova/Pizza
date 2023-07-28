import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AdminPage from "./container/AdminPage/AdminPage";
import AdminAddDish from "./container/AdminAddDish/AdminAddDish";
import AdminOrdersPage from "./container/AdminOrdersPage/AdminOrdersPage";
import AdminEditDish from "./container/AdminEditDish/AdminEditDish";
import UserDishesPage from "./container/UserDishesPage/UserDishesPage";

const App = () => {
  return (
    <>
      <Routes>
          <Route path='/' element={(<UserDishesPage />)} />
        <Route path='/admin' element={(<AdminPage />)} />
        <Route path='/admin/dishes' element={(<AdminPage />)} />
        <Route path='/admin/addDish' element={(<AdminAddDish />)} />
        <Route path='admin/orders' element={(<AdminOrdersPage/>)} />
        <Route path='/admin/edit/:id' element={(<AdminEditDish/>)} />
          <Route path="*" element={(<h1>Not Found!</h1>)} />
      </Routes>
    </>
  );
}

export default App;
