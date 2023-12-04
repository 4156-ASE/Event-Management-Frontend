import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, ButtonGroup, Modal, Table } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';
import { APIs } from '../../utils/api';
import { Toast } from '@douyinfe/semi-ui';
import { EventDetail } from '../../utils/dto';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';
import { getName } from '../../utils/data';

const EventList = () => {
  const [dataSource, setData] = useState<EventDetail[]>([]);
  const scroll = useMemo(() => ({ y: 300 }), []);

  const updateData = async () => {
    const resp = await APIs.getEvents();

    if (resp.status !== 200) {
      Toast.error('Failed to get data');
      console.error(resp);
      return;
    }

    setData(resp.data);
  };

  useEffect(() => {
    updateData();
  }, []);

  const handleDelete = async (eventId: string) => {
    const resp = await APIs.deleteEvent(eventId);

    if (resp.status !== 200) {
      Toast.error('Failed to delete.');
      console.error(resp);
      return;
    }

    updateData();
    Toast.success('Delete event success.');
  };

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
              {host.lastname.slice(0, 2).toUpperCase()}
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
      width: 170,
      align: 'center',
      dataIndex: 'operate',
      render: (_, event: EventDetail) => {
        return (
          <ButtonGroup type={'primary'}>
            <Link to={`/event/details/${event.id}`}>
              <Button theme="light">Detail</Button>
            </Link>
            <Button
              type="danger"
              theme="solid"
              onClick={() => {
                Modal.warning({
                  title: 'Delete Event',
                  content: (
                    <div>
                      Will you delete event: <span className="font-bold">{event.title}</span>
                    </div>
                  ),
                  onOk: () => handleDelete(event.id),
                  okText: 'Confirm',
                  cancelText: 'Cancel',
                });
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

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
