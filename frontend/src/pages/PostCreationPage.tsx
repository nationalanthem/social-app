import { Container, Paper, Typography, TextField, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Controller, Control, useForm } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import React from 'react'

const useFileInputStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: '20px',
    cursor: 'pointer',
    margin: '1em 0',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    '&:hover': {
      borderColor: 'indigo',
    },
    '&:active': {
      borderColor: 'purple',
    },
  },
}))

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const FileInput: React.FC<{ control: Control }> = ({ control }) => {
  const classes = useFileInputStyles()

  return (
    <Controller
      control={control}
      name="image"
      defaultValue={[]}
      render={({ onChange, onBlur, value }) => (
        <>
          <Dropzone onDrop={onChange}>
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
              const style = {
                ...(isDragActive ? activeStyle : {}),
                ...(isDragAccept ? acceptStyle : {}),
                ...(isDragReject ? rejectStyle : {}),
              }

              return (
                <Box className={classes.root} style={style} {...getRootProps()}>
                  <input {...getInputProps()} name="image" onBlur={onBlur} accept="image/*" />
                  <Typography>Выберите файлы для загрузки или перетащите их мышкой</Typography>
                </Box>
              )
            }}
          </Dropzone>
          <ul>
            {value.map((file: File, index: number) => (
              <li key={index}>
                name: {file.name}, size: {file.size} bytes
              </li>
            ))}
          </ul>
        </>
      )}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    marginTop: theme.spacing(5),
  },
  header: {
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
}))

const PostCreationPage = () => {
  const classes = useStyles()
  const { control } = useForm()

  return (
    <Container maxWidth="md" className={classes.outerContainer}>
      <Typography className={classes.header} align="center" variant="h5" component="h2">
        Создать новый пост
      </Typography>
      <Paper elevation={5} className={classes.innerContainer}>
        <TextField
          label="Описание"
          name="description"
          type="text"
          fullWidth
          margin="normal"
          multiline
        />

        <FileInput control={control} />

        <Button type="submit" variant="contained" color="primary" className={classes.submit}>
          Создать пост
        </Button>
      </Paper>
    </Container>
  )
}

export default PostCreationPage
