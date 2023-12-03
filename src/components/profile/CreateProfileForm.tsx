import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { AuthContext } from '../auth/AuthContextProvider';
import { Navigate } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:8000';
type FormData = {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
};

const CreateProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    last_name: '',
    first_name: '',
  });
  
  const { auth } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      ...formData,
    };
    axios.post('/auth/signup', postData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true})
    .then((response) => {console.log(response)})
    .catch((error) => {
      const message = error.response.data.message
      alert(message);});
  };
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

          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>First Name</h4>
            </Grid>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Last Name</h4>
            </Grid>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
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
};

export default CreateProfileForm;
