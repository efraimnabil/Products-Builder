import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
}

const Button = ({className, children, ...rest}: IProps) => {
  return (
    <button className={`w-full rounded-lg text-white px-3 py-3 duration-200 font-medium ${className}`} {...rest} >
        {children}
    </button>
  )
}

export default Button