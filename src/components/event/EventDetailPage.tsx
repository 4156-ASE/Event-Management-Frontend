import { useEffect } from 'react';
import { EventDetail, EventUpdateReq } from '../../utils/dto';
import { Button, Form, Toast, useFormApi } from '@douyinfe/semi-ui';
import { APIs } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

function Inner({ id }: { id: string }) {
  const formAPI = useFormApi<EventDetail>();
  const navigate = useNavigate();

  const fetchEvent = async (eventId: string) => {
    const resp = await APIs.getEvent(eventId);

    if (resp.status !== 200) {
      Toast.error('Failed to get event.');
      console.error(resp);
      return;
    }

    formAPI.setValues(resp.data);
  };

  useEffect(() => {
    fetchEvent(id);
  }, [id]);

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
