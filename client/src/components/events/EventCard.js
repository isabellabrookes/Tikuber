import React from 'react'
import Moment from 'react-moment'
import './EventList.css'
import Card from '@material-ui/core/Card/Card'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import CardActions from '@material-ui/core/CardActions/CardActions'
import Button from '@material-ui/core/Button/Button'

const EventCard = (props) => {
  const {event} = props
  const startDate = <Moment format="DD/MM/YYYY">{event.startDate}</Moment>
  const endDate = <Moment format="DD/MM/YYYY">{event.endDate}</Moment>
  const startTime = <Moment format="HH:mm">{event.startDate}</Moment>
  const endTime = <Moment format="HH:mm">{event.endDate}</Moment>
  const description = event.description.substring(0,100)+'...'
  return (
    <Card className='EventList-Card'>
      <CardMedia className='EventList-Card-Image'
        component="img"
        image={event.image}
        title={event.name}
      />
      <div className='EventList-Card-Inner-Div'>
        <CardContent>
          <Typography gutterBottom variant="display1" component="h1">{event.name}</Typography>
          <Typography variant="title">{event.venue.name}</Typography>
          <Typography gutterBottom variant="subheading" component="h3"> {startTime} - {endTime}, {endDate} </Typography>
          <Typography component="p">{description}</Typography>
        </CardContent>
        <CardActions className='EventList-Card-Buttons'>
          <Button href={`/events/${event.id}`} size="small"  color="default">See Event</Button>
          <Button href={`/sell`} eventId={event.id} size="small" color="primary">Sell Tickets</Button>
          <Button href={`/events/${event.id}/tickets`} size="small" color="secondary">Buy Tickets</Button>
        </CardActions>
      </div>
    </Card>
  )
}

export default EventCard
