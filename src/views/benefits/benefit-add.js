import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Select,
  Switch,
} from 'antd';
import { useTranslation } from 'react-i18next';
import benefitService from '../../services/benefit';
import { batch, shallowEqual, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeFromMenu } from '../../redux/slices/menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchBenefit } from 'redux/slices/benefit';
const options = [
  { title: 'free_delivery_count', value: 'free_delivery_count' },
  { title: 'free_delivery_distance', value: 'free_delivery_distance' },
];

export default function BenefitAdd() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [type, setType] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const { benefitsList } = useSelector((state) => state.benefit, shallowEqual);

  const onFinish = (values) => {
    console.log('value', values);
    setLoadingBtn(true);
    const data = {
      type: type,
      default: Number(values.default),
      payload: {
        type: undefined,
        default: undefined,
        ...values,
      },
    };
    const nextUrl = 'settings/benefit';

    benefitService
      .create(data)
      .then(() => {
        batch(() => {
          dispatch(fetchBenefit());
          dispatch(removeFromMenu({ ...activeMenu, nextUrl }));
        });
        toast.success(t('successfully.created'));
        navigate(`/${nextUrl}`);
      })
      .finally(() => setLoadingBtn(false));
  };

  const handleChange = (value) => setType(value);

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Card title={t('add.benefit')}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label={t('select.type')}
              rules={[
                {
                  required: true,
                  message: t('required'),
                },
              ]}
            >
              <Select
                className='w-100'
                onChange={handleChange}
                options={options.filter(
                  (i) => !benefitsList.some((e) => e.type === i.value),
                )}
              />
            </Form.Item>
          </Col>

          {type === 'free_delivery_count' && (
            <>
              <Col span={12}>
                <Form.Item
                  label={t('count')}
                  name='count'
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                  <Input className='w-100' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t('day')}
                  name='day'
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                  <Input className='w-100' />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t('target_type')}
                  name='target_type'
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                  <Select >
                    <Select.Option value='shop'>{t('shop')}</Select.Option>
                    <Select.Option value='restaurant'>
                      {t('restaurant')}
                    </Select.Option>
                    <Select.Option value='all'>{t('all')}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t('default')}
                  name='default'
                  valuePropName='checked'
                >
                  <Switch />
                </Form.Item>
              </Col>
            </>
          )}
          {type === 'free_delivery_distance' && (
            <>
              <Col span={12}>
                <Form.Item
                  label={t('km')}
                  name='km'
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                  <Input className='w-100' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t('default')}
                  name='default'
                  valuePropName='checked'
                >
                  <Switch />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>

        <Space>
          <Button type='primary' htmlType='submit' loading={loadingBtn}>
            {t('submit')}
          </Button>
        </Space>
      </Card>
    </Form>
  );
}
