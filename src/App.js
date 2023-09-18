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
import AdminCustomers from './AdminCustomers/AdminCustomers';
import AdminUsers from './AdminUsers/AdminUsers';
import AdminInvoices from './AdminInvoices/AdminInvoices';
import AdminSettings from './AdminSettings/AdminSettings';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';

function App() {
  // const navigate = useNavigate();


  const floatingElements = document.querySelectorAll('.bg li');

  function animateElements() {
    floatingElements.forEach((element, index) => {
      // Generate a random X-axis position between 0% and 100%
      const randomX = Math.random() * 100;

      // Generate a random delay for a staggered effect
      const delay = index * 2; // Adjust the delay as needed for staggered animation

      // Apply the random X-axis position and animation properties
      element.style.left = `${randomX}%`;
      element.style.animation = `animate 15s linear ${delay}s infinite`;
    });
  }

  animateElements(); // Call the function to start the animation

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
    if (User && User.role === 'client') {
      if (window.location.pathname === '/profile') return <Profile />
    }
    else {
      return <Error />;
    }
  }

  function SaleNavigation() {
    if (User && User.role === 'sale') {
      if (window.location.pathname === '/customer') return <Customer />
      else if (window.location.pathname === '/add-customer') return <AddCustomer />
      else if (window.location.pathname === '/create-invoice') return <CreateInvoice />
    }
    else {
      return <Error />;
    }
  }

  function AdminNavigation() {
    if (User && User.role === 'admin') {
      if (window.location.pathname === '/admin/customers') return <AdminCustomers />
      else if (window.location.pathname === '/admin/users') return <AdminUsers />
      else if (window.location.pathname === '/admin/invoices') return <AdminInvoices />
      else if (window.location.pathname === '/admin/settings') return <AdminSettings />
    }
    else {
      return <Error />;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={(item) => setUser(item)} User={User} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<NavigateToDashboard />} />
          <Route path="/profile" element={<ClientNavigation />} />
          <Route path="/customer" element={<SaleNavigation />} />
          <Route path="/add-customer" element={<SaleNavigation />} />
          <Route path="/create-invoice" element={<SaleNavigation />} />
          <Route path="/admin/customers" element={<AdminNavigation />} />
          <Route path="/admin/users" element={<AdminNavigation />} />
          <Route path="/admin/invoices" element={<AdminNavigation />} />
          <Route path="/admin/settings" element={<AdminNavigation />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
