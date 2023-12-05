import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import CreateEventForm from './components/event/CreateEventForm';
import Events from './components/event/Events';
import Profile from './components/profile/Profile';
import SignUp from './components/user/SignUp';
import Landing from './components/layout/Landing';
import SingleEvent from './components/event/SingleEvent';
import AuthContextProvider, { AuthContext } from './components/auth/AuthContextProvider';
import Signin from './components/user/SignIn';
import { useContext, useEffect } from 'react';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { LocaleProvider } from '@douyinfe/semi-ui';
import { EventDetailPage } from './components/event/EventDetailPage';
import { APIs } from './utils/api';

function InnerRoutes() {
  const { auth } = useContext(AuthContext);

  return auth ? (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/create" element={<CreateEventForm />} />
      <Route path="/events" element={<Events />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/event/:id" element={<SingleEvent />} />
      <Route path="/event/details/:id" element={<EventDetailPage />} />
      <Route path="*" element={<Navigate to="/events" replace />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

const App = () => {
  async function check() {
    try {
      await APIs.getProfile();
    } catch (error) {
      localStorage.removeItem('userID');
      localStorage.removeItem('token');
    }
  }

  // Write this line

  useEffect(() => {
    check();
  }, []);

  setInterval(check, 3000000);

  return (
    <LocaleProvider locale={en_US}>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />

          <InnerRoutes />
        </BrowserRouter>
      </AuthContextProvider>
    </LocaleProvider>
  );
};

export default App;
