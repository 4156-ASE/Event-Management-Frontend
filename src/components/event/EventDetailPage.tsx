import { useEffect, useState } from 'react';
import { EventDetail, EventUpdateReq, UserDetail } from '../../utils/dto';
import { Avatar, AvatarGroup, Button, Dropdown, Form, Toast, useFormApi } from '@douyinfe/semi-ui';
import { APIs } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { getName } from '../../utils/data';

interface UserAvatarProps {
  user: UserDetail;
  isHost: boolean;
}

function UserAvatar({ user, isHost }: UserAvatarProps) {
  return (
    <Dropdown
      key={user.id}
      render={
        <Dropdown.Menu>
          <Dropdown.Title>{getName(user)}</Dropdown.Title>
          <Dropdown.Item>Detail</Dropdown.Item>
          {!isHost && (
            <>
              <Dropdown.Item>Transfer Host</Dropdown.Item>
              <Button type="danger" theme="solid" className="w-full h-full">
                Remove
              </Button>
            </>
          )}
        </Dropdown.Menu>
      }
    >
      <Avatar color="red" alt="Lisa LeBlanc">
        {getName(user).slice(0, 2).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
}

function Inner({ id }: { id: string }) {
  const formAPI = useFormApi<EventDetail>();
  const [event, setEvent] = useState<EventDetail>();
  const navigate = useNavigate();
  const formState = formAPI.getFormState();

  const fetchEvent = async (eventId: string) => {
    const resp = await APIs.getEvent(eventId);

    if (resp.status !== 200) {
      Toast.error('Failed to get event.');
      console.error(resp);
      return;
    }

    formAPI.setValues(resp.data);
    setEvent(resp.data);
  };

  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  console.log('formState', formState);

  return (
    <>
      <h1 className="font-bold text-3xl">Event Detail</h1>
      <Form.Input field="title" label="Title" placeholder="Enter your title" />
      <Form.Input field="desc" label="Description" placeholder="Enter your description" />
      <Form.Input field="location" label="Location" placeholder="Enter your location" />
      <Form.DatePicker
        type="dateTime"
        field="start_time"
        label="Start Time"
        placeholder="Enter your start time"
      />
      <Form.DatePicker
        type="dateTime"
        field="end_time"
        label="End Time"
        placeholder="Enter your end time"
      />
      <div className="flex flex-col mb-4">
        <Form.Label>Host</Form.Label>
        {event && <UserAvatar user={event?.host} isHost={true} />}
        <Form.Label>Participants</Form.Label>
        <div className="flex items-center space-x-4">
          <AvatarGroup>
            {event?.participants?.map((participate) => (
              <UserAvatar user={participate} key={participate.id} isHost={false} />
            ))}
          </AvatarGroup>
          <Button className="text-2xl">+</Button>
        </div>
      </div>
      <div className="flex space-x-8 items-end">
        <Button htmlType="submit" type="primary" theme="solid">
          Save
        </Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </>
  );
}

export function EventDetailPage() {
  const navigate = useNavigate();

  const params = useParams<{
    id: string;
  }>();

  if (!params.id) {
    navigate(-1);
    return null;
  }

  const handleSubmit = async (values: EventUpdateReq) => {
    const response = await APIs.updateEvent(params.id!, values);

    if (response.status !== 200) {
      Toast.error('Failed to save');
      console.error(response);
      return;
    }

    Toast.success('Reservation saved successfully');
    navigate(-1);
  };

  return (
    <Form layout="vertical" className="mx-8 my-12 w-96" autoScrollToError onSubmit={handleSubmit}>
      <Inner id={params.id} />
    </Form>
  );
}
