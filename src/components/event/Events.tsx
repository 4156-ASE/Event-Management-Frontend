import EventsContextProvider from './EventsContextProvider';
import EventList from './EventList';

const Events = () => {
  return (
    <EventsContextProvider>
      <EventList />
    </EventsContextProvider>
  );
};

export default Events;
