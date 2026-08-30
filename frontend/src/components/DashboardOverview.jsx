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
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        ),

                        fetch(
                            "http://localhost:3000/applications/follow-ups",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        )

                    ]);


                const analyticsData =
                    await analyticsResponse.json();

                const followUpsData =
                    await followUpsResponse.json();


                if (
                    analyticsResponse.ok
                ) {
                    setAnalytics(analyticsData);
                }


                if (
                    followUpsResponse.ok
                ) {
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
                (item) =>
                    item._id === status
            )?.count || 0
        );

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

            {/* Header */}

            <section className="dashboard-welcome">

                <div>

                    <p className="dashboard-eyebrow">
                        OVERVIEW
                    </p>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Here's what's happening with your
                        job search.
                    </p>

                </div>

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

            </section>


            {/* Stats */}

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

                    </div>

                </div>

            </section>


            {/* Main grid */}

            <section className="dashboard-grid">


                {/* Follow-ups */}

                <div className="dashboard-panel">

                    <div className="dashboard-panel-header">

                        <div>

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


                                        <div className="followup-date">

                                            {new Date(
                                                application.followUpDate
                                            ).toLocaleDateString(
                                                undefined,
                                                {
                                                    month: "short",
                                                    day: "numeric"
                                                }
                                            )}

                                        </div>


                                        <span className="arrow">
                                            →
                                        </span>

                                    </button>

                                ))}

                        </div>

                    )}

                </div>


                {/* Recent applications */}

                <div className="dashboard-panel">

                    <div className="dashboard-panel-header">

                        <div>

                            <h2>
                                Recent Applications
                            </h2>

                            <p>
                                Your latest opportunities.
                            </p>

                        </div>

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

                </div>

            </section>

        </main>
    );
}

export default DashboardOverview;