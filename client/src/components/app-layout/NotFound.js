import React from 'react'
import Button from '@material-ui/core/Button/Button'
import Typography from '@material-ui/core/Typography/Typography'

const NotFound = (props) => {
  return (
    <div className='NotFound Container-Div centered-flex'>
      <div className='Component-Status centered-flex'>
      <Typography variant={'display2'}>Oh no!</Typography>
      <Typography variant={'display1'} gutterBottom>{props.message} Not Found... <span role='img' aria-label='crying face'>😢</span></Typography>
      <Typography variant='subheading'>Go back to find something better!</Typography>
      <Button href='/' variant="contained" color="primary">Back</Button>
      </div>
    </div>
  )
}

export default NotFound
