import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
}

type ProfileContextType = {
  profile: ProfileData | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
};

const ProfileContextState = {
  profile: null,
  setProfile: () => {
    null;
  },
};

export const ProfileContext = createContext<ProfileContextType>(ProfileContextState);

const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isReady, setIsReady] = useState(false);
  // const user_id = localStorage.getItem('pid');

  useEffect(() => {
    const getProfile = async () => {
      axios
        .get('/users/me/' + localStorage.getItem('userID'), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      })
        .then((res) => {
          const data = res.data.user;
          setProfile(data);
          setIsReady(true);
        })
        .catch((err) => {
          console.log('err:', err);
        });
    };
    getProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {isReady ? children : null}
    </ProfileContext.Provider>
  );
};
export default ProfileContextProvider;
