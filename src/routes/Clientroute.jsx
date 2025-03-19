import { Routes, Route } from 'react-router-dom';
import Homepage from '../client/pages/Homepage';
import ForgetPassword from '../client/pages/Forgetpassword';
import ProductPage from '../client/pages/ProductPage';
import ProductDetail from '../client/pages/ProductDetail';
import AboutUs from '../client/pages/AboutUs';
import Support from '../client/pages/Support';


const Clientroute = () => {
  return (
    <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/Shop' element={<ProductPage/>}/>
    <Route path='/productdetail/:id' element={<ProductDetail/>}/>
    <Route path='/Aboutus' element={<AboutUs/>}/>
    <Route path='/Support' element={<Support/>}/>
    <Route path='/forget' element={<ForgetPassword/>}/>
    <Route path='*' element={<h1>Client 404 Not Found</h1>} />
  </Routes>
    )
}

export default Clientroute