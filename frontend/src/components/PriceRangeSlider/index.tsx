/**
 *  @author: Razvan Rauta
 *  Date: Oct 22 2020
 *  Time: 18:35
 */

import { Slider, Typography } from '@material-ui/core'

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useField } from 'formik'

interface PriceRangeProps {
  name: string
  id: string
  label: string
}

const useStyles = makeStyles({
  root: {
    width: 300,
  },
})

const PriceRangeSlider: React.FC<PriceRangeProps> = ({ name, id, label }) => {
  const classes = useStyles()
  const [field, meta, helpers] = useField(name)

  const { value } = meta
  const { setValue } = helpers

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <div className={classes.root}>
      <Typography id={id} gutterBottom>
        {label}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        name={field.name}
        color="secondary"
        valueLabelDisplay="on"
        aria-labelledby={id}
        min={10}
        step={10}
        max={2000}
      />
    </div>
  )
}

export default PriceRangeSlider
