import "./Settings.css";

function Settings({
    theme,
    setTheme,
    user
}) {

    const userName = user?.name || "User";
    const userEmail = user?.email || "No email available";

    return (
        <main className="settings-page">

            <div className="settings-header">

                <div>
                    <p className="settings-eyebrow">
                        PREFERENCES
                    </p>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage your CareerForge preferences.
                    </p>
                </div>

            </div>


            <div className="settings-content">

                {/* Appearance */}

                <section className="settings-section">

                    <div className="settings-section-header">

                        <div>
                            <span className="settings-section-label">
                                APPEARANCE
                            </span>

                            <h2>
                                Theme
                            </h2>

                            <p>
                                Choose how CareerForge looks.
                            </p>
                        </div>

                        <span className="settings-current-theme">
                            {theme === "dark"
                                ? "Dark"
                                : "Light"}
                        </span>

                    </div>


                    <div className="theme-options">

                        <button
                            type="button"
                            className={`theme-option ${
                                theme === "dark"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setTheme("dark")
                            }
                        >

                            <div className="theme-preview dark-preview">

                                <div className="preview-sidebar"></div>

                                <div className="preview-content">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                            </div>


                            <div className="theme-option-info">

                                <div>
                                    <strong>
                                        Dark
                                    </strong>

                                    <span>
                                        Deep and easy on the eyes
                                    </span>
                                </div>

                                <span className="theme-check">
                                    {theme === "dark"
                                        ? "✓"
                                        : ""}
                                </span>

                            </div>

                        </button>


                        <button
                            type="button"
                            className={`theme-option ${
                                theme === "light"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setTheme("light")
                            }
                        >

                            <div className="theme-preview light-preview">

                                <div className="preview-sidebar"></div>

                                <div className="preview-content">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                            </div>


                            <div className="theme-option-info">

                                <div>
                                    <strong>
                                        Light
                                    </strong>

                                    <span>
                                        Clean and bright
                                    </span>
                                </div>

                                <span className="theme-check">
                                    {theme === "light"
                                        ? "✓"
                                        : ""}
                                </span>

                            </div>

                        </button>

                    </div>

                </section>


                {/* Account */}

                <section className="settings-section">

                    <div className="settings-section-header">

                        <div>
                            <span className="settings-section-label">
                                ACCOUNT
                            </span>

                            <h2>
                                Your account
                            </h2>

                            <p>
                                Information associated with your CareerForge account.
                            </p>
                        </div>

                    </div>


                    <div className="account-card">

                        <div className="settings-avatar">
                            {userName
                                .charAt(0)
                                .toUpperCase()}
                        </div>


                        <div className="account-info">

                            <div className="account-field">

                                <span>
                                    NAME
                                </span>

                                <strong>
                                    {userName}
                                </strong>

                            </div>


                            <div className="account-field">

                                <span>
                                    EMAIL
                                </span>

                                <strong>
                                    {userEmail}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


                {/* About */}

                <section className="settings-section about-section">

                    <div className="settings-section-header">

                        <div>
                            <span className="settings-section-label">
                                ABOUT
                            </span>

                            <h2>
                                CareerForge
                            </h2>

                            <p>
                                Your personal career application tracker.
                            </p>
                        </div>

                    </div>


                    <div className="about-card">

                        <div className="about-logo">
                            CF
                        </div>

                        <div>
                            <strong>
                                CareerForge
                            </strong>

                            <span>
                                Track applications. Stay organized. Move forward.
                            </span>
                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default Settings;