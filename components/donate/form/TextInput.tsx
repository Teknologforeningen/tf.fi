import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type?: 'text' | 'email' | 'number'
}

const TextInput = ({ label, type = 'text', ...props }: TextInputProps) => (
  <>
    {label && (
      <label htmlFor={props.id} className="pt-4 italic">
        {label}
      </label>
    )}
    <input type={type} {...props} className={classNames('border rounded-sm p-2', props.className)} />
  </>
)

export default TextInput
