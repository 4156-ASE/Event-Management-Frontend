import { useParams } from 'react-router-dom';
import SingleEventContextProvider from './SingleEventContextProvider';
import SingleEventForm from './SingleEventForm';

const SingleEvent = () => {
  const { id } = useParams();
  id && localStorage.setItem('event_id', id);
  return (
    <SingleEventContextProvider>
      <SingleEventForm />
    </SingleEventContextProvider>
  );
};

export default SingleEvent;
