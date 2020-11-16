import axios, { AxiosResponse } from 'axios'
import { User } from '../redux/re-ducks/user/@types'

interface IMyProfileResponse {
  data: User
}

class UserAPI {
  token: string

  constructor() {
    this.token = localStorage.getItem('token')!
  }

  async register(username: string, password: string): Promise<AxiosResponse> {
    try {
      const response = await axios.post('/register', {
        username,
        password,
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async login(username: string, password: string): Promise<AxiosResponse> {
    try {
      const response = await axios.post('/login', {
        username,
        password,
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async myProfile(): Promise<AxiosResponse<IMyProfileResponse>> {
    try {
      const response = await axios.get('/me', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }
}

export const userAPI = new UserAPI()
