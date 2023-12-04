import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContextProvider';
import { Button, Form, Toast, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import { Link, useNavigate } from 'react-router-dom';
import { APIs } from '../../utils/api';

type FormData = {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
};

const SignIn: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  console.log('auth', auth);

  if (auth) {
    navigate('/');
  }

  const handleSubmit = (values: FormData) => {
    (async () => {
      const resp = await APIs.signin(values);
      console.log(resp);

      if (resp.status !== 201) {
        Toast.error('Failed to sign in');
        console.error(resp);
        return;
      }

      localStorage.setItem('userID', resp.data.userID);
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('role', resp.data.user.role);
      setAuth(resp.data.token);

      navigate('/events');
    })();
  };

  return (
    <div className="flex justify-center">
      <Form layout="vertical" className="mx-8 my-12 w-96" autoScrollToError onSubmit={handleSubmit}>
        <h1 className="font-bold text-3xl">Sign In</h1>
        <Form.Input field="email" label="Email" placeholder="Enter your email" />
        <Form.Input
          field="password"
          mode="password"
          minLength={8}
          maxLength={20}
          placeholder="Enter your password"
          label={{
            text: 'Password',
            extra: (
              <Tooltip content="Password has to be at between 8 and 20 chars">
                <IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }} />
              </Tooltip>
            ),
          }}
        />
        <Form.Checkbox
          field="agree"
          noLabel
          checked={agree}
          onChange={(e) => setAgree(e.target.checked!)}
        >
          I have read and agree to the terms of service
        </Form.Checkbox>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>
            <span>Or</span>
            <Link to={'/signup'}>
              <Button
                theme="borderless"
                style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}
              >
                Sign up
              </Button>
            </Link>
          </p>
          <Button disabled={!agree} htmlType="submit" type="tertiary">
            Log in
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
