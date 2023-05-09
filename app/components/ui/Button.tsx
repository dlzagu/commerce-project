import { FunctionComponent } from 'react'

import styles from './styles.module.scss'

type ButtonProps = {
  onClick?: () => void
  variant?: 'contained' | 'outline' | 'text'
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  color?:
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
  fullWidth?: boolean
  classes?: string
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  variant = 'contained',
  children,
  size = 'medium',
  disabled = false,
  color,
  fullWidth = false,
  classes = '',
}) => {
  return (
    <button
      type="button"
      className={`
        ${styles.button}
        ${classes}
        ${styles[variant]}
        ${styles[size]}
        ${color && styles[color]}
        ${fullWidth ? styles.fullWidth : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
