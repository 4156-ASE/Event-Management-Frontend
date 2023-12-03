import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { AuthContext } from '../auth/AuthContextProvider';
import { Navigate } from 'react-router-dom';
import { Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';

axios.defaults.baseURL = 'http://localhost:8000';
type FormData = {
  email: string;
  password: string;
};

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const { auth, setAuth } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      ...formData,
    };
    try {
      const resp = await axios.post('/auth/signin', postData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (resp.data.status === 'success') {
        localStorage.setItem('userID', resp.data.userID);
        localStorage.setItem('token', resp.data.token);
        setAuth(localStorage.getItem('token'));
      }
      if (resp.data.user.role == 'admin') {
        localStorage.setItem('role', 'admin');
      } else {
        localStorage.setItem('role', 'regular');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Password or Email is incorrect');
    }
  };

  if (auth) {
    return <Navigate replace to="/" />;
  }

  return (
    <Form layout="horizontal">
      <Form.Input field="username" label="UserName" style={{ width: 80 }} />
      <Form.Input
        field="password"
        label={{
          text: 'Password',
          extra: (
            <Tooltip content="More info xxx">
              <IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }} />
            </Tooltip>
          ),
        }}
        style={{ width: 176 }}
      />
      <Form.Select
        field="role"
        label={{ text: 'Role', optional: true }}
        style={{ width: 176 }}
        optionList={[
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
          { label: 'Guest', value: 'guest' },
        ]}
      ></Form.Select>
    </Form>
  );

  // return (
  //   <div className="content flex-center">
  //     <div style={{ width: '60%' }}>
  //       <div className="flex-center">
  //         <h1 className="large text-primary">Create a New Reservation</h1>
  //       </div>
  //       <form onSubmit={handleSubmit}>
  //         <div className="form">
  //           <Grid container justifyContent="flex-start">
  //             <h4>Email</h4>
  //           </Grid>
  //           <input
  //             type="text"
  //             name="email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>

  //         <div className="form">
  //           <Grid container justifyContent="flex-start">
  //             <h4>Password</h4>
  //           </Grid>
  //           <input
  //             type="password"
  //             name="password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             minLength={8}
  //             maxLength={20}
  //             required
  //           />
  //         </div>
  //         <Grid container justifyContent="flex-start">
  //           <button className="btn" type="submit">
  //             Login
  //           </button>
  //         </Grid>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default Signin;
