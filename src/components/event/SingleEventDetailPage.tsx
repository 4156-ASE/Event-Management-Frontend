import { useContext, useState } from 'react';
import { SingleEventContext } from './SingleEventContextProvider';
import axios from 'axios';

const SingleEventDetailPage = () => {
  const { singleEvent } = useContext(SingleEventContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleInvite = async (event: React.FormEvent) => {
    event.preventDefault();

    const inviteData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    axios
      .post(`/participants/34`, inviteData)
      .then((res) => {
        console.log(res);
        alert('Invitation sent successfully');
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to send invitation');
      });
  };

  return (
    <div className="content flex-center">
      <div style={{ width: '60%' }}>
        <div className="flex-center flex-dir-col margin-b">
          <h1 className="large text-primary">Event Details</h1>

          <div className="flex-left">
            <div>Title: {singleEvent?.title}</div>
            <div>Start Time: {singleEvent?.start_time}</div>
            <div>End Time: {singleEvent?.end_time}</div>
            <div>Location: {singleEvent?.location}</div>
            <div>Description: {singleEvent?.desc}</div>
          </div>
        </div>

        <div style={{ marginTop: '5rem' }}>
          <form>
            <div className="form invite flex-dir-col">
              <div className="flex-center">
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter participant's first name"
                  style={{ width: '40rem' }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-center">
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter participant's last name"
                  style={{ width: '40rem' }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex-center">
                <input
                  type="text"
                  value={email}
                  placeholder="Enter participant's email"
                  style={{ width: '40rem' }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex-center" style={{ marginLeft: '10px' }}>
                <button
                  className="btn"
                  style={{ height: '3.1rem' }}
                  onClick={(e) => handleInvite(e)}
                >
                  Invite
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SingleEventDetailPage;
