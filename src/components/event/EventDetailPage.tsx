import { useEffect, useState } from 'react';
import { EventDetail, EventUpdateReq, UserDetail } from '../../utils/dto';
import {
  Avatar,
  AvatarGroup,
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Toast,
  useFormApi,
} from '@douyinfe/semi-ui';
import { APIs } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { getName } from '../../utils/data';
import Label from '@douyinfe/semi-ui/lib/es/form/label';

interface UserAvatarProps {
  user: UserDetail;
  isHost: boolean;
  eventId: string;
  onRemoveUser: (event: EventDetail) => void;
}

function UserAvatar({ user, isHost, eventId, onRemoveUser }: UserAvatarProps) {
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
              <Button
                type="danger"
                theme="solid"
                className="w-full h-full"
                onClick={() => {
                  Modal.warning({
                    title: 'Remove user',
                    content: (
                      <div>
                        Will you remove user: <span className="font-bold">{getName(user)}</span>
                      </div>
                    ),
                    okText: 'Remove',
                    cancelText: 'Cancel',
                    onOk: async () => {
                      const resp = await APIs.removeUser({ eventId, userId: user.id });
                      // TODO;
                      if (resp.status !== 201) {
                        Toast.error('Failed to remove user');
                        console.error(resp);
                        return;
                      }

                      onRemoveUser(resp.data);
                    },
                  });
                }}
              >
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

interface AddModalProps {
  visible: boolean;
  onOk: (event: EventDetail) => void;
  onCancel: () => void;
  eventId: string;
}

function AddModal({ visible, onOk, onCancel, eventId }: AddModalProps) {
  const [email, setEmail] = useState('');
  async function handleSubmit() {
    const resp = await APIs.addUser({
      eventId,
      email,
    });

    if (resp.status !== 201) {
      Toast.error('Failed to add user.');
      console.error(resp);
      return;
    }

    onOk(resp.data);
  }

  return (
    <Modal
      title="Add User"
      visible={visible}
      okText="Add"
      cancelText="Cancel"
      onOk={() => {
        handleSubmit();
      }}
      onCancel={onCancel}
    >
      <Label>Email</Label>
      <Input value={email} onChange={(v) => setEmail(v)} />
    </Modal>
  );
}

function Inner({ id }: { id: string }) {
  const formAPI = useFormApi<EventDetail>();
  const [event, setEvent] = useState<EventDetail>();
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const navigate = useNavigate();

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

  function handleRemoveUser(ev: EventDetail) {
    setEvent(ev);
    formAPI.setValues(ev);
    Toast.success('Remove user success.');
  }

  return (
    <>
      <h1 className="font-bold text-3xl">Event Detail</h1>
      <AddModal
        eventId={event?.id ?? ''}
        visible={addUserModalVisible}
        onCancel={() => {
          setAddUserModalVisible(false);
        }}
        onOk={(values: EventDetail) => {
          setEvent(values);
          formAPI.setValues(values);
          setAddUserModalVisible(false);
        }}
      />
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
        {event && (
          <UserAvatar
            user={event?.host}
            isHost={true}
            eventId={event.id}
            onRemoveUser={handleRemoveUser}
          />
        )}
        <Form.Label>Participants</Form.Label>
        <div className="flex items-center space-x-4">
          <AvatarGroup>
            {event?.participants?.map((participate) => (
              <UserAvatar
                user={participate}
                key={participate.id}
                isHost={false}
                eventId={event.id}
                onRemoveUser={handleRemoveUser}
              />
            ))}
          </AvatarGroup>
          <Button
            className="text-2xl"
            onClick={() => {
              setAddUserModalVisible(true);
            }}
          >
            +
          </Button>
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
