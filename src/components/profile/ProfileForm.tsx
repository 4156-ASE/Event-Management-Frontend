import React, { useEffect, useState } from 'react';
import { Button, Form, Toast  } from '@douyinfe/semi-ui';
import { APIs } from '../../utils/api';
import axios from 'axios';
import { UpdateUserDetail } from '../../utils/dto';

const ProfileForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [id, setID] = useState('');

  const fetchUser = async () => {
    const resp = await APIs.getProfile();
    if (resp.status !== 200) {
      Toast.error('Failed to get event.');
      console.error(resp);
      return;
    }
    setEmail(resp.data.email);
    setFirstName(resp.data.firstname);
    setLastName(resp.data.lastname);
    setID(resp.data.id);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleSubmit() {
    try {
      const resp = await APIs.updateUser(id, {
        email : email,
        firstname : firstname, 
        lastname : lastname
      });
      setEmail(resp.data.email)
      setFirstName(resp.data.firstname)
      setLastName(resp.data.lastname)
    } catch (e: any) {
      //do nothing
    }
  }

  return (
    <Form layout="vertical" className="mx-8 my-12 w-96" autoScrollToError onSubmit={handleSubmit}>
      <h1 className="font-bold text-3xl">User Profile</h1>
      <Form.Input field="email" label={"Email: " + email} onChange={(v) => setEmail(v)}/>
      <Form.Input field="last_name" label={"Last Name: " + lastname} onChange={(v) => setLastName(v)}/>
      <Form.Input field="first_name" label={"First Name: " + firstname} onChange={(v) => setFirstName(v)}/>
      <div className="flex space-x-8 items-end">
        <Button htmlType="submit" type="primary" theme="solid" onClick={() => handleSubmit()}>
          Update
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
function onOk(data: UpdateUserDetail) {
  throw new Error('Function not implemented.');
}

