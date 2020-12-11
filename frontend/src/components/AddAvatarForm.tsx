import { Box, Button, CircularProgress, makeStyles, Tooltip } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAPI } from '../api/post.api'
import { userAPI } from '../api/user.api'
import { fetchUser } from '../redux/re-ducks/user/effects'
import { selectUser } from '../redux/re-ducks/user/selectors'
import Toast from './Toast'

const useStyles = makeStyles((theme) => ({
  image: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
    '&:active': {
      opacity: 0.5,
    },
  },
  input: {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  },
  label: {
    fontSize: '1em',
    fontWeight: 700,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.light,
    padding: '5px 3px',
    display: 'inline-block',
    cursor: 'pointer',
    outline: '1px dotted #000',
    '&:hover': {
      'background-color': theme.palette.primary.main,
    },
    '&:active': {
      'background-color': theme.palette.primary.dark,
    },
  },
}))

interface ImageInfo {
  file: File
  URI: string
}

export const AddAvatarForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const [imageInfo, setImageInfo] = React.useState<ImageInfo | null>(null)
  const [fileSelectionError, setFileSelectionError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isAvatarChanging, setIsAvatarChanging] = React.useState(false)

  const resetImage = () => {
    setImageInfo(null)
  }

  const handleUploadAvatar = async () => {
    const formData = new FormData()

    if (!imageInfo?.file) {
      return setFileSelectionError('Пожалуйста, добавьте изображение')
    }

    setIsLoading(true)

    formData.append('file', imageInfo.file)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!)

    try {
      const { data: imageData } = await postAPI.uploadImage(formData)
      await userAPI.changeAvatar(imageData.secure_url)
      await dispatch(fetchUser())
    } catch (err) {
      alert('Возникла ошибка при добавлении изображения')
    } finally {
      setIsLoading(false)
      setIsAvatarChanging(false)
      setImageInfo(null)
    }
  }

  const handleInputChange = (files: FileList) => {
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
        URI: reader.result as string,
      })
    }
    reader.readAsDataURL(image)
    return true
  }

  if (!user || isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      {fileSelectionError && (
        <Toast closeBtn={false} duration={null} severity="error" message={fileSelectionError} />
      )}
      {user.avatar && !isAvatarChanging ? (
        <Tooltip title="Нажмите, чтобы изменить">
          <img
            src={user.avatar}
            className={classes.image}
            onClick={() => setIsAvatarChanging(true)}
            alt="Изображение пользователя"
            style={{
              maxWidth: '150px',
              maxHeight: '75px',
            }}
          />
        </Tooltip>
      ) : !imageInfo ? (
        <>
          <label className={classes.label} htmlFor="uploadImage">
            Выберите изображение...
          </label>
          <input
            id="uploadImage"
            className={classes.input}
            type="file"
            onChange={(e) => {
              if (!handleInputChange(e.target.files!)) e.target.value = ''
            }}
            accept=".png, .jpg, .jpeg"
            multiple={false}
          />
        </>
      ) : (
        <Box display="flex" alignItems="center">
          <img
            src={imageInfo.URI}
            alt="Изображение для загрузки"
            style={{
              maxWidth: '150px',
              maxHeight: '75px',
            }}
          />
          <Button style={{ marginLeft: '1em' }} onClick={resetImage}>
            Отменить
          </Button>
          <Button color="secondary" onClick={handleUploadAvatar}>
            Обновить
          </Button>
        </Box>
      )}
    </>
  )
}
