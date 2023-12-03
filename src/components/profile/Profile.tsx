import CreateProfileForm from './CreateProfileForm';
import ProfileContextProvider from './ProfileContextProvider';
import ProfileForm from './ProfileForm';

const Profile = () => {
  return (
    <ProfileContextProvider>
      <ProfileForm />
      <CreateProfileForm />
    </ProfileContextProvider>
  );
};
export default Profile;
