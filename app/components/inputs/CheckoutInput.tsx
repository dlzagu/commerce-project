import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  RegisterOptions,
} from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  grid?: string
  htmlFor?: string
  message?: string
  required?: boolean
  validation?: RegisterOptions
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  autoComplete?: string
}

const CheckoutInput: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  htmlFor,
  register,
  validation = {}, //default
  required,
  grid,
  errors,
  message,
  autoComplete,
}) => {
  return (
    <div className={` ${grid}`}>
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium  ${
          errors[id] ? 'text-rose-500' : 'text-gray-700'
        }
        `}
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required, ...validation })}
          placeholder=" "
          autoComplete={autoComplete}
          type={type}
          className={`
          block w-full 
          border-gray-300 
          rounded-md 
          shadow-sm 
          focus:ring-indigo-500 
          focus:border-indigo-500 
          sm:text-sm
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
        />
        {message && (
          <p className="text-sm text-rose-500 mb-1 mt-1">{message}</p>
        )}
        {errors[id] && (
          <p className="text-sm text-rose-500">{String(errors[id]?.message)}</p>
        )}
      </div>
    </div>
  )
}

export default CheckoutInput
