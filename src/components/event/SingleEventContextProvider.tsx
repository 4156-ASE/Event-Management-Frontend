import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';

type SingleEventData = {
  id: number;
  title: string;
  desc: string;
  start_time: string;
  end_time: string;
  location: string;
  host: number;
};

type SingleEventContextType = {
  singleEvent: SingleEventData | null;
  setSingleEvent: React.Dispatch<React.SetStateAction<SingleEventData | null>>;
};

const SingleEventContextState = {
  singleEvent: null,
  setSingleEvent: () => {
    null;
  },
};

export const SingleEventContext = createContext<SingleEventContextType>(SingleEventContextState);

const SingleEventContextProvider = ({ children }: { children: ReactNode }) => {
  const [singleEvent, setSingleEvent] = useState<SingleEventData | null>(null);
  // TODO: setIsReady=true when loaded
  const [isReady, setIsReady] = useState(false);
  const event_id = localStorage.getItem('event_id');

  useEffect(() => {
    const getSingleEvent = async () => {
      setIsReady(false);
      if (event_id == null) {
        alert('event_id == null');
        setIsReady(true);
        return;
      }
      try {
        const res = await axios.get(`/events/34`);
        const event = res.data;
        console.log('event:', event);
        setSingleEvent(event);
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    };
    getSingleEvent();
  }, []);

  return (
    <SingleEventContext.Provider value={{ singleEvent, setSingleEvent }}>
      {isReady ? children : null}
    </SingleEventContext.Provider>
  );
};

export default SingleEventContextProvider;
