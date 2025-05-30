import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { batch, shallowEqual, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { disableRefetch, removeFromMenu } from '../../redux/slices/menu';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading';
import benefitService from 'services/benefit';
import { fetchBenefit } from 'redux/slices/benefit';
const options = [
  { title: 'free_delivery', value: 'free_delivery' },
  { title: 'pul_delivery', value: 'pul_delivery' },
];

export default function BenefitEdit() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const { type } = useParams();
  const [typeList, setTypeList] = useState(null);
  const { benefitsList } = useSelector((state) => state.benefit, shallowEqual);

  const fetchBenefitPayload = (type) => {
    setLoading(true);
    console.log({ type });

    benefitService
      .getById(type)
      .then((res) => {
        const data = res.data;
        form.setFieldsValue({
          default: Boolean(data.default),
          ...data.payload,
        });
        setTypeList(data.type);
      })
      .finally(() => {
        console.log('finallya dusdu');

        setLoading(false);
        dispatch(disableRefetch(activeMenu));
      });
  };

  const onFinish = (values) => {
    setLoadingBtn(true);
    const data = {
      type: typeList,
      default: Number(values.default),
      payload: {
        type: undefined,
        default: undefined,
        ...values,
      },
    };
    const nextUrl = 'settings/benefit';

    console.log('2 ci type:', type);

    benefitService
      .update(type, data)
      .then(() => {
        toast.success(t('successfully.updated'));
        batch(() => {
          dispatch(fetchBenefit());
          dispatch(removeFromMenu({ ...activeMenu, nextUrl }));
        });
        console.log('nav olur');

        navigate(`/${nextUrl}`);
      })
      .finally(() => setLoadingBtn(false));
  };

  useEffect(() => {
    console.log({ activeMenu });
    console.log('fetch type:', type);

    if (activeMenu.refetch) {
      fetchBenefitPayload(type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu.refetch]);

  const handleChange = (value) => setTypeList(value);

  return (
    <Card title={t('edit.benefit')} className='h-100'>
      {loading ? (
        <Loading />
      ) : (
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
                    disabled
                    className='w-100'
                    onChange={handleChange}
                    value={typeList}
                    options={options.filter(
                      (i) => !benefitsList.some((e) => e.type === i.value),
                    )}
                  />
                </Form.Item>
              </Col>

              {type === 'free_delivery' && (
                <>
                  <Col span={12}>
                    <Form.Item
                      label={t('free_delivery_count')}
                      name='free_delivery_count'
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
                      label={t('free_delivery_km')}
                      name='free_delivery_km'
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
                      label={t('free_delivery_price')}
                      name='free_delivery_price'
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
                </>
              )}

              <Col span={12}>
                <Form.Item
                  label={t('default')}
                  name='default'
                  valuePropName='checked'
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Space>
              <Button type='primary' htmlType='submit' loading={loadingBtn}>
                {t('submit')}
              </Button>
            </Space>
          </Card>
        </Form>
      )}
    </Card>
  );
}
