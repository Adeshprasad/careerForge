import "./Sidebar.css";

function Sidebar({
    currentView,
    setCurrentView,
    onLogout
}) {

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <div className="sidebar-logo">
                    CF
                </div>

                <div>
                    <h2>
                        CareerForge
                    </h2>

                    <span>
                        Career tracker
                    </span>
                </div>

            </div>


            <div className="sidebar-section">

                <p className="sidebar-section-title">
                    OVERVIEW
                </p>

                <button
                    className={`sidebar-link ${
                        currentView === "dashboard"
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

                    Dashboard
                </button>


                <button
                    className={`sidebar-link ${
                        currentView === "analytics"
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

                    Analytics
                </button>

            </div>


            <div className="sidebar-section">

                <p className="sidebar-section-title">
                    WORKSPACE
                </p>

                <button
                    className={`sidebar-link ${
                        currentView === "applications"
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

                    Applications
                </button>


                <button
                    className={`sidebar-link ${
                        currentView === "add"
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

                    Add Application
                </button>

            </div>


            <div className="sidebar-spacer"></div>


            <div className="sidebar-bottom">

                <button
                    className="sidebar-link"
                >
                    <span className="sidebar-icon">
                        ⚙
                    </span>

                    Settings
                </button>


                <button
                    className="sidebar-link logout-link"
                    onClick={onLogout}
                >
                    <span className="sidebar-icon">
                        ↪
                    </span>

                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;