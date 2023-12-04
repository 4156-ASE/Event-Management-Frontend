import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContextProvider';
import { Nav, Dropdown, Button } from '@douyinfe/semi-ui';

import { IconIntro, IconCalendar, IconAvatar } from '@douyinfe/semi-icons-lab';
import { IconCalendarStroked, IconUserStroked, IconHome } from '@douyinfe/semi-icons';
import { APIs } from '../../utils/api';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      const resp = await APIs.signout();
      if (resp.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        setAuth(localStorage.getItem('token'));
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Log Out not Succeeded');
    }
  };

  const footer = auth ? (
    <div className="space-x-6">
      <Link to="/create">
        <Button
          theme="solid"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Reserve a seat!
        </Button>
      </Link>
      <Dropdown
        position="bottomRight"
        render={
          <Dropdown.Menu className="w-36">
            <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Button
          theme="solid"
          className="mr-5 text-center font-open-sans bg-ux-accent-03 hover:bg-sb-link-hover h-sbl px-sbml font-medium rounded-[4px] text-lg"
        >
          User
        </Button>
      </Dropdown>
    </div>
  ) : (
    <Dropdown
      position="bottomRight"
      render={
        <Dropdown.Menu className="w-36">
          <Link to={'/signup'}>
            <Dropdown.Item>SignUp</Dropdown.Item>
          </Link>
          <Link to={'/signin'}>
            <Dropdown.Item>SignIn</Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      }
    >
      <Button
        theme="solid"
        className="mr-5 text-center font-open-sans bg-ux-accent-03 hover:bg-sb-link-hover h-sbl px-sbml font-medium rounded-[4px] text-lg"
      >
        SignUp/SignIn
      </Button>
    </Dropdown>
  );

  return (
    <div className="w-full">
      <Nav
        className="bg-gradient-to-r from-cyan-500 to-blue-500"
        mode={'horizontal'}
        items={
          auth
            ? [
                {
                  itemKey: '/',
                  text: 'Home',
                  icon:
                    location.pathname === '/' ? (
                      <IconHome className="text-blue-600" />
                    ) : (
                      <IconIntro />
                    ),
                },
                {
                  itemKey: '/events',
                  text: 'Events',
                  icon:
                    location.pathname === '/events' ? <IconCalendar /> : <IconCalendarStroked />,
                },
                {
                  itemKey: '/profile',
                  text: 'Profile',
                  icon: location.pathname === '/profile' ? <IconAvatar /> : <IconUserStroked />,
                },
              ]
            : []
        }
        onSelect={(item) => navigate(item.itemKey as string)}
        header={{
          text: 'EMS',
        }}
        footer={footer}
      />
    </div>
  );
};

export default Navbar;
