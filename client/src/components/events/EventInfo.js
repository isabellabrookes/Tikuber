import React from 'react'
import Typography from '../../../node_modules/@material-ui/core/Typography/Typography'
import Moment from 'react-moment'

const EventInfo = (props) => {
  const { event, description} = props
  const startDate = event && <Moment format="DD/MM/YYYY">{event.startDate}</Moment>
  const endDate = event && <Moment format="DD/MM/YYYY">{event.endDate}</Moment>
  const startTime = event && <Moment format="HH:mm">{event.startDate}</Moment>
  const endTime = event && <Moment format="HH:mm">{event.endDate}</Moment>
  return (
    <div>
      <div className='Details-Paper-Inner-Div'>
        <Typography gutterBottom variant="display1" component="h1">{event.name}</Typography>
        <Typography variant="title">{event.venue.name}</Typography>
        <Typography gutterBottom variant="subheading" component="h3"> {startTime}, {startDate} - {endTime}, {endDate} </Typography>
        <Typography component="p">{description}</Typography>
      </div>
    </div>
  )
}

export default EventInfo
