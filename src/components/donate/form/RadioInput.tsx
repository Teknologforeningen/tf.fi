import { InputHTMLAttributes } from 'react'

interface RadioInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const RadioInput = ({ label, ...props }: RadioInputProps) => (
  <div className="border rounded-sm p-2 mt-4">
    <input type="radio" {...props} />
    {label && (
      <label htmlFor={props.id} className="pl-4">
        {label}
      </label>
    )}
  </div>
)

export default RadioInput
