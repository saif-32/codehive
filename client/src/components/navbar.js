import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
    <div className="navbar">
        <Link to="/"> Home </Link>
        <Link to="/register"> Register </Link>
        <Link to="/login"> Login </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="/discover"> Discover </Link>

    </div>
    )
}