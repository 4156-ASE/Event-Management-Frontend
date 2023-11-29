import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';

import { useContext } from 'react';
import { EventsContext } from './EventsContextProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EventList = () => {
  const { eventList, deleteEvent } = useContext(EventsContext);
  console.log(eventList);
  const fakeEventList = [
    {
      id: 34,
      title: '111',
      desc: 'test',
      start_time: '2023-10-28T14:30:00.000Z',
      end_time: '2023-10-28T14:30:00.000Z',
      location: '111',
      host: 1,
    },
    {
      id: 35,
      title: 'Halloween Party5',
      desc: 'Get ready for a spooktacular Halloween Party on October 28, 2023 - a night filled with fright, fun, and fabulous costumes!',
      start_time: '2023-10-28T14:30:00.000Z',
      end_time: '2023-10-29T23:30:00.000Z',
      location: '116 St, New York, NY 10025',
      host: 1,
    },
  ];

  const navigate = useNavigate();

  const handleDelete = async (eventId: number | null) => {
    console.log('delete:', eventId);
    axios
      .delete(`/events/${eventId}`)
      .then((res) => {
        const data = res.data;
        alert(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content flex-center flex-dir-col">
      <div className="flex-center">
        <h1 className="large text-primary">Manage My Events</h1>
      </div>
      <Table style={{ width: '80%' }}>
        <TableHead>
          <TableRow>
            <TableCell width="5%">ID</TableCell>
            <TableCell width="20%">Title</TableCell>
            <TableCell width="20%">Start Time</TableCell>
            <TableCell width="20%">End Time</TableCell>
            <TableCell width="20%">Host</TableCell>
            <TableCell width="5%">Details</TableCell>
            <TableCell width="5%">Edit</TableCell>
            <TableCell width="5%">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fakeEventList
            ? fakeEventList.map((event) => (
                <TableRow key={event.id}>
                  <TableCell width="5%">{event.id}</TableCell>
                  <TableCell
                    width="20%"
                    key={event.id}
                    onClick={() => navigate(`/event/details/${event.id}`)}
                  >
                    {event.title}
                  </TableCell>
                  <TableCell width="20%">{event.start_time}</TableCell>
                  <TableCell width="20%">{event.end_time}</TableCell>
                  <TableCell width="20%">{event.host}</TableCell>

                  <TableCell width="5%">
                    <Link to={`/event/details/${event.id}`} key={event.id}>
                      <IconButton>
                        <TbListDetails />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell width="5%">
                    <Link to={`/event/${event.id}`} key={event.id}>
                      <IconButton>
                        <FaRegEdit />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell width="5%">
                    <IconButton
                      onClick={() => {
                        deleteEvent(event.id);
                        handleDelete(event.id);
                      }}
                    >
                      <AiOutlineDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};
export default EventList;
