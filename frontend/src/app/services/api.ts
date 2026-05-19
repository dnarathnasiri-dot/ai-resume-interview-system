import axios from 'axios';

// Replace with your actual Spring Boot backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token if you have JWT authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or however you store your Spring Boot JWT
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Authentication
  login: (credentials: any) => apiClient.post('/auth/login', credentials),
  register: (userData: any) => apiClient.post('/auth/register', userData),
  
  // Resumes
  uploadResume: (formData: FormData) => apiClient.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getResumeScore: (id: string) => apiClient.get(`/resumes/${id}/score`),
  
  // Interviews
  startInterview: (params: any) => apiClient.post('/interviews/start', params),
  submitAnswer: (interviewId: string, answer: any) => apiClient.post(`/interviews/${interviewId}/answers`, answer),
  getInterviewFeedback: (interviewId: string) => apiClient.get(`/interviews/${interviewId}/feedback`),
  
  // User Data
  getUserProfile: () => apiClient.get('/users/profile'),
  getDashboardStats: () => apiClient.get('/users/dashboard-stats'),
};
