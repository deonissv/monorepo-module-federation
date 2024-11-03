import { useSSRContext } from 'vue';

const getClientInitialData = () => {
  return (window as any).__INITIAL_DATA__;
};

const getServerInitialData = () => {
  return useSSRContext() ?? {};
};

export const useInitialData = () => {
  return typeof window === 'undefined' ? getServerInitialData() : getClientInitialData();
};
