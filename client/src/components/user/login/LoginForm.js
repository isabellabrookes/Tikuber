import React, {PureComponent} from 'react'
import {withStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'
import FormControl from '@material-ui/core/FormControl/FormControl'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Input from '@material-ui/core/Input/Input'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    color: 'white',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
})

class LoginForm extends PureComponent {
	state = {
    showPassword: false,
  }

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  handleMouseDownPassword = event => {
  };

  handleClickShowPassword = (e) => {
    e.preventDefault()
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

	render() {
    const { classes } = this.props
		return (
			<form className={classes.container} id='LoginForm' onSubmit={this.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
        />
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {/*<div>*/}
					{/*<label htmlFor="email">Email</label>*/}
					{/*<input type="email" name="email" id="email" value={*/}
						{/*this.state.email || ''*/}
					{/*} onChange={ this.handleChange } />*/}
				{/*</div>*/}

				{/*<div>*/}
					{/*<label htmlFor="password">Password</label>*/}
					{/*<input type="password" name="password" id="password" value={*/}
						{/*this.state.password || ''*/}
					{/*} onChange={ this.handleChange } />*/}
				{/*</div>*/}
        <Button variant="contained" type="submit">Login</Button>
				{/*<button type="submit">Login</button>*/}
			</form>
		)
	}
}


export default withStyles(styles)(LoginForm);
