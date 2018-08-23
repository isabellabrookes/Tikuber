import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import Moment from 'react-moment'
import {handleImageUpload} from '../../lib/ImageUploads'
import {userId} from '../../jwt'
import TextField from '@material-ui/core/TextField/TextField'
import Input from '@material-ui/core/Input/Input'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import EuroSymbol from '@material-ui/icons/EuroSymbol'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Typography from '@material-ui/core/Typography/Typography'



class TicketForm extends Component {
  state = {
    image: "",
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    await this.setState({
      sellerUser: this.props.user.id
    })
    this.props.onSubmit(this.state)
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  onImageDrop = files => {
  const cloudinaryPreset = 'nkcm4yci'

    handleImageUpload(files[0], cloudinaryPreset, (imageURL)=>{
      this.setState({
        image: imageURL
      })
    })
  }


  render() {
    const {events} = this.props
    return (
      <form id="TicketForm" onSubmit={this.handleSubmit}>
    {/*Price, description, image, sellerUser, event */}
        <FormControl fullWidth>
          <TextField
          id="select-event"
          label="Select Event"
          select
          value={this.state.event}
          onChange={this.handleChange('event')}
          margin="normal"
          >
            {events && Object.values(events).map(event => (
              <MenuItem key={event.id} value={event}>
                <Moment format="YYYY/MM/DD" style={{marginRight: "1em"}}>{event.startDate}</Moment> {event.name}
              </MenuItem>
            ))}
          </TextField>
          </FormControl>
          {this.state.image === "" ? (
            <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
              <Typography>Drop an image or click to select a file to upload.</Typography>
            </Dropzone>
              ):(
              <img src={this.state.image} alt="ticket image"/>
              )}
        <FormControl fullWidth>
          <InputLabel htmlFor="price">Price</InputLabel>
          <Input
            id="price"
            type="number"
            value={this.state.price}
            onChange={this.handleChange('price')}
            margin="normal"
            startAdornment={<InputAdornment position="start"><EuroSymbol /></InputAdornment>}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="description"
            label="Reason for Selling"
            multiline
            rowsMax="4"
            value={this.state.description}
            error={!!(this.state.description && this.state.description.length < 20)}
            onChange={this.handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </form>
    )
  }
}

const mapStateToProps = state => ({
events: state.events === null ? null : Object.values(state.events).sort((a, b) => new Date(b.startDate) - new Date(a.endDate)),
user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)]
})

export default connect(mapStateToProps)(TicketForm)
