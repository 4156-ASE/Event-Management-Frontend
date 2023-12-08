import ProfileContextProvider from './ProfileContextProvider';
import ProfileForm from './ProfileForm';

const Profile = () => {
  return (
    <ProfileContextProvider>
      <ProfileForm />
    </ProfileContextProvider>
  );
};
export default Profile;
