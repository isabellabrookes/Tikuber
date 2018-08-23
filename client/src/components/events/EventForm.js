import React, {Component} from 'react'
import {userId} from '../../jwt'
import connect from 'react-redux/es/connect/connect'
import {handleImageUpload} from '../../lib/APIcalls'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography/Typography'
import FormControl from '@material-ui/core/FormControl/FormControl'
import TextField from '@material-ui/core/TextField/TextField'
import Grid from '@material-ui/core/Grid/Grid'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import Button from '@material-ui/core/Button/Button'

class EventForm extends Component {
  state = {
    image: ""
  }
  handleSubmit = async (e) => {
    e.preventDefault()
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
    const {venues} = this.props
    return (
      <form id="EventForm" onSubmit={this.handleSubmit} className='centered-flex-column' noValidate>
        <Grid container justify='space-around' style={{marginTop:'1em'}} spacing={24}>
        {this.state.image === "" ? (
        <Grid item xs={12} className='centered-flex-column'>
          <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}
          >
            <Typography>Drop an image or click to select a file to upload.</Typography>
          </Dropzone>
        </Grid>
        ):(
        <Grid item xs={12} className='centered-flex-column'>
          <img src={this.state.image} alt="event image"/>
        </Grid>
        )}

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="name"
                label="Name of Event"
                rowsMax="4"
                value={this.state.name}
                error={!!(this.state.name && this.state.name.name < 2)}
                onChange={this.handleChange('name')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
            id="startDate"
            label="Start Date and Time"
            type="datetime-local"
            defaultValue="2018-08-24T19:00"
            value={this.state.startDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('startDate')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
            id="endDate"
            label="End Date and Time"
            type="datetime-local"
            defaultValue="2018-08-24T23:00"
            value={this.state.endDate}
            InputLabelProps={{
            shrink: true,
          }}
            onChange={this.handleChange('endDate')}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="description"
                label="Description of Event"
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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
              id="select-venue"
              label="Select Venue"
              select
              value={this.state.venue}
              onChange={this.handleChange('venue')}
              InputLabelProps={{
                shrink: true,
              }}
              >
                {venues && Object.values(venues).map(venue => (
                  <MenuItem key={venue.id} value={venue}>
                    {venue.name}
                  </MenuItem>
                ))}
              </TextField>
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
  venues: state.venues,
  user: state.currentUser && state.users && state.users[userId(state.currentUser.jwt)]
})

export default connect(mapStateToProps)(EventForm)
