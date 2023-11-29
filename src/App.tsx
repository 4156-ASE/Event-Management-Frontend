import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import CreateEventForm from './components/event/CreateEventForm';
import Events from './components/event/Events';
import Profile from './components/profile/Profile';
import Landing from './components/layout/Landing';
import SingleEvent from './components/event/SingleEvent';
import AuthContextProvider from './components/auth/AuthContextProvider';
import SingleEventDetails from './components/event/SingleEventDetails';

const App = () => {
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
        </Routes>
        <Navbar />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
