import React, {Component} from 'react'
import {connect} from 'react-redux'

class EventDetails extends Component {

  render() {
    const { event } = this.props
    console.log(event)
    return (
      <div>
        {this.props.event.name}
      </div>
    )
  }
}

const mapPropsToState = (state, props) => ({
  events: state.events,
  event: props.events && props.events[props.match.params.id]
})

export default connect(mapPropsToState)(EventDetails)
