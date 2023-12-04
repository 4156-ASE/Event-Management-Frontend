import { Link, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContextProvider';
import { Nav, Dropdown, Button } from '@douyinfe/semi-ui';

import { IconIntro, IconDescriptions, IconCalendar } from '@douyinfe/semi-icons-lab';
import { APIs } from '../../utils/api';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <Dropdown
      position="bottomRight"
      render={
        <Dropdown.Menu className="w-36">
          <Dropdown.Item
            onClick={() => {
              navigate('/signup');
            }}
          >
            SignUp
          </Dropdown.Item>
          <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Button>User</Button>
    </Dropdown>
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
      <Button>SignUp/SignIn</Button>
    </Dropdown>
  );

  return (
    <div style={{ width: '100%' }}>
      <Nav
        mode={'horizontal'}
        items={
          auth
            ? [
                { itemKey: 'home', text: 'Home', icon: <IconIntro /> },
                { itemKey: 'events', text: 'Events', icon: <IconCalendar /> },
                { itemKey: 'profile', text: 'Profile', icon: <IconDescriptions /> },
              ]
            : []
        }
        onSelect={(key) => console.log(key)}
        header={{
          text: 'EMS',
        }}
        footer={footer}
      />
    </div>
  );
};

export default Navbar;
