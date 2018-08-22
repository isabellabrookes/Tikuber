import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/Loading'
import NotFound from '../app-layout/NotFound'
import TicketCard from '../tickets/TicketCard'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Moment from 'react-moment'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card/Card'
import Button from '../../../node_modules/@material-ui/core/Button/Button'

class EventDetails extends Component {

  render() {
    const { event } = this.props
    // const startDate = <Moment format="DD/MM/YYYY">{event.startDate}</Moment>
    const endDate = event && <Moment format="DD/MM/YYYY">{event.endDate}</Moment>
    const startTime = event && <Moment format="HH:mm">{event.startDate}</Moment>
    const endTime = event && <Moment format="HH:mm">{event.endDate}</Moment>
    return (
      <div>
        {event === null && <Loading />}
        {!event && <NotFound message={`Event ${this.props.match.params.id}`}/>}
        {event &&
        <Grid
          container
          spacing={8}>
          <Grid item xs={8}>
            <Paper className='Details-Paper'>
              <img src={event.image} />
              <div className='Details-Paper-Inner-Div'>
                <Typography gutterBottom variant="display1" component="h1">{event.name}</Typography>
                <Typography variant="title">{event.venue.name}</Typography>
                <Typography gutterBottom variant="subheading" component="h3"> {startTime} - {endTime}, {endDate} </Typography>
                <Typography component="p">{event.description}</Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className='Details-Paper'>
              {event.tickets.length ? event.tickets.map(ticket => <TicketCard ticket={ticket}/>) : <Card className='centered-flex' style={{padding: '1em', height:'100vh'}}>
                <Typography variant="title" style={{color: 'red'}}>No tickets for sale currently, sell yours!</Typography>
                <Button href={'/sell'} variant="contained" color="secondary">
                  Sell Tickets
                </Button>
              </Card>}
            </Paper>
          </Grid>
        </Grid>
        }
      </div>
    )
  }
}

const mapPropsToState = (state, props) => ({
  event: state.events && state.events[props.match.params.id]
})

export default connect(mapPropsToState)(EventDetails)
