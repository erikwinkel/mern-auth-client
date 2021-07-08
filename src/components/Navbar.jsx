import { Link } from 'react-router-dom'

export default function Navbar(props) {
    return (
        <nav>
            <Link to="/">
                home
            </Link>
            {/* if user is logged in */}
            <Link to="/profile">
                profile
            </Link>
            <Link to="/">
                <span onClick={props.handleLogout}>logout</span>
            </Link>
            {/* if the user is logged out */}
            <Link to="/login">
                login
            </Link>
            <Link to="/register">
                register
            </Link>
        </nav>
    )
}