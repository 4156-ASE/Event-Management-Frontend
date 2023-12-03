import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './ProfileContextProvider';
import { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
}

const ProfileForm = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/');
  };

  // const user_id = localStorage.getItem('pid');
  const { profile } = useContext(ProfileContext);
  const { register, handleSubmit } = useForm<ProfileData>({
    defaultValues: {
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      email: profile?.email,
    },
  });

  const handleUpdate = handleSubmit((data) => {
    axios
      .patch('/users/me/' + localStorage.getItem('userID'), data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
      .then((res) => {
        console.log(res)
        alert('Profile updated successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="content flex-center">
      <div style={{ width: '60%' }}>
        <div className="flex-center">
          <h1 className="large text-primary">My Profile</h1>
        </div>

        <form>
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Email</h4>
            </Grid>
            <input type="text" defaultValue={profile?.email} disabled />
          </div>
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>First Name</h4>
            </Grid>
            <input type="text" {...register('first_name')} required />
          </div>
          <div className="form">
            <Grid container justifyContent="flex-start">
              <h4>Last Name</h4>
            </Grid>
            <input type="text" {...register('last_name')} required />
          </div>

          <div className="flex-center">
            <button className="btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn" onClick={routeChange}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
