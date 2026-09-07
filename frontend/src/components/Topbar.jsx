import "./Topbar.css";

function Topbar({
    theme,
    setTheme,
    onLogout,
    user
}) {
    const userName = user?.name || "User";

    const userInitial = userName
        .charAt(0)
        .toUpperCase();

    return (
        <header className="topbar">

            <div className="topbar-mobile-brand">

                <div className="sidebar-logo">
                    CF
                </div>

                <strong>
                    CareerForge
                </strong>

            </div>


            <div className="topbar-actions">

                <button
                    type="button"
                    className="topbar-theme"
                    onClick={() =>
                        setTheme(
                            theme === "dark"
                                ? "light"
                                : "dark"
                        )
                    }
                    aria-label="Toggle theme"
                    title={
                        theme === "dark"
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                >
                    {theme === "dark"
                        ? "☀️"
                        : "🌙"}
                </button>


                <div className="topbar-user">

                    <div className="topbar-avatar">
                        {userInitial}
                    </div>

                    <span>
                        {userName}
                    </span>

                </div>


                <button
                    type="button"
                    className="topbar-logout"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Topbar;