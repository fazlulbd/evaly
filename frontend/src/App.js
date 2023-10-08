import React from 'react'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements,} from "react-router-dom";
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Vendor from './pages/Vendor';
import Dashboard from './userdashboard/Dashboard';
import UploadProduct from './userdashboard/UploadProduct';
import Storename from './userdashboard/Storename';
import AdminDashboard from './admin/AdminDashboard';
import AdminCategory from './admin/AdminCategory';
import ProductPosition from './admin/ProductPosition';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
         <Route index element={<Home />} />
         <Route path='productDetails/:id' element={<ProductDetail />} />
         <Route path='cart' element={<Cart />} />
         <Route path='login' element={<Login/>} />
         <Route path='registration' element={<Registration/>} />
         <Route path='vendor' element={<Vendor/>} />
         <Route path='dashboard' element={<Dashboard/>} />
         <Route path='uploadProduct' element={<UploadProduct/>} />
         <Route path='storename' element={<Storename/>} />
         <Route path='adminDashboard' element={<AdminDashboard/>} />
         <Route path='adminCategory' element={<AdminCategory/>} />
         <Route path='productPosition' element={<ProductPosition/>} />
      </Route>
    )
  )
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;








