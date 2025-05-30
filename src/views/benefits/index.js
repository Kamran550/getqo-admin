import React, { useEffect } from 'react';
import { Button, Card, Space, Table } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { disableRefetch } from '../../redux/slices/menu';
import { shallowEqual, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchBenefit } from '../../redux/slices/benefit';
import { useNavigate } from 'react-router-dom';
import { addMenu } from '../../redux/slices/menu';

export default function Benefit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const { benefitsList, loading } = useSelector(
    (state) => state.benefit,
    shallowEqual,
  );

  const goToEdit = (type) => {
    dispatch(
      addMenu({
        id: 'benefit-edit',
        url: `settings/benefit/${type}`,
        name: t('edit.benefit'),
      }),
    );
    navigate(`/settings/benefit/${type}`);
  };

  const goToAdd = () => {
    dispatch(
      addMenu({
        id: 'benefit-add',
        url: 'settings/benefit/add',
        name: t('add.benefit'),
      }),
    );
    navigate('/settings/benefit/add');
  };

  const columns = [
    {
      title: t('type'),
      dataIndex: 'type',
      width: '80%',
    },
    // {
    //   title: t('twilio.number'),
    //   dataIndex: 'twilio_number',
    //   render: (_, row) => row.payload?.twilio_number,
    // },
    {
      title: t('options'),
      key: 'options',
      dataIndex: 'options',
      is_show: true,
      render: (_, row) => {
        return (
          <Space>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => goToEdit(row.type)}
              disabled={row.deleted_at}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    console.log('Benefits List:', benefitsList); // Burada `benefitsList`-in qiymətini yoxlaya bilərsiniz
  }, [benefitsList]);

  useEffect(() => {
    if (activeMenu.refetch) {
      dispatch(fetchBenefit());
      dispatch(disableRefetch(activeMenu));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu.refetch]);

  return (
    <Card
      title={t('benefit')}
      extra={
        <Space>
          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={goToAdd}
          >
            {t('add.benefit')}
          </Button>
        </Space>
      }
    >
      <Table
        scroll={{ x: true }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={benefitsList}
        pagination={false}
        loading={loading}
      />
    </Card>
  );
}
