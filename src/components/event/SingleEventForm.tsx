import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { SingleEventContext } from './SingleEventContextProvider';

type SingleEventData = {
  id: number;
  title: string;
  desc: string;
  start_time: string;
  end_time: string;
  location: string;
  host: number;
};

const SingleEventForm = () => {
  const { singleEvent } = useContext(SingleEventContext);

  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/events');
  };

  const { register, handleSubmit } = useForm<SingleEventData>({
    defaultValues: {
      id: singleEvent?.id,
      title: singleEvent?.title,
      start_time: singleEvent?.start_time,
      end_time: singleEvent?.end_time,
      desc: singleEvent?.desc,
      location: singleEvent?.location,
      host: singleEvent?.host,
    },
  });

  const handleUpdate = handleSubmit((data) => {
    if (singleEvent == null) {
      return;
    }
    axios
      .patch(`/events/${singleEvent.id}`, data)
      .then((res) => {
        console.log(res);
        alert('Reservation updated successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="content flex-center">
      <div style={{ width: '60%' }}>
        <div className="flex-center">
          <h1 className="large text-primary">Update a Reservation</h1>
        </div>
        <form>
          {/* Title */}
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Title</h4>
            </Grid>
            <input type="text" id="title" {...register('title')} required />
          </div>

          {/* Start Time */}
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Start Time</h4>
            </Grid>
            <input
              type="text"
              id="start_time"
              value={singleEvent?.start_time}
              {...register('start_time')}
              required
            />
          </div>

          {/* End Time */}
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>End Time</h4>
            </Grid>
            <input type="text" id="end_time" {...register('end_time')} required />
          </div>

          {/* Description */}
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Description</h4>
            </Grid>
            <input type="text" id="desc" value={singleEvent?.desc} {...register('desc')} required />
          </div>

          {/* Location */}
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Location</h4>
            </Grid>
            <input
              type="text"
              id="location"
              value={singleEvent?.location}
              {...register('location')}
              required
            />
          </div>

          {/* Host */}
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Host ID</h4>
            </Grid>
            <input type="text" id="host" placeholder="Host ID" value={singleEvent?.host} disabled />
          </div>

          <Grid container justifyContent="flex-start">
            <button className="btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn" onClick={routeChange}>
              Cancel
            </button>
          </Grid>
        </form>
      </div>
    </div>
  );
};
export default SingleEventForm;
