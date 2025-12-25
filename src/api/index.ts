import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const httpClient: AxiosInstance = axios.create({
  baseURL: 'https://api.cerebras.ai/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_CEREBRAS_API_KEY}`,
  },
})
