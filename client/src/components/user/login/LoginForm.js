import React, {PureComponent} from 'react'
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'
import FormControl from '@material-ui/core/FormControl/FormControl'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Input from '@material-ui/core/Input/Input'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {Redirect} from 'react-router-dom'
import Paper from '@material-ui/core/Paper/Paper'

class LoginForm extends PureComponent {
	state = {
    showPassword: false,
  }

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
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
		  <Paper className='Details-Paper padding-1' style={{height: '30vh'}}>
        <form id='LoginForm' onSubmit={this.handleSubmit} className={'height-100 centered-flex-column'}>
            <FormControl fullWidth>
            <TextField
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              InputLabelProps={{
                shrink: true,
              }}
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
            <Button className='width-100' variant="contained" color="secondary" type="submit">Login</Button>
        </form>
      </Paper>
		)
	}
}


export default LoginForm
