import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import Moment from 'react-moment'
import {handleImageUpload} from '../../lib/APIcalls'
import {userId} from '../../jwt'
import TextField from '@material-ui/core/TextField/TextField'
import Input from '@material-ui/core/Input/Input'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import EuroSymbol from '@material-ui/icons/EuroSymbol'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid'



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
      <form id="TicketForm" onSubmit={this.handleSubmit} className='centered-flex-column' >
        <Grid container justify='space-around' spacing={24}>
            {this.state.image === "" ? (
              <Grid item xs={12} className='centered-flex-column'>
              <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
                <Typography>Drop an image or click to select a file to upload.</Typography>
              </Dropzone>
              </Grid>
                ):(
              <Grid item xs={12} className='centered-flex-column'>
                <img src={this.state.image} alt="ticket image"/>
              </Grid>
                )}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="select-event"
                label="Select Event"
                select
                value={this.state.event}
                onChange={this.handleChange('event')}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {events && Object.values(events).map(event => (
                  <MenuItem key={event.id} value={event}>
                    <Moment format="YYYY/MM/DD" style={{marginRight: "1em"}}>{event.startDate}</Moment> {event.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                id="price"
                type="number"
                value={this.state.price}
                onChange={this.handleChange('price')}
                InputLabelProps={{
                  shrink: true,
                }}
                startAdornment={<InputAdornment position="start"><EuroSymbol /></InputAdornment>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="description"
                label="Reason for Selling"
                multiline
                rowsMax="4"
                value={this.state.description}
                error={!!(this.state.description && this.state.description.length < 20)}
                onChange={this.handleChange('description')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className='centered-flex-column width-100'>
            <Button className='width-100' variant="raised" color="secondary">Submit</Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapStateToProps = state => ({
events: state.events === null ? null : Object.values(state.events).sort((a, b) => new Date(b.startDate) - new Date(a.endDate)),
user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)]
})

export default connect(mapStateToProps)(TicketForm)
