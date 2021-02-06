import axios from 'axios'
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
  token: string | null

  constructor() {
    this.token = localStorage.getItem('token')
    this.fetchPosts = this.fetchPosts.bind(this)
    this.fetchFollowings = this.fetchFollowings.bind(this)
  }

  uploadImage(formData: FormData) {
    return axios.post<IUploadImageResponse>(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    )
  }

  createPost(description: string, image: string) {
    return axios.post(
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
  }

  deletePost(postID: string) {
    return axios.delete(`/deletePost/${postID}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  addComment(postID: string, body: string) {
    return axios.put<IAddCommentResponse>(
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
  }

  deleteComment(postID: string, commentID: string) {
    return axios.delete(`/deleteComment/${postID}/${commentID}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  fetchPosts(page?: number) {
    return axios.get<IGetPostsResponse>('/posts', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },

      params: {
        page,
      },
    })
  }

  fetchFollowings(page?: number) {
    return axios.get<IGetPostsResponse>('/posts/followings', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },

      params: {
        page,
      },
    })
  }

  getPostById(postID: string) {
    return axios.get<IGetSinglePostResponse>(`/posts/${postID}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  getPostsFromUser(userID: string) {
    return axios.get<IGetPostsFromUser>(`/posts/from/${userID}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  getMyPosts() {
    return axios.get<IGetMyPostsResponse>('/posts/my', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
}

export const postAPI = new PostAPI()
