import { Card, message, Typography } from 'antd';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

const { Title } = Typography;

// Schema for admin configuration
const schema = {
  title: "Booking System Configuration",
  type: "object",
  required: ["companyName", "maxDailyBookings"],
  properties: {
    companyName: { type: "string", title: "Company Name" },
    maxDailyBookings: { type: "number", title: "Max Bookings Per Day", default: 20 },
    enableNotifications: { type: "boolean", title: "Enable Notifications", default: true },
    bookingWindowDays: { type: "number", title: "Booking Window (days)", default: 30 },
    theme: {
      type: "string",
      title: "Theme Preference",
      enum: ["Light", "Dark", "Corporate Blue"]
    },
    paymentSettings: {
      type: "object",
      title: "Payment Settings",
      properties: {
        enableOnlinePayments: { type: "boolean", title: "Enable Online Payments", default: true },
        paymentGateway: {
          type: "string",
          title: "Payment Gateway",
          enum: ["Stripe", "PayPal", "Razorpay"]
        }
      },
      required: ["enableOnlinePayments"]
    }
  }
};

// UI customization
const uiSchema = {
  companyName: { "ui:placeholder": "Enter your company name" },
  paymentSettings: {
    paymentGateway: { "ui:widget": "select" }
  }
};

const Config = () => {
  const handleSubmit = ({ formData }) => {
    localStorage.setItem("booking_config", JSON.stringify(formData));
    console.log("Saved Configuration:", formData);
    message.success("Booking configuration saved successfully!");
  };

  return (
    <Card style={{ margin: 20 }}>
      <Title level={4}>Admin Configuration Panel</Title>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default Config;
