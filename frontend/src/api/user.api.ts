import axios from 'axios'
import { IUserPopulated } from '../redux/re-ducks/types'

interface IGetUserByIdResponse {
  data: IUserPopulated
}

interface IGetUsersByNameResponse {
  data: IUserPopulated[]
}

type IMyProfileResponse = IGetUserByIdResponse

class UserAPI {
  token: string | null

  constructor() {
    this.token = localStorage.getItem('token')
  }

  register(username: string, password: string) {
    return axios.post('/register', {
      username,
      password,
    })
  }

  login(username: string, password: string) {
    return axios.post('/login', {
      username,
      password,
    })
  }

  changeAvatar(avatarUrl: string) {
    return axios.post(
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
  }

  myProfile() {
    return axios.get<IMyProfileResponse>('/me', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  getUsersByName(username: string) {
    return axios.get<IGetUsersByNameResponse>(`/search/users/${username}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  getUserById(userID: string) {
    return axios.get<IGetUserByIdResponse>(`/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  followUser(userID: string) {
    return axios.put(
      '/follow',
      { userID },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
  }

  unfollowUser(userID: string) {
    return axios.put(
      '/unfollow',
      { userID },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
  }
}

export const userAPI = new UserAPI()
