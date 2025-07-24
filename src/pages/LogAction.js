// utils/logAction.js
export const logAction = (user, action) => {
  const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
  logs.unshift({
    key: Date.now(),
    date: new Date().toISOString().split('T')[0],
    user,
    action,
  });
  localStorage.setItem('auditLogs', JSON.stringify(logs));
};
