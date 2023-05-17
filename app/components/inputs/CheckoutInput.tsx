import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiWon } from 'react-icons/bi'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  grid?: string
  htmlFor?: string
  required?: boolean
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
  required,
  grid,
  errors,
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
          {...register(id, { required })}
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
      </div>
    </div>
  )
}

export default CheckoutInput
