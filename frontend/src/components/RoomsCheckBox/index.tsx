/**
 *  @author: Razvan Rauta
 *  Date: Oct 22 2020
 *  Time: 19:16
 */

import { Checkbox, FormControlLabel } from '@material-ui/core'

import React from 'react'
import { useField } from 'formik'

interface CheckBoxProps {
  onBlur: (event: React.FocusEvent<HTMLSpanElement>) => void
  name: string
  label: string
}

const RoomsCheckBox: React.FC<CheckBoxProps> = ({ name, label, onBlur }) => {
  const [field, meta, helpers] = useField(name)

  const { value } = meta
  const { setValue } = helpers

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked)
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={handleChange}
          name={field.name}
          color="secondary"
          onBlur={onBlur}
        />
      }
      label={label}
    />
  )
}

export default RoomsCheckBox
