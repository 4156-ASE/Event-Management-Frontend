import React from 'react';
import { Button, Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import { Link, useNavigate } from 'react-router-dom';
import { APIs } from '../../utils/api';

type FormData = {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: FormData) => {
    (async () => {
      const resp = await APIs.signup(values);

      // register success
      if (resp.status === 201) {
        navigate('/');
      }
    })();
  };

  return (
    <div className="flex justify-center">
      <Form
        layout="vertical"
        className="mx-8 my-12 w-96"
        autoScrollToError
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-3xl">Sign Up</h1>
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
        <Form.Input field="firstname" label="Firstname" placeholder="Enter your firstname" />
        <Form.Input field="lastname" label="Lastname" placeholder="Enter your lastname" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>
            <span>Or</span>
            <Link to={'/signin'}>
              <Button
                theme="borderless"
                style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}
              >
                Log in
              </Button>
            </Link>
          </p>
          <Button htmlType="submit" type="tertiary">
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
