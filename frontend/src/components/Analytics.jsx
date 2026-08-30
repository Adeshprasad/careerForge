import { useEffect, useState } from "react";
import "./Analytics.css";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function fetchAnalytics() {

            try {

                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:3000/applications/analytics",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {

                    setError(
                        data.message ||
                        "Failed to load analytics"
                    );

                    setLoading(false);

                    return;
                }

                setAnalytics(data);

                setLoading(false);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load analytics"
                );

                setLoading(false);
            }
        }

        fetchAnalytics();

    }, []);


    function getStatusCount(status) {

        return (
            analytics?.statusBreakdown?.find(
                (item) =>
                    item._id === status
            )?.count || 0
        );
    }


    function getPercentage(status) {

        const total =
            analytics?.totalApplications || 0;

        const count =
            getStatusCount(status);

        if (total === 0) {
            return 0;
        }

        return (
            (count / total) * 100
        ).toFixed(1);
    }


    if (loading) {

        return (
            <section className="analytics analytics-state">

                <div className="loading-spinner"></div>

                <p>
                    Loading analytics...
                </p>

            </section>
        );
    }


    if (error) {

        return (
            <section className="analytics analytics-state">

                <h3>
                    Unable to load analytics
                </h3>

                <p>
                    {error}
                </p>

            </section>
        );
    }


    const total =
        analytics.totalApplications || 0;

    const interviews =
        getStatusCount("Interview");

    const offers =
        getStatusCount("Offer");


    const interviewRate =
        total > 0
            ? ((interviews / total) * 100).toFixed(1)
            : 0;

    const offerRate =
        total > 0
            ? ((offers / total) * 100).toFixed(1)
            : 0;


    return (
        <main className="analytics">

            {/* Header */}

            <section className="analytics-header">

                <div>

                    <p className="analytics-eyebrow">
                        INSIGHTS
                    </p>

                    <h1>
                        Analytics
                    </h1>

                    <p>
                        Understand how your application
                        pipeline is performing.
                    </p>

                </div>

                <div className="analytics-total">

                    <span>
                        Applications tracked
                    </span>

                    <strong>
                        {total}
                    </strong>

                </div>

            </section>


            {/* Summary cards */}

            <section className="analytics-cards">

                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        ◉
                    </div>

                    <div>

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            {total}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        ↗
                    </div>

                    <div>

                        <span>
                            APPLIED
                        </span>

                        <strong>
                            {getStatusCount("Applied")}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        ◌
                    </div>

                    <div>

                        <span>
                            INTERVIEWS
                        </span>

                        <strong>
                            {interviews}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        ★
                    </div>

                    <div>

                        <span>
                            OFFERS
                        </span>

                        <strong>
                            {offers}
                        </strong>

                    </div>

                </div>

            </section>


            {/* Pipeline */}

            <section className="analytics-panel">

                <div className="analytics-panel-header">

                    <div>

                        <h2>
                            Application Pipeline
                        </h2>

                        <p>
                            Breakdown of your current applications.
                        </p>

                    </div>

                    <span className="pipeline-total">
                        {total} total
                    </span>

                </div>


                <div className="pipeline-list">

                    {analytics.statusBreakdown.map(
                        (item) => {

                            const percentage =
                                getPercentage(
                                    item._id
                                );

                            return (

                                <div
                                    className="pipeline-item"
                                    key={item._id}
                                >

                                    <div className="pipeline-item-header">

                                        <div className="pipeline-name">

                                            <span
                                                className={`pipeline-dot ${String(
                                                    item._id
                                                ).toLowerCase()}`}
                                            ></span>

                                            <span>
                                                {item._id}
                                            </span>

                                        </div>

                                        <div className="pipeline-value">

                                            <strong>
                                                {item.count}
                                            </strong>

                                            <span>
                                                {percentage}%
                                            </span>

                                        </div>

                                    </div>


                                    <div className="pipeline-bar">

                                        <div
                                            className={`pipeline-fill ${String(
                                                item._id
                                            ).toLowerCase()}`}
                                            style={{
                                                width:
                                                    `${percentage}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            );
                        }
                    )}

                </div>

            </section>


            {/* Performance */}

            <section className="analytics-performance">

                <div className="performance-card">

                    <div className="performance-icon">
                        ◌
                    </div>

                    <div>

                        <span>
                            INTERVIEW RATE
                        </span>

                        <strong>
                            {interviewRate}%
                        </strong>

                        <p>
                            {interviews} of {total}
                            {" "}
                            applications reached
                            interview stage.
                        </p>

                    </div>

                </div>


                <div className="performance-card">

                    <div className="performance-icon">
                        ★
                    </div>

                    <div>

                        <span>
                            OFFER RATE
                        </span>

                        <strong>
                            {offerRate}%
                        </strong>

                        <p>
                            {offers} of {total}
                            {" "}
                            applications resulted
                            in an offer.
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Analytics;