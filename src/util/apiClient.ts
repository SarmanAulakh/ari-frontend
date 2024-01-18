import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/public`
});

export default apiClient;