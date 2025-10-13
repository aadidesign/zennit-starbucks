// Stub file - all AWS operations handled by backend
export const getDatabaseMetrics = async () => {
  return {
    tables: [],
    metrics: {},
    status: 'Backend handles all database operations'
  };
};

export const getTableInfo = async () => {
  return { message: 'Use backend API for database operations' };
};

export default {
  getDatabaseMetrics,
  getTableInfo
};
