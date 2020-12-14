import axios, { AxiosResponse } from 'axios'
import { IUserPopulated } from '../redux/re-ducks/types'

interface IMyProfileResponse {
  data: IUserPopulated
}

interface IGetUsersByNameResponse {
  data: IUserPopulated[]
}

interface IGetUserByIdResponse {
  data: IUserPopulated
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

  async changeAvatar(avatarUrl: string): Promise<AxiosResponse> {
    try {
      const response = await axios.post(
        '/me/changeAvatar',
        {
          avatarUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
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

  async getUsersByName(username: string): Promise<AxiosResponse<IGetUsersByNameResponse>> {
    try {
      const response = await axios.get(`/search/users/${username}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async getUserById(userID: string): Promise<AxiosResponse<IGetUserByIdResponse>> {
    try {
      const response = await axios.get(`/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async followUser(userID: string): Promise<AxiosResponse> {
    try {
      const response = await axios.put(
        '/follow',
        { userID },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      return response
    } catch (err) {
      throw err
    }
  }

  async unfollowUser(userID: string): Promise<AxiosResponse> {
    try {
      const response = await axios.put(
        '/unfollow',
        { userID },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      return response
    } catch (err) {
      throw err
    }
  }
}

export const userAPI = new UserAPI()
