import { Card, message } from 'antd';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

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
        paymentGateway: { type: "string", title: "Payment Gateway", enum: ["Stripe", "PayPal", "Razorpay"] }
      }
    }
  }
};

const uiSchema = {
  companyName: { "ui:placeholder": "Enter business name" },
  paymentSettings: {
    paymentGateway: { "ui:widget": "select" }
  }
};

const Config = () => {
  const handleSubmit = ({ formData }) => {
    console.log("Saved Configuration:", formData);
    localStorage.setItem("booking_config", JSON.stringify(formData));
    message.success("Configuration saved!");
  };

  return (
    <Card title="Booking System Configuration" style={{ margin: 20 }}>
      <Form schema={schema} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit} />
    </Card>
  );
};

export default Config;
