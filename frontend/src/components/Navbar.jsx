function Navbar(props) {
    return (
        <nav>
            <h2>{props.title}</h2>

            <button onClick={props.onLogout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;