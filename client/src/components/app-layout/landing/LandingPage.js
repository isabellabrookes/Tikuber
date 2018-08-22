import React, {Component} from 'react'
import './LandingPage.css'
import withStyles from '@material-ui/core/es/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import Button from '@material-ui/core/Button/Button'

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
})

class LandingPage extends Component {
  render() {
    const {classes} = this.props

    return (
      <div id={'LandingPage-Main'}>
        {/*Hero Unit*/}
        <div className={'heroUnit'}>
          <div className={classes.heroContent}>
            <Typography variant="display3" align="center" color="inherit" gutterBottom>
              Buy and sell tickets with locals in your area
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button href={'/events'} variant="contained" color="primary">
                    See Events
                  </Button>
                </Grid>
                <Grid item>
                  <Button href={'/sell'} variant="contained" color="secondary">
                    Sell Tickets
                  </Button>
                </Grid>
                <Grid item>
                  <Button href={'/tickets'} variant="contained" color="primary">
                    Find Tickets
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(LandingPage)

