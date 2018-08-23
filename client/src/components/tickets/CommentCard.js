import React from 'react'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid/Grid'

const CommentCard = (props) => {
  const { comment } = props
  return (
    <Card className='padding-1 margin-1'>
      <Grid container spacing={24} direction='row' alignItems='stretch' >
        <Grid item xs={12}>
          <p>This is comment {comment.id}</p>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CommentCard
