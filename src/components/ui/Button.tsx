import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
}

const Button = ({className, children, ...rest}: IProps) => {
  return (
    <button className={`w-full text-white p-2 rounded-lg ${className}`} {...rest} >
        {children}
    </button>
  )
}

export default Button