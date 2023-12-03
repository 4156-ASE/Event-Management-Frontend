import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import CreateEventForm from './components/event/CreateEventForm';
import Events from './components/event/Events';
import Profile from './components/profile/Profile';
import CreateProfileForm from './components/profile/CreateProfileForm';
import Landing from './components/layout/Landing';
import SingleEvent from './components/event/SingleEvent';
import AuthContextProvider, { AuthContext } from './components/auth/AuthContextProvider';
import SingleEventDetails from './components/event/SingleEventDetails';
import Signin from './components/user/SignIn';
import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  async function check() {
    try {
      const resp = await axios.get('/users/me/' + localStorage.getItem('userID'), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
      if (resp.data.user.id == localStorage.getItem('userID')) {
        console.log(resp.data)
      }else {
        localStorage.removeItem('userID')
        localStorage.removeItem('token')
      }
    } catch (error) {
      localStorage.removeItem('userID')
      localStorage.removeItem('token')
    }
  }
  
  // Write this line
  
  useEffect(() => {
    check()
   }, []);
  
  
  setInterval(check, 3000000);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<CreateEventForm />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/event/details/:id" element={<SingleEventDetails />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<CreateProfileForm />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
