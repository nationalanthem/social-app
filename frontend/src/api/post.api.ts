import axios, { AxiosResponse } from 'axios'

const token = localStorage.getItem('token')!

interface IUploadImageResponse {
  secure_url: string
}

export interface IPost {
  _id: string
  description: string
  image: string
  author: {
    username: string
  }
}

interface IGetPostsResponse {
  data: IPost[]
}

class PostAPI {
  async uploadImage(formData: FormData): Promise<AxiosResponse<IUploadImageResponse>> {
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dxe4jr7bn/image/upload',
        formData
      )

      return response
    } catch (err) {
      throw err
    }
  }

  async createPost(description: string, image: string): Promise<AxiosResponse> {
    try {
      const response = await axios.post(
        '/createPost',
        {
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response
    } catch (err) {
      throw err
    }
  }

  async fetchPosts(): Promise<AxiosResponse<IGetPostsResponse>> {
    try {
      const response = await axios.get('/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async getMyPosts(): Promise<AxiosResponse<IGetPostsResponse>> {
    try {
      const response = await axios.get('/posts/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }
}

export const postAPI = new PostAPI()
