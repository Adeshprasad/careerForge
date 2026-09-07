import "./Sidebar.css";

function Sidebar({
    currentView,
    setCurrentView,
    onLogout
}) {
    return (
        <aside className="sidebar">

            {/* Brand */}

            <div className="sidebar-brand">

                <button
                    type="button"
                    className="sidebar-logo"
                    onClick={() =>
                        setCurrentView("dashboard")
                    }
                    aria-label="Go to Dashboard"
                >
                    CF
                </button>

                <div>
                    <h2>
                        CareerForge
                    </h2>

                    <span>
                        Career tracker
                    </span>
                </div>

            </div>


            {/* Navigation */}

            <nav className="sidebar-nav">

                {/* Overview */}

                <div className="sidebar-section">

                    <p className="sidebar-section-title">
                        OVERVIEW
                    </p>


                    <button
                        type="button"
                        className={`sidebar-link ${currentView === "dashboard"
                                ? "active"
                                : ""
                            }`}
                        onClick={() =>
                            setCurrentView("dashboard")
                        }
                    >
                        <span className="sidebar-icon">
                            ▣
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </button>


                    <button
                        type="button"
                        className={`sidebar-link ${currentView === "analytics"
                                ? "active"
                                : ""
                            }`}
                        onClick={() =>
                            setCurrentView("analytics")
                        }
                    >
                        <span className="sidebar-icon">
                            ◫
                        </span>

                        <span>
                            Analytics
                        </span>
                    </button>

                </div>


                {/* Workspace */}

                <div className="sidebar-section">

                    <p className="sidebar-section-title">
                        WORKSPACE
                    </p>


                    <button
                        type="button"
                        className={`sidebar-link ${currentView === "applications"
                                ? "active"
                                : ""
                            }`}
                        onClick={() =>
                            setCurrentView("applications")
                        }
                    >
                        <span className="sidebar-icon">
                            ▤
                        </span>

                        <span>
                            Applications
                        </span>
                    </button>


                    <button
                        type="button"
                        className={`sidebar-link ${currentView === "add"
                                ? "active"
                                : ""
                            }`}
                        onClick={() =>
                            setCurrentView("add")
                        }
                    >
                        <span className="sidebar-icon">
                            ＋
                        </span>

                        <span>
                            Add Application
                        </span>
                    </button>

                </div>

            </nav>


            {/* Flexible space */}

            <div className="sidebar-spacer"></div>


            {/* Small product message */}

            <div className="sidebar-insight">

                <div className="sidebar-insight-icon">
                    ✦
                </div>

                <div>

                    <strong>
                        Keep moving
                    </strong>

                    <p>
                        Every application is a step forward.
                    </p>

                </div>

            </div>


            {/* Bottom navigation */}

            <div className="sidebar-bottom">

                <button
                    type="button"
                    className={`sidebar-link ${currentView === "settings"
                            ? "active"
                            : ""
                        }`}
                    onClick={() =>
                        setCurrentView("settings")
                    }
                >
                    <span className="sidebar-icon">
                        ⚙
                    </span>

                    <span>
                        Settings
                    </span>
                </button>


                <button
                    type="button"
                    className="sidebar-link logout-link"
                    onClick={onLogout}
                >
                    <span className="sidebar-icon">
                        ↪
                    </span>

                    <span>
                        Logout
                    </span>
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;