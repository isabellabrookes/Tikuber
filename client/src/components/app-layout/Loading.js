import React from 'react'
import Typography from '@material-ui/core/Typography/Typography'

const Loading = () => {
  return (
    <div className='NotFound Container-Div centered-flex'>
      <div className='Component-Status centered-flex'>
        <Typography variant={'display2'}>Loading</Typography>
        <Typography variant={'display1'} gutterBottom>Please be patient...</Typography>
      </div>
    </div>
  )
}

export default Loading
