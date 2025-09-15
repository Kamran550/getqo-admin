import React, { useState } from 'react';
import { Button, Modal, Row, Col, Card, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const CookingTimeModal2 = ({ orderId, handleCancel, onSubmit }) => {
  const { t } = useTranslation();
  const [selectedTime, setSelectedTime] = useState(15); // default cooking time
  const [customTime, setCustomTime] = useState('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const cookingOptions = [1, 3, 5, 10, 15, 20, 25, 30];

  const handleSelect = (time) => {
    setSelectedTime(time);
    setIsCustomSelected(false);
    setCustomTime('');
  };

  const handleCustomSelect = () => {
    setIsCustomSelected(true);
    setSelectedTime(null);
  };

  const handleCustomTimeChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setCustomTime(value);
    }
  };

  const handleSubmit = () => {
    const timeToSubmit = isCustomSelected ? parseInt(customTime) || 0 : selectedTime;
    if (timeToSubmit > 0) {
      onSubmit(orderId, timeToSubmit);
      handleCancel();
    }
  };

  const isSubmitDisabled = isCustomSelected ? !customTime || parseInt(customTime) <= 0 : !selectedTime;

  return (
    <Modal
      visible={!!orderId}
      title={t('set.cooking.time')}
      closable={false}
      footer={[
        <Button key="cancel" type="default" onClick={handleCancel}>
          {t('cancel')}
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {t('submit')}
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong>{t('select.predefined.time')}:</Text>
      </div>
      
      <Row gutter={[16, 16]}>
        {cookingOptions.map((time) => (
          <Col span={6} key={time}>
            <Card
              hoverable
              onClick={() => handleSelect(time)}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: selectedTime === time && !isCustomSelected ? '#1890ff' : '#fff',
                color: selectedTime === time && !isCustomSelected ? '#fff' : '#000',
                border: selectedTime === time && !isCustomSelected ? '3px solid #1890ff' : '2px solid #e8e8e8',
                transform: selectedTime === time && !isCustomSelected ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
                boxShadow: selectedTime === time && !isCustomSelected
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
                        color: selectedTime === time && !isCustomSelected ? '#fff' : '#1890ff'
                      }} 
                    />
                    <span style={{ 
                      fontSize: 14, 
                      fontWeight: selectedTime === time && !isCustomSelected ? 'bold' : '600',
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
        
        {/* Custom Time Card */}
        <Col span={12}>
          <Card
            hoverable
            onClick={handleCustomSelect}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isCustomSelected ? '#1890ff' : '#fff',
              color: isCustomSelected ? '#fff' : '#000',
              border: isCustomSelected ? '3px solid #1890ff' : '2px solid #e8e8e8',
              transform: isCustomSelected ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
              boxShadow: isCustomSelected
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
                  <EditOutlined 
                    style={{ 
                      fontSize: 18, 
                      marginBottom: 6,
                      color: isCustomSelected ? '#fff' : '#1890ff'
                    }} 
                  />
                  <span style={{ 
                    fontSize: 14, 
                    fontWeight: isCustomSelected ? 'bold' : '600',
                    lineHeight: 1.2,
                    textAlign: 'center'
                  }}>
                    {t('custom.time') || 'Custom Time'}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Custom Time Input */}
      {isCustomSelected && (
        <div style={{ marginTop: 16 }}>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>
            {t('enter.custom.time') || 'Enter custom time (minutes)'}:
          </Text>
          <Input
            type="number"
            placeholder={t('enter.minutes') || 'Enter minutes'}
            value={customTime}
            onChange={handleCustomTimeChange}
            min="1"
            max="999"
            style={{
              textAlign: 'center',
              fontSize: 16,
              padding: '8px 12px'
            }}
            suffix={<span style={{ color: '#999' }}>{t('min') || 'min'}</span>}
            autoFocus
          />
        </div>
      )}
    </Modal>
  );
};

export default CookingTimeModal2;