import React, { useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';

type FormData = {
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  desc: string;
};

const CreateEventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    start_time: '',
    end_time: '',
    location: '',
    desc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      ...formData,
      // TODO: change to userID
      host: 1,
    };

    console.log(postData);

    try {
      const response = await axios.post('/events', postData);
      console.log(response.data);
      alert('Reservation created successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
              <h4>Title</h4>
            </Grid>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Description</h4>
            </Grid>
            <input type="text" name="desc" value={formData.desc} onChange={handleChange} required />
          </div>

          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Start Time</h4>
            </Grid>
            <input
              type="text"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>End Time</h4>
            </Grid>
            <input
              type="text"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Location</h4>
            </Grid>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <Grid container justifyContent="flex-start">
            <button className="btn" type="submit">
              Create
            </button>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
