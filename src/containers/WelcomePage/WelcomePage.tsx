/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import { Typography } from '@material-ui/core'

const WelcomePage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.background} justify='center' spacing={4}>
      <Grid item xs={12} className={classes.header}>
        <Typography color='textPrimary' variant='h2'>
          RDF converter
        </Typography>
      </Grid>
    </Grid>
  )
}

export default WelcomePage
