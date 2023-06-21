import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import SaleDashboard from './SaleDashboard/SaleDashboard';
import Customer from './Customer/Customer';
import AddCustomer from './AddCustomer/AddCustomer';

function App() {
  const [User, setUser] = React.useState({});

  React.useEffect(() => {
    if (User) {
      console.log(User);
    }
  }, [User]);

  function NavigateToDashboard() {
    if (User.role === 'client') {
      return <Dashboard User={User} />;
    } else if (User.role === 'sale') {
      return <SaleDashboard User={User} />;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={(item) => setUser(item)} User={User} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={NavigateToDashboard()} />
          <Route path="/profile" element={<Profile User={User} />} />
          <Route path="/customer" element={<Customer User={User} />} />
          <Route path="/add-customer" element={<AddCustomer User={User} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
