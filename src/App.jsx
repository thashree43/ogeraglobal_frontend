import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clientroute from './routes/Clientroute';
import Adminroute from './routes/Adminroute';
import { Provider } from 'react-redux';
import { Store } from './Store';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <Provider store={Store}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/*' element={<Clientroute />} />
          <Route path='/admin/*' element={<Adminroute />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
