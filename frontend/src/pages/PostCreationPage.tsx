import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Backdrop,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import Toast from '../components/Toast'
import React from 'react'
import { postAPI } from '../api/post.api'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchMyPosts } from '../redux/re-ducks/myPosts/effects'

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    marginTop: theme.spacing(5),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  descriptionField: {
    marginBottom: theme.spacing(3),
  },
  innerContainer: {
    padding: '1em 3em',
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    alignSelf: 'flex-end',
  },
  backdrop: {
    zIndex: 100,
  },
}))

interface IPostCreationForm {
  description: string
}

interface IImageInfo {
  file: File
  info: {
    URI: string
    name: string
    size: number
  }
}

const postCreationSchema = yup.object().shape({
  description: yup
    .string()
    .required('Пожалуйста, добавьте описание')
    .max(1000, 'Описание может содержать не более 1000 символов')
    .trim(),
})

const PostCreationPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const { handleSubmit, register, errors } = useForm<IPostCreationForm>({
    resolver: yupResolver(postCreationSchema),
  })
  const [imageInfo, setImageInfo] = React.useState<IImageInfo | null>(null)
  const [fileSelectionError, setFileSelectionError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = async (data: IPostCreationForm) => {
    const formData = new FormData()

    if (!imageInfo?.file) {
      return setFileSelectionError('Пожалуйста, добавьте изображение')
    }

    setIsLoading(true)

    formData.append('file', imageInfo.file)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!)

    try {
      const { data: imageData } = await postAPI.uploadImage(formData)
      await postAPI.createPost(data.description, imageData.secure_url)
      dispatch(fetchMyPosts())
      history.push('/feed')
    } catch (err) {
      setIsLoading(false)
      alert('Возникла ошибка при публикации поста')
    }
  }

  const handleFileInputChange = (files: FileList) => {
    if (fileSelectionError) {
      setFileSelectionError(null)
    }

    const image = files[0]

    if (!image) {
      setImageInfo(null)
      return false
    }

    if (image.size / 1048576 >= 10) {
      setFileSelectionError('Слишком большой файл')
      setImageInfo(null)
      return false
    }

    if (!image.type.match(/\/(jpeg|png)$/)) {
      setFileSelectionError('Неверный формат файла')
      setImageInfo(null)
      return false
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImageInfo({
        file: image,
        info: { URI: reader.result as string, name: image.name, size: image.size },
      })
    }
    reader.readAsDataURL(image)
    return true
  }

  return (
    <Container maxWidth="md" className={classes.outerContainer}>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <Typography className={classes.header} align="center" variant="h5" component="h2">
        Создать новый пост
      </Typography>
      <Paper elevation={5} className={classes.innerContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={register}
            label="Описание"
            name="description"
            type="text"
            fullWidth
            margin="normal"
            multiline
            error={!!errors.description}
            helperText={errors.description?.message}
            className={classes.descriptionField}
          />

          {!imageInfo && (
            <>
              <Typography variant="h6" component="h3">
                Выберите изображение
              </Typography>
              <Box mt={1} mb={3}>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Поддерживаемые форматы:{' '}
                  </Typography>
                  <Typography variant="caption" color="textPrimary">
                    PNG, JPG и JPEG
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Максимальный размер изображения:{' '}
                  </Typography>
                  <Typography variant="caption" color="textPrimary">
                    10 МБ
                  </Typography>
                </div>
              </Box>
            </>
          )}

          <input
            type="file"
            onChange={(e) => {
              if (!handleFileInputChange(e.target.files!)) e.target.value = ''
            }}
            accept=".png, .jpg, .jpeg"
            multiple={false}
          />

          <Box display="flex" mt={3} mb={3}>
            {imageInfo && (
              <>
                <img
                  src={imageInfo.info.URI}
                  alt="Изображение для загрузки"
                  style={{
                    display: 'block',
                    maxWidth: '300px',
                    maxHeight: '150px',
                  }}
                />
                <Box ml={3}>
                  <div>
                    <Typography variant="body2" color="textPrimary">
                      Имя изображения:{' '}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {imageInfo.info.name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="textPrimary">
                      Размер:{' '}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {(imageInfo.info.size / 1048576).toFixed(2)}
                      {' МБ'}
                    </Typography>
                  </div>
                </Box>
              </>
            )}
          </Box>

          {fileSelectionError && (
            <Toast closeBtn={false} duration={null} severity="error" message={fileSelectionError} />
          )}

          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Создать пост
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default PostCreationPage
