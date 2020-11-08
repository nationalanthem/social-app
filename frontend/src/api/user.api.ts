import axios, { AxiosResponse } from 'axios'

class UserAPI {
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

  async myProfile(token: string): Promise<AxiosResponse> {
    try {
      const response = await axios.get('/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }
}

export const userAPI = new UserAPI()
