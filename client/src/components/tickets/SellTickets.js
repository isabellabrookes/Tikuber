import React, {Component} from 'react'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper/Paper'
import TicketsForm from './TicketForm'
import Typography from '@material-ui/core/Typography/Typography'
import {createTicket} from '../../actions/tickets'
import {Redirect} from 'react-router'

class SellTickets extends Component {
  handleSubmit = (data) => {
    this.props.createTicket(data.price, data.description, data.image, data.sellerUser)
  }
  render() {
    const { authenticated } = this.props
    if (authenticated === false) return (
			<Redirect to="/" />
		)

    return (
      <Paper className='Details-Paper padding-1 margin-1'>
        <Typography gutterBottom variant="display1" component="h1">Sell Tickets</Typography>
        <TicketsForm onSubmit={this.handleSubmit} />
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null
})

export default connect(null, {createTicket})(SellTickets)
