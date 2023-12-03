import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { AuthContext } from '../auth/AuthContextProvider';
import { Navigate } from 'react-router-dom';
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
  
  const { auth,setAuth } = useContext(AuthContext);

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
        withCredentials: true
    });
      if (resp.data.status === 'success') {
        localStorage.setItem("userID", resp.data.userID)
        localStorage.setItem("token", resp.data.token)
        setAuth(localStorage.getItem('token'))
      }
      if (resp.data.user.role == 'admin') {
        localStorage.setItem("role", 'admin')
      }
      else {
        localStorage.setItem("role", "regular")
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Password or Email is incorrect");
    }
  };
  if (auth) {
    return <Navigate replace to="/" />;
  }
  else {
    return (
      <div className="content flex-center">
      <div style={{ width: '60%' }}>
        <div className="flex-center">
          <h1 className="large text-primary">Create a New Reservation</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Email</h4>
            </Grid>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Password</h4>
            </Grid>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Grid container justifyContent="flex-start">
            <button className="btn" type="submit">
              Login
            </button>
          </Grid>
        </form>
      </div>
    </div>
    );
  }
};

export default Signin;
