import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import AddApplication from "./components/AddApplications";
import Login from "./components/Login";
import Register from "./components/Register";
import ApplicationDetails from "./components/ApplicationDetails";
import Analytics from "./components/Analytics";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardOverview from "./components/DashboardOverview";
import Settings from "./components/Settings";

import "./components/AppShell.css";


function App() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);


    const [company, setCompany] = useState("");

    const [status, setStatus] = useState("");

    const [from, setFrom] = useState("");

    const [to, setTo] = useState("");

    const [sort, setSort] = useState("-createdAt");


    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );


    const [showRegister, setShowRegister] = useState(false);


    const [selectedApplicationId, setSelectedApplicationId] =
        useState(null);


    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );


    const [currentView, setCurrentView] = useState(() => {

        const view =
            window.location.hash.replace("#", "");

        if (
            view === "applications" ||
            view === "analytics" ||
            view === "add" ||
            view === "settings"
        ) {
            return view;
        }

        return "dashboard";
    });


    const [user, setUser] = useState(null);


    /* =========================================
       NAVIGATION
    ========================================= */

    function handleViewChange(view) {

        setCurrentView(view);

        window.history.pushState(
            {},
            "",
            `#${view}`
        );

        setSelectedApplicationId(null);
    }


    /* =========================================
       LOGOUT
    ========================================= */

    function logout() {

        localStorage.removeItem("token");

        setUser(null);

        setIsLoggedIn(false);

        setCurrentView("dashboard");

        setSelectedApplicationId(null);

        window.history.pushState(
            {},
            "",
            "#dashboard"
        );
    }


    /* =========================================
       APPLICATION DETAILS
    ========================================= */

    function handleViewDetails(id) {

        setSelectedApplicationId(id);
    }


    /* =========================================
       FILTERS
    ========================================= */

    function clearFilters() {

        setCompany("");

        setStatus("");

        setFrom("");

        setTo("");

        setSort("-createdAt");

        setPage(1);
    }


    function handleCompanyChange(value) {

        setCompany(value);

        setPage(1);
    }


    function handleStatusChange(value) {

        setStatus(value);

        setPage(1);
    }


    function handleFromChange(value) {

        setFrom(value);

        setPage(1);
    }


    function handleToChange(value) {

        setTo(value);

        setPage(1);
    }


    function handleSortChange(value) {

        setSort(value);

        setPage(1);
    }


    /* =========================================
       UPDATE APPLICATION
    ========================================= */

    async function updateApplication(
        id,
        updatedData
    ) {

        try {

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `http://localhost:3000/applications/${id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        updatedData
                    )
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(data);

                return false;
            }


            await fetchApplications();

            return true;

        } catch (error) {

            console.error(
                "Error updating application:",
                error
            );

            return false;
        }
    }


    /* =========================================
       DELETE APPLICATION
    ========================================= */

    async function deleteApplication(id) {

        try {

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `http://localhost:3000/applications/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            if (!response.ok) {

                console.error(
                    "Failed to delete application"
                );

                return;
            }


            await fetchApplications();

        } catch (error) {

            console.error(
                "Error deleting application:",
                error
            );
        }
    }


    /* =========================================
       LOGIN
    ========================================= */

    async function handleLogin() {

        setApplications([]);

        setPage(1);

        setIsLoggedIn(true);

        await fetchApplications();
    }


    /* =========================================
       FETCH APPLICATIONS
    ========================================= */

    async function fetchApplications() {

        try {

            setLoading(true);

            setError("");


            const token =
                localStorage.getItem("token");


            if (!token) {

                setLoading(false);

                return;
            }


            const response = await fetch(
                `http://localhost:3000/applications?page=${page}&company=${encodeURIComponent(
                    company
                )}&status=${encodeURIComponent(
                    status
                )}&from=${encodeURIComponent(
                    from
                )}&to=${encodeURIComponent(
                    to
                )}&sort=${encodeURIComponent(
                    sort
                )}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            if (!response.ok) {

                if (response.status === 401) {

                    localStorage.removeItem(
                        "token"
                    );

                    setIsLoggedIn(false);

                    return;
                }


                setError(
                    "Failed to load applications"
                );

                setLoading(false);

                return;
            }


            const data =
                await response.json();


            setApplications(
                data.data || []
            );

            setTotalPages(
                data.totalPages || 1
            );

            setLoading(false);

        } catch (error) {

            console.error(error);

            setError(
                "Failed to load applications"
            );

            setLoading(false);
        }
    }


    /* =========================================
       HASH NAVIGATION
    ========================================= */

    useEffect(() => {

        function handleHashChange() {

            const view =
                window.location.hash.replace(
                    "#",
                    ""
                );


            if (
                view === "applications" ||
                view === "analytics" ||
                view === "add" ||
                view === "settings"
            ) {

                setCurrentView(view);

            } else {

                setCurrentView("dashboard");
            }


            setSelectedApplicationId(null);
        }


        window.addEventListener(
            "popstate",
            handleHashChange
        );


        window.addEventListener(
            "hashchange",
            handleHashChange
        );


        return () => {

            window.removeEventListener(
                "popstate",
                handleHashChange
            );

            window.removeEventListener(
                "hashchange",
                handleHashChange
            );
        };

    }, []);


    /* =========================================
       CURRENT USER
    ========================================= */

    useEffect(() => {

        async function fetchCurrentUser() {

            try {

                const token =
                    localStorage.getItem("token");


                if (!token) {
                    return;
                }


                const response = await fetch(
                    "http://localhost:3000/users/me",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    console.error(
                        data.message
                    );

                    return;
                }


                setUser(data.user);

            } catch (error) {

                console.error(
                    "Failed to fetch current user:",
                    error
                );
            }
        }


        if (isLoggedIn) {

            fetchCurrentUser();
        }

    }, [isLoggedIn]);


    /* =========================================
       APPLICATION FETCH
    ========================================= */

    useEffect(() => {

        if (isLoggedIn) {

            fetchApplications();
        }

    }, [
        isLoggedIn,
        page,
        company,
        status,
        from,
        to,
        sort
    ]);


    /* =========================================
       THEME
    ========================================= */

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);


    /* =========================================
       RENDER
    ========================================= */

    return (
        <>

            {!isLoggedIn ? (

                showRegister ? (

                    <Register
                        onRegister={() =>
                            setShowRegister(false)
                        }
                    />

                ) : (

                    <Login
                        onLogin={handleLogin}
                        onRegister={() =>
                            setShowRegister(true)
                        }
                    />

                )

            ) : (

                <div className="app-shell">

                    <Sidebar
                        currentView={currentView}
                        setCurrentView={handleViewChange}
                        onLogout={logout}
                    />


                    <div className="app-main">

                        <Topbar
                            theme={theme}
                            setTheme={setTheme}
                            onLogout={logout}
                            user={user}
                        />


                        <div className="app-content">

                            {selectedApplicationId ? (

                                <ApplicationDetails
                                    applicationId={
                                        selectedApplicationId
                                    }
                                    onBack={() =>
                                        setSelectedApplicationId(
                                            null
                                        )
                                    }
                                />

                            ) : (

                                <>

                                    {/* DASHBOARD */}

                                    {currentView ===
                                        "dashboard" && (

                                        <DashboardOverview
                                            applications={
                                                applications
                                            }
                                            onViewDetails={
                                                handleViewDetails
                                            }
                                        />

                                    )}


                                    {/* APPLICATIONS */}

                                    {currentView ===
                                        "applications" && (

                                        <Dashboard
                                            applications={
                                                applications
                                            }

                                            loading={
                                                loading
                                            }

                                            error={
                                                error
                                            }

                                            page={
                                                page
                                            }

                                            setPage={
                                                setPage
                                            }

                                            totalPages={
                                                totalPages
                                            }

                                            onDelete={
                                                deleteApplication
                                            }

                                            onUpdate={
                                                updateApplication
                                            }

                                            onViewDetails={
                                                handleViewDetails
                                            }

                                            company={
                                                company
                                            }

                                            setCompany={
                                                handleCompanyChange
                                            }

                                            status={
                                                status
                                            }

                                            setStatus={
                                                handleStatusChange
                                            }

                                            from={
                                                from
                                            }

                                            setFrom={
                                                handleFromChange
                                            }

                                            to={
                                                to
                                            }

                                            setTo={
                                                handleToChange
                                            }

                                            sort={
                                                sort
                                            }

                                            setSort={
                                                handleSortChange
                                            }

                                            onClearFilters={
                                                clearFilters
                                            }
                                        />

                                    )}


                                    {/* ANALYTICS */}

                                    {currentView ===
                                        "analytics" && (

                                        <Analytics />

                                    )}


                                    {/* ADD APPLICATION */}

                                    {currentView ===
                                        "add" && (

                                        <AddApplication
                                            onApplicationAdded={
                                                fetchApplications
                                            }
                                        />

                                    )}


                                    {/* SETTINGS */}

                                    {currentView ===
                                        "settings" && (

                                        <Settings
                                            theme={
                                                theme
                                            }

                                            setTheme={
                                                setTheme
                                            }

                                            user={
                                                user
                                            }
                                        />

                                    )}

                                </>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}


export default App;