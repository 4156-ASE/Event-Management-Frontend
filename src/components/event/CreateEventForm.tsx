import React from 'react';
import { EventCreateReq } from '../../utils/dto';
import { Button, Form, Toast } from '@douyinfe/semi-ui';
import { APIs } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const CreateEventForm: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: EventCreateReq) => {
    try {
      await APIs.createEvent(values);

      Toast.success('Reservation created successfully');
      navigate('/events');
    } catch (e: any) {
      Toast.error('Failed to create' + e.response.data.message);
      console.error(e);
    }
  };

  return (
    <Form layout="vertical" className="mx-8 my-12 w-96" autoScrollToError onSubmit={handleSubmit}>
      <h1 className="font-bold text-3xl">Create a New Reservation</h1>
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
          Create
        </Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </Form>
  );
};

export default CreateEventForm;
