import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField/TextField'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Card from '@material-ui/core/Card/Card'
import Button from '@material-ui/core/Button/Button'

class CommentForm extends Component {
  state = {}

  handleSubmit = async (e) => {
    e.preventDefault()
    await this.setState({
      user: this.props.user.id,
      ticket: this.props.ticket
    })
    this.props.onSubmit(this.state)
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  render(){
    const {user} = this.props
    return (
      <Card className='margin-1'>
        <form id="CommentForm" onSubmit={this.handleSubmit} className='centered-flex-column' noValidate>
          <FormControl fullWidth>
            <TextField
              id="comment"
              label="Comment"
              multiline
              rowsMax="4"
              value={this.state.comment}
              error={!!(this.state.comment && this.state.comment.length < 20)}
              onChange={this.handleChange('comment')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <Button type={'submit '}className='width-100' variant="raised" color="secondary">Submit</Button>
        </form>
      </Card>
  )}
}

export default CommentForm
