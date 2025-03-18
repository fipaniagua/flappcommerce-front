import axios from 'axios'

/*
const API_BASE_URL = 
  process.env.NODE_ENV === 'development' 
    ? 'http://host.docker.internal:3000' // Acceso directo desde Docker al host
    : '/api' // Usar proxy en producción

*/ 

const API_BASE_URL = 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})


apiClient.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.error('Error de respuesta:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('Error de solicitud:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default apiClient