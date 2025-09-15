import React, { useState } from 'react';
import { Button, Modal, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { ClockCircleOutlined } from '@ant-design/icons';

const Meta = Card.Meta;

const CookingTimeModal = ({ orderId, handleCancel, onSubmit }) => {
  const { t } = useTranslation();
  const [selectedTime, setSelectedTime] = useState(15); // default cooking time

  const cookingOptions = [1, 3, 5, 10, 15, 20, 25, 30];

  const handleSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    onSubmit(orderId, selectedTime);
    handleCancel();
  };

  return (
    <Modal
      visible={!!orderId}
      title={t('set.cooking.time')}
      closable={false}
      footer={[
        <Button key="cancel" type="default" onClick={handleCancel}>
          {t('cancel')}
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {t('submit')}
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        {cookingOptions.map((time) => (
          <Col span={6} key={time}>
            <Card
              hoverable
              onClick={() => handleSelect(time)}
                            style={{
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: selectedTime === time ? '#1890ff' : '#fff',
                color: selectedTime === time ? '#fff' : '#000',
                border: selectedTime === time ? '3px solid #1890ff' : '2px solid #e8e8e8',
                transform: selectedTime === time ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
                boxShadow: selectedTime === time 
                  ? '0 6px 16px rgba(24, 144, 255, 0.4)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.08)',
                borderRadius: '8px',
              }}
            >
              <Meta
                title={
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '12px 8px',
                    minHeight: '80px'
                  }}>
                    <ClockCircleOutlined 
                      style={{ 
                        fontSize: 18, 
                        marginBottom: 6,
                        color: selectedTime === time ? '#fff' : '#1890ff'
                      }} 
                    />
                    <span style={{ 
                      fontSize: 14, 
                      fontWeight: selectedTime === time ? 'bold' : '600',
                      lineHeight: 1.2,
                      textAlign: 'center'
                    }}>
                      {time} {t('min')}
                    </span>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default CookingTimeModal;