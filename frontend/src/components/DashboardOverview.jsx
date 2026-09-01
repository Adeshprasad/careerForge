import { useEffect, useState } from "react";
import "./DashboardOverview.css";

function DashboardOverview({
    applications,
    onViewDetails
}) {
    const [analytics, setAnalytics] = useState(null);
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const token = localStorage.getItem("token");

                const [analyticsResponse, followUpsResponse] =
                    await Promise.all([
                        fetch(
                            "http://localhost:3000/applications/analytics",
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        ),

                        fetch(
                            "http://localhost:3000/applications/follow-ups",
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        )
                    ]);

                const analyticsData =
                    await analyticsResponse.json();

                const followUpsData =
                    await followUpsResponse.json();

                if (analyticsResponse.ok) {
                    setAnalytics(analyticsData);
                }

                if (followUpsResponse.ok) {
                    setFollowUps(
                        followUpsData.data || []
                    );
                }

            } catch (error) {
                console.error(
                    "Failed to load dashboard:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);


    function getStatusCount(status) {
        return (
            analytics?.statusBreakdown?.find(
                (item) => item._id === status
            )?.count || 0
        );
    }


    function getStatusPercentage(status) {
        const total = analytics?.totalApplications || 0;
        const count = getStatusCount(status);

        if (!total) {
            return 0;
        }

        return Math.round((count / total) * 100);
    }


    function formatFollowUpDate(date) {
        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric"
            }
        );
    }


    function getDaysUntil(date) {
        if (!date) {
            return "";
        }

        const today = new Date();
        const target = new Date(date);

        today.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);

        const difference =
            Math.ceil(
                (target - today) /
                (1000 * 60 * 60 * 24)
            );

        if (difference < 0) {
            return "Overdue";
        }

        if (difference === 0) {
            return "Today";
        }

        if (difference === 1) {
            return "Tomorrow";
        }

        return `In ${difference} days`;
    }


    if (loading) {
        return (
            <main className="dashboard-overview">
                <div className="dashboard-loading">
                    Loading dashboard...
                </div>
            </main>
        );
    }


    return (
        <main className="dashboard-overview">

            {/* =====================================
                HEADER
            ===================================== */}

            <section className="dashboard-welcome">

                <div>
                    <p className="dashboard-eyebrow">
                        OVERVIEW
                    </p>

                    <h1>
                        Welcome back 👋
                    </h1>

                    <p>
                        Here's what's happening with your
                        job search.
                    </p>
                </div>

                <div className="dashboard-header-actions">

                    <div className="dashboard-date">
                        {new Date().toLocaleDateString(
                            undefined,
                            {
                                weekday: "long",
                                month: "short",
                                day: "numeric"
                            }
                        )}
                    </div>

                </div>

            </section>


            {/* =====================================
                STATS
            ===================================== */}

            <section className="dashboard-stats">

                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        ◉
                    </div>

                    <div>
                        <span>
                            Total Applications
                        </span>

                        <strong>
                            {analytics?.totalApplications || 0}
                        </strong>

                        <small>
                            Across your pipeline
                        </small>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        ↗
                    </div>

                    <div>
                        <span>
                            Applied
                        </span>

                        <strong>
                            {getStatusCount("Applied")}
                        </strong>

                        <small>
                            {getStatusPercentage("Applied")}% of total
                        </small>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        ◌
                    </div>

                    <div>
                        <span>
                            Interviews
                        </span>

                        <strong>
                            {getStatusCount("Interview")}
                        </strong>

                        <small>
                            {getStatusPercentage("Interview")}% of total
                        </small>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        ★
                    </div>

                    <div>
                        <span>
                            Offers
                        </span>

                        <strong>
                            {getStatusCount("Offer")}
                        </strong>

                        <small>
                            {getStatusPercentage("Offer")}% of total
                        </small>
                    </div>

                </div>

            </section>


            {/* =====================================
                MAIN GRID
            ===================================== */}

            <section className="dashboard-grid">

                {/* Pipeline */}

                <div className="dashboard-panel pipeline-panel">

                    <div className="dashboard-panel-header">

                        <div>
                            <p className="panel-eyebrow">
                                PIPELINE
                            </p>

                            <h2>
                                Application Progress
                            </h2>

                            <p>
                                See where your applications stand.
                            </p>
                        </div>

                        <span className="panel-count">
                            {analytics?.totalApplications || 0}
                        </span>

                    </div>


                    <div className="pipeline">

                        {[
                            "Applied",
                            "Interview",
                            "Offer",
                            "Rejected"
                        ].map((status) => (

                            <div
                                className="pipeline-row"
                                key={status}
                            >

                                <div className="pipeline-label">

                                    <span
                                        className={`pipeline-dot ${status.toLowerCase()}`}
                                    ></span>

                                    <span>
                                        {status}
                                    </span>

                                </div>

                                <div className="pipeline-track">

                                    <div
                                        className={`pipeline-fill ${status.toLowerCase()}`}
                                        style={{
                                            width: `${getStatusPercentage(status)}%`
                                        }}
                                    ></div>

                                </div>

                                <strong>
                                    {getStatusCount(status)}
                                </strong>

                            </div>

                        ))}

                    </div>

                </div>


                {/* Follow-ups */}

                <div className="dashboard-panel">

                    <div className="dashboard-panel-header">

                        <div>
                            <p className="panel-eyebrow">
                                NEXT UP
                            </p>

                            <h2>
                                Upcoming Follow-ups
                            </h2>

                            <p>
                                Stay on top of your opportunities.
                            </p>
                        </div>

                        <span className="panel-count">
                            {followUps.length}
                        </span>

                    </div>


                    {followUps.length === 0 ? (

                        <div className="dashboard-empty">

                            <span>
                                ✓
                            </span>

                            <div>
                                <strong>
                                    You're all caught up
                                </strong>

                                <p>
                                    No upcoming follow-ups.
                                </p>
                            </div>

                        </div>

                    ) : (

                        <div className="dashboard-followups">

                            {followUps
                                .slice(0, 4)
                                .map((application) => (

                                    <button
                                        type="button"
                                        className="dashboard-followup"
                                        key={application._id}
                                        onClick={() =>
                                            onViewDetails(
                                                application._id
                                            )
                                        }
                                    >

                                        <div className="company-avatar">
                                            {application.company
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>


                                        <div className="followup-company">

                                            <strong>
                                                {application.company}
                                            </strong>

                                            <span>
                                                {application.role ||
                                                    "Role not specified"}
                                            </span>

                                        </div>


                                        <div className="followup-date-group">

                                            <strong>
                                                {formatFollowUpDate(
                                                    application.followUpDate
                                                )}
                                            </strong>

                                            <span>
                                                {getDaysUntil(
                                                    application.followUpDate
                                                )}
                                            </span>

                                        </div>


                                        <span className="arrow">
                                            →
                                        </span>

                                    </button>

                                ))}

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================
                RECENT APPLICATIONS
            ===================================== */}

            <section className="dashboard-panel recent-panel">

                <div className="dashboard-panel-header">

                    <div>
                        <p className="panel-eyebrow">
                            ACTIVITY
                        </p>

                        <h2>
                            Recent Applications
                        </h2>

                        <p>
                            Your latest opportunities.
                        </p>
                    </div>

                    <span className="panel-count">
                        {Math.min(applications.length, 5)}
                    </span>

                </div>


                {applications.length === 0 ? (

                    <div className="dashboard-empty">

                        <span>
                            +
                        </span>

                        <div>
                            <strong>
                                No applications yet
                            </strong>

                            <p>
                                Start tracking your job search.
                            </p>
                        </div>

                    </div>

                ) : (

                    <div className="recent-applications">

                        {applications
                            .slice(0, 5)
                            .map((application) => (

                                <button
                                    type="button"
                                    className="recent-application"
                                    key={application._id}
                                    onClick={() =>
                                        onViewDetails(
                                            application._id
                                        )
                                    }
                                >

                                    <div className="company-avatar">
                                        {application.company
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>


                                    <div className="recent-company">

                                        <strong>
                                            {application.company}
                                        </strong>

                                        <span>
                                            {application.role ||
                                                "Role not specified"}
                                        </span>

                                    </div>


                                    <span
                                        className={`recent-status ${String(
                                            application.status
                                        ).toLowerCase()}`}
                                    >
                                        {application.status}
                                    </span>


                                    <span className="arrow">
                                        →
                                    </span>

                                </button>

                            ))}

                    </div>

                )}

            </section>

        </main>
    );
}

export default DashboardOverview;