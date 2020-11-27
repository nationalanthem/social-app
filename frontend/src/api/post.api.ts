import axios, { AxiosResponse } from 'axios'
import { IPost } from '../redux/re-ducks/types'

interface IUploadImageResponse {
  secure_url: string
}

export interface IGetPostsResponse {
  totalPages: number
  currentPage: number
  posts: IPost[]
}

interface IGetMyPostsResponse {
  data: IPost[]
}

interface IGetSinglePostResponse {
  data: IPost
}

interface IAddCommentResponse {
  data: {
    comments: {
      _id: string
      author: {
        username: string
      }
    }[]
  }
}

export interface IPostsFromUserId {
  _id: string
  description: string
  image: string
}
interface IGetPostsFromUser {
  data: IPostsFromUserId[]
}

class PostAPI {
  token: string

  constructor() {
    this.token = localStorage.getItem('token')!
    this.fetchPosts = this.fetchPosts.bind(this)
    this.fetchFollowings = this.fetchFollowings.bind(this)
  }

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
            Authorization: `Bearer ${this.token}`,
          },
        }
      )

      return response
    } catch (err) {
      throw err
    }
  }

  async deletePost(postID: string): Promise<AxiosResponse> {
    try {
      const response = await axios.delete(`/deletePost/${postID}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      return response
    } catch (err) {
      throw err
    }
  }

  async addComment(postID: string, body: string): Promise<AxiosResponse<IAddCommentResponse>> {
    try {
      const response = await axios.put(
        '/addComment',
        {
          postID,
          body,
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

  async deleteComment(postID: string, commentID: string): Promise<AxiosResponse> {
    try {
      const response = await axios.delete(`/deleteComment/${postID}/${commentID}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      return response
    } catch (err) {
      throw err
    }
  }

  async fetchPosts(page?: number): Promise<AxiosResponse<IGetPostsResponse>> {
    try {
      const response = await axios.get('/posts', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          page,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async fetchFollowings(page?: number): Promise<AxiosResponse<IGetPostsResponse>> {
    try {
      const response = await axios.get('/posts/followings', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          page,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async getPostById(postID: string): Promise<AxiosResponse<IGetSinglePostResponse>> {
    try {
      const response = await axios.get(`/posts/${postID}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async getPostsFromUser(userID: string): Promise<AxiosResponse<IGetPostsFromUser>> {
    try {
      const response = await axios.get(`/posts/from/${userID}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return response
    } catch (err) {
      throw err
    }
  }

  async getMyPosts(): Promise<AxiosResponse<IGetMyPostsResponse>> {
    try {
      const response = await axios.get('/posts/my', {
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

export const postAPI = new PostAPI()
