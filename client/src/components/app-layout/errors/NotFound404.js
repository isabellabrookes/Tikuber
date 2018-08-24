import React from 'react'
import NotFound from './NotFound'
import Typography from '@material-ui/core/Typography/Typography'

const NotFound404 = () => {
  return (
    <div className='Container-Div'>
      <Typography variant="display3" color="secondary" style={{textAlign: 'center'}}>404</Typography>
      <NotFound message={`Page`}/>
    </div>
  )
}

export default NotFound404
