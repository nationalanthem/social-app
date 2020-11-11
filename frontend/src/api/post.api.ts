import axios, { AxiosResponse } from 'axios'

interface IUploadImageResponse {
  secure_url: string
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

  async createPost(description: string, image: string, token: string): Promise<AxiosResponse> {
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
}

export const postAPI = new PostAPI()
