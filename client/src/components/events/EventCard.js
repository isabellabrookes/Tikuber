import React from 'react'
import './EventList.css'
import EventInfo from './EventInfo'
import Card from '@material-ui/core/Card/Card'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import CardActions from '@material-ui/core/CardActions/CardActions'
import Button from '@material-ui/core/Button/Button'
import Typography from '@material-ui/core/Typography/Typography'

const EventCard = (props) => {
  const {event} = props
  const dateClass = new Date() > new Date(event.endDate) ? 'Event-Finished' : 'Event-Live'
  const description = event.description.substring(0,100)+'...'
  return (
    <Card className={`EventList-Card ${dateClass}`}>
      <CardMedia className='EventList-Card-Image'
        component="img"
        image={event.image}
        title={event.name}
      />
      <div className='EventList-Card-Inner-Div'>
        <CardContent>
            <EventInfo event={event} description={description}/>
        </CardContent>
        {dateClass === 'Event-Live' ? (<CardActions className='EventList-Card-Buttons'>
          <Button href={`/events/${event.id}`} size="small"  color="default">See Event</Button>
          <Button href={`/tickets/sell`} eventId={event.id} size="small" color="primary">Sell Tickets</Button>
          <Button href={`/events/${event.id}/tickets`} size="small" color="secondary">Buy Tickets</Button>
        </CardActions>): <Typography color='secondary' style={{padding: '1em', textAlign: 'center'}}>Event Has Finished</Typography>}
      </div>
    </Card>
  )
}

export default EventCard
