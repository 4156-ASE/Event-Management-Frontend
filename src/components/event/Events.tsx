import EventsContextProvider from './EventsContextProvider';
import EventList from './EventList';

const Events = () => {
  return (
    <EventsContextProvider>
      <div className='px-8 py-12'>
      <EventList />
      </div>
    </EventsContextProvider>
  );
};

export default Events;
