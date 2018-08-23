import React from 'react'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography/Typography'

const CommentCard = async (props) => {
  const { comment } = props
  return (
    <Card className='padding-1 margin-1'>
      <Grid container spacing={24} direction='row' alignItems='stretch' >
        <Grid item xs={4}>
          <Typography>{comment.comment}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CommentCard
