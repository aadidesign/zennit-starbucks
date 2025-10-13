// Stub file - all AWS operations handled by backend
export const getNetworkingMetrics = async () => {
  return {
    vpcs: [],
    securityGroups: [],
    status: 'Backend handles all networking operations'
  };
};

export default {
  getNetworkingMetrics
};
