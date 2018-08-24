import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../app-layout/errors/Loading'
import NotFound from '../app-layout/errors/NotFound'
import EventInfo from '../events/EventInfo'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import AccountIcon from '@material-ui/icons/AccountCircle'
import EuroSymbol from '@material-ui/icons/EuroSymbol'
import Warning from '@material-ui/core/es/internal/svg-icons/Warning'
import Button from '../../../node_modules/@material-ui/core/Button/Button'
import {averageTicketPrice, calculateRiskFactor} from '../../lib/FraudRiskAlgorithm'
import CommentCard from './CommentCard'
import Card from '@material-ui/core/Card/Card'
import CommentForm from './CommentForm'
import {userId} from '../../jwt'
import {createComment} from '../../actions/comments'

class TicketPage extends Component {
  handleSubmit = (data) => {
    this.props.createComment(data.comment, data.ticket, data.user)
  }
  render() {
    const { ticket, tickets, eventsTickets, authenticated, user } = this.props
    const risk = ticket && tickets && eventsTickets && calculateRiskFactor(ticket, tickets, eventsTickets)
    return (
      <div className='Container-Div'>
        {ticket === null && <Loading />}
        {!ticket && <NotFound message={`Ticket ${this.props.match.params.id}`}/>}
        {ticket && tickets && eventsTickets &&
          <Grid container spacing={8} alignItems="stretch" >
            <Grid item xs={12} sm={6} >
              <Card className='height-100'>
              <img src={ticket.image} alt={`ticket for sale for ${ticket.event.name}`} style={{minWidth:"50vw"}}/>
              <div className='padding-1 centered-flex-column'>
              <Typography gutterBottom variant="display1" component="h1"> <AccountIcon />{ticket.sellerUser.firstName}</Typography>
              <Typography gutterBottom variant="display1" component="h1" className={`${risk.riskClass}-risk`}> <Warning />Risk: {risk.riskFactor}%</Typography>
              <Typography gutterBottom variant="display1" component="h1" color='primary'> <EuroSymbol />{ticket.price}</Typography>
                <div className='centered-flex-column'><Button className='width-100' onClick={()=>window.open(`https://bunq.me/isabella/${ticket.price}`)} variant='contained' color='secondary'>Buy</Button></div>
              </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className='height-100'>
              <img src={ticket.event.image} alt={`ticket for sale for ${ticket.event.name}`} style={{minWidth:"50vw"}}/>
              <EventInfo event={ticket.event} description={''}/>
              <Typography className='padding-1'>Average Price of Tickets: €{averageTicketPrice(eventsTickets)}</Typography>
              <div className='padding-1 centered-flex-column'><Button className='width-100' href={`/events/${ticket.event.id}`} variant='contained' color='primary'>Back to Event</Button></div>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction='column' spacing={8}>
              <Typography gutterBottom variant="display1" component="h1" style={{textAlign: 'center'}}>Comments</Typography>
                {ticket.comments.map(comment => <Grid item key={comment.id}><CommentCard comment={comment} /></Grid>)}
              </Grid>
            </Grid>
            {authenticated && <Grid item xs={12}>
              <CommentForm ticket={ticket} user={user} onSubmit={this.handleSubmit}/>
            </Grid>}
          </Grid>
        }
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)],
  tickets: state.tickets,

  eventsTickets: state.tickets && state.events && Object.values(state.tickets).filter(ticket => ticket.event.id === state.tickets[props.match.params.id].event.id),
})

export default connect(mapStateToProps, {createComment})(TicketPage)
