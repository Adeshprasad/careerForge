import "./Navbar.css";

function Navbar(props) {
    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <h2>{props.title}</h2>
            </div>

            <div className="navbar-actions">

                <button
                    className="theme-toggle"
                    onClick={() =>
                        props.setTheme(
                            props.theme === "dark"
                                ? "light"
                                : "dark"
                        )
                    }
                    aria-label="Toggle theme"
                >
                    {props.theme === "dark" ? "☀️" : "🌙"}
                </button>

                <button
                    className="logout-button"
                    onClick={props.onLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;