import { Link } from "react-router-dom"
import './Button.scss'

interface ButtonProps {
  children: string,
  to: string
}

function Button({children, to}: ButtonProps) {
  return (
    <Link className='link-button' to={to}>
      {children}
    </Link>
  );
}

export default Button;