import SignUp from '../user/SignUp';
import ProfileContextProvider from './ProfileContextProvider';
import ProfileForm from './ProfileForm';

const Profile = () => {
  return (
    <ProfileContextProvider>
      <ProfileForm />
      <SignUp />
    </ProfileContextProvider>
  );
};
export default Profile;
