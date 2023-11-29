import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type EventData = {
  id: number;
  title: string;
  desc: string;
  start_time: string;
  end_time: string;
  location: string;
  host: number;
};

type EventContextType = {
  eventList: EventData[] | null;
  setEventList: React.Dispatch<React.SetStateAction<EventData[] | null>>;
  deleteEvent: React.Dispatch<number>;
};

const EventContextState = {
  eventList: null,
  setEventList: () => {
    null;
  },
  deleteEvent: () => {
    null;
  },
};

export const EventsContext = createContext<EventContextType>(EventContextState);

const EventsContextProvider = ({ children }: { children: ReactNode }) => {
  const [eventList, setEventList] = useState<EventData[] | null>(null);

  const deleteEvent = (id: number) => {
    setEventList((eventList) => eventList!.filter((event) => event.id != id));
  };

  useEffect(() => {
    const getEvents = async () => {
      // TODO: get all events
      // axios
      //   .get(`XXX`)
      //   .then((res) => {
      //     const events = res.data['events'];
      //     setEventList(events);
      //   })
      //   .catch((err) => {
      //     console.log('err:', err);
      //   });
    };
    getEvents();
  }, []);

  const eventsProviderValue = useMemo(
    () => ({ eventList, setEventList, deleteEvent }),
    [eventList, setEventList, deleteEvent],
  );
  return <EventsContext.Provider value={eventsProviderValue}>{children}</EventsContext.Provider>;
};

export default EventsContextProvider;
