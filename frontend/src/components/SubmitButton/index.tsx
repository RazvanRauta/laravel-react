/**
 *  @author: Razvan Rauta
 *  Date: Nov 03 2020
 *  Time: 11:48
 */

import { Button, CircularProgress } from '@material-ui/core'

import React from 'react'

interface Props {
  disabled: boolean
  isSubmitting: boolean
  title?: string
}

const SubmitButton: React.FC<Props> = ({ disabled, isSubmitting, title }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      disabled={disabled}
    >
      {!isSubmitting ? (
        title ?? 'Submit'
      ) : (
        <CircularProgress size={20} color="secondary" />
      )}
    </Button>
  )
}

export default SubmitButton
