import React, {PureComponent} from 'react'
import Paper from '@material-ui/core/Paper/Paper'
import FormControl from '@material-ui/core/FormControl/FormControl'
import TextField from '@material-ui/core/TextField/TextField'
import {Redirect} from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Input from '@material-ui/core/Input/Input'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/core/SvgIcon/SvgIcon'
import Button from '@material-ui/core/Button/Button'

export default class SignupForm extends PureComponent {
	state = {
    showPassword: false,
  }

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
    return (<Redirect to="/login" />)
	}

	handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleClickShowPassword = (e) => {
    e.preventDefault()
    this.setState(state => ({ showPassword: !state.showPassword }))
    return (<Redirect to="/" />)
  }

	render() {
		return (
      <Paper className='Details-Paper padding-1' style={{height: '50vh'}}>
        <form id='SignupForm' onSubmit={this.handleSubmit}>
          <FormControl fullWidth>
            <TextField
              id="firstName"
              label="First Name"
              value={this.state.firstName}
              onChange={this.handleChange("firstName")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="lastName"
              label="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange("lastName")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange("password")}
              InputLabelProps={{
                shrink: true,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="adornment-password">Confirm Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.confirmPassword}
              onChange={this.handleChange("confirmPassword")}
              InputLabelProps={{
                shrink: true,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {
            this.state.password &&
            this.state.confirmPassword &&
            this.state.password !== this.state.confirmPassword &&
            <p style={{color:'red'}}>The passwords do not match!</p>
          }

          <Button className='width-100' variant="contained" color="secondary" type="submit">Sign Up</Button>

        </form>
      </Paper>
		)
	}
}
