// src/utils/logAction.js
const logAction = (user, action) => {
  const logs = JSON.parse(localStorage.getItem('auditLogs')) || [];
  const newLog = {
    key: Date.now(),
    date: new Date().toISOString().split('T')[0],
    user,
    action
  };
  logs.unshift(newLog); // newest first
  localStorage.setItem('auditLogs', JSON.stringify(logs));
};

export default logAction;
