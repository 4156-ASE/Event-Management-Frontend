import { useParams } from 'react-router-dom';
import SingleEventContextProvider from './SingleEventContextProvider';
import SingleEventDetailPage from './SingleEventDetailPage';

const SingleEventDetails = () => {
  const { id } = useParams();
  id && localStorage.setItem('event_id', id);
  return (
    <>
      {id && (
        <SingleEventContextProvider>
          <SingleEventDetailPage />
        </SingleEventContextProvider>
      )}
    </>
  );
};
export default SingleEventDetails;
