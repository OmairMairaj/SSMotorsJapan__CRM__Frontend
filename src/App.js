import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Error from './Error/Error';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import SaleDashboard from './SaleDashboard/SaleDashboard';
import Customer from './Customer/Customer';
import AddCustomer from './AddCustomer/AddCustomer';
import CreateInvoice from './CreateInvoice/CreateInvoice';
import Verify from './Verify/Verify';
import AdminDashboard from './AdminDashboard/AdminDashboard';

function App() {
  // const navigate = useNavigate();
  const [User, setUser] = React.useState({
    userId: '',
    fullname: '',
    email: '',
    role: '',
    userStatus: '',
    datecreated: ''
  });

  React.useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')));
    if (sessionStorage.getItem('user') !== null) {
      console.log(User);
      console.log(JSON.parse(sessionStorage.getItem('user')));
    }
    else {
      console.log("No User");
      // navigate('/');
    }
  }, [sessionStorage.getItem('user')]);

  function NavigateToDashboard() {
    if (!User) return <div>NO USER</div>
    else {
      if (User.role === 'admin') {
        return <AdminDashboard />;
      } else if (User.role === 'sale') {
        return <SaleDashboard />;
      } else if (User.role === 'client') {
        return <Dashboard />;
      }
    }
  }

  function ClientNavigation() {
    if (User.role === 'client') {
      if (window.location.pathname === '/profile') return <Profile />
    }
    else{
      return <Error />;
    }
  }

  function SaleNavigation() {
    if (User.role === 'sale') {
      if (window.location.pathname === '/customer') return <Customer />
      else if (window.location.pathname === '/add-customer') return <AddCustomer />
      else if (window.location.pathname === '/create-invoice') return <CreateInvoice />
    }
    else{
      return <Error />;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={(item) => setUser(item)} User={User} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<NavigateToDashboard />} />
          <Route path="/profile" element={<ClientNavigation />} />
          <Route path="/customer" element={<SaleNavigation />} />
          <Route path="/add-customer" element={<SaleNavigation />} />
          <Route path="/create-invoice" element={<SaleNavigation />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
