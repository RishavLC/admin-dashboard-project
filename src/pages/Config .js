import { Card, message } from 'antd';
import Form from '@rjsf/core';

const schema = {
  title: "System Configuration",
  type: "object",
  required: ["companyName", "bookingLimit"],
  properties: {
    companyName: { type: "string", title: "Company Name" },
    bookingLimit: { type: "number", title: "Booking Limit Per Day", default: 10 },
    enableEmail: { type: "boolean", title: "Enable Email Notifications", default: true },
    theme: {
      type: "string",
      title: "Theme Color",
      enum: ["Light", "Dark", "Blue"]
    },
    settings: {
      type: "object",
      title: "Advanced Settings",
      properties: {
        allowGuestBooking: { type: "boolean", title: "Allow Guest Booking", default: false },
        maxGuestsPerBooking: { type: "number", title: "Max Guests Per Booking", default: 5 }
      }
    }
  }
};

const uiSchema = {
  companyName: { "ui:placeholder": "Enter your company name" },
  bookingLimit: { "ui:widget": "updown" },
  theme: { "ui:widget": "select" },
};

const Config = () => {
  const handleSubmit = ({ formData }) => {
    console.log("Settings Saved:", formData);
    message.success("Configuration Saved!");
    localStorage.setItem("system_config", JSON.stringify(formData));
  };

  return (
    <Card title="System Configuration" style={{ margin: 20 }}>
      <Form schema={schema} uiSchema={uiSchema} onSubmit={handleSubmit} />
    </Card>
  );
};

export default Config;
