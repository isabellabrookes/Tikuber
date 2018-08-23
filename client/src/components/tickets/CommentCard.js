import React from 'react'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import {getCommentUser} from '../../lib/APIcalls'

const user = (user) => {
  console.log(user)
}

const CommentCard = (props) => {
  const { comment } = props
  getCommentUser(comment.id, user)
  return (
    <Card className='padding-1 margin-1'>
      <Grid container spacing={24} direction='row' alignItems='stretch' >
        <Grid item xs={4}>
          <Typography>{comment.id}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default (CommentCard)
