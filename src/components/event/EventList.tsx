import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, ButtonGroup, Table } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';
import { APIs } from '../../utils/api';
import { Toast } from '@douyinfe/semi-ui';
import { EventDetail } from '../../utils/dto';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';
import { getName } from '../../utils/data';

const columns: ColumnProps<EventDetail>[] = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: 300,
    sorter: (a, b) => a!.title.localeCompare(b!.title),
    render: (text: string) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    sorter: (a, b) => a!.location.localeCompare(b!.location),
    render: (text: string) => text,
  },
  {
    title: 'Host',
    dataIndex: 'host',
    sorter: (a, b) => getName(a!.host).localeCompare(getName(b!.host)),
    render: (host: EventDetail['host']) => {
      const name = getName(host);
      return (
        <div>
          <Avatar size="small" color={'orange'} style={{ marginRight: 4 }}>
            {typeof name === 'string' && name.slice(0, 1)}
          </Avatar>
          {name}
        </div>
      );
    },
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    sorter: (a, b) => a!.start_time.localeCompare(b!.start_time),
    render: (value) => {
      return dateFns.format(new Date(value), 'dd/MM/yyyy-hh:mm:ss');
    },
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    sorter: (a, b) => a!.end_time.localeCompare(b!.end_time),
    render: (value) => {
      return dateFns.format(new Date(value), 'dd/MM/yyyy-hh:mm:ss');
    },
  },
  {
    title: 'Operations',
    fixed: 'right',
    width: 220,
    align: 'center',
    dataIndex: 'operate',
    render: () => (
      <ButtonGroup type={'primary'}>
        <Button>Detail</Button>
        <Button>Edit</Button>
        <Button type="danger">Delete</Button>
      </ButtonGroup>
    ),
  },
];

const EventList = () => {
  const [dataSource, setData] = useState<EventDetail[]>([]);
  const scroll = useMemo(() => ({ y: 300 }), []);

  useEffect(() => {
    (async () => {
      const resp = await APIs.getEvents();

      if (resp.status !== 200) {
        Toast.error('Failed to get data');
        console.error(resp);
        return;
      }

      setData(resp.data);
    })();
  }, []);

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
    <Table<EventDetail>
      bordered
      rowKey="id"
      empty="empty"
      columns={columns}
      dataSource={dataSource}
      scroll={scroll}
    />
  );
};
export default EventList;
