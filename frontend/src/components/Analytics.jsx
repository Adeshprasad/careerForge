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
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message);
                    setLoading(false);
                    return;
                }

                setAnalytics(data);
                setLoading(false);

            } catch (error) {
                console.error(error);

                setError("Failed to load analytics");
                setLoading(false);
            }
        }

        fetchAnalytics();

    }, []);


    if (loading) {
        return <p>Loading analytics...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    return (
        <section className="analytics">

            <h2>Career Analytics</h2>

            <div className="analytics-cards">

                <div className="analytics-card">
                    <h3>Total Applications</h3>
                    <p>{analytics.totalApplications}</p>
                </div>

                <div className="analytics-card">
                    <h3>Applied</h3>
                    <p>
                        {analytics.statusBreakdown.find(
                            (item) => item._id === "Applied"
                        )?.count || 0}
                    </p>
                </div>

                <div className="analytics-card">
                    <h3>Interviews</h3>
                    <p>
                        {analytics.statusBreakdown.find(
                            (item) => item._id === "Interview"
                        )?.count || 0}
                    </p>
                </div>

                <div className="analytics-card">
                    <h3>Offers</h3>
                    <p>
                        {analytics.statusBreakdown.find(
                            (item) => item._id === "Offer"
                        )?.count || 0}
                    </p>
                </div>

            </div>

            <div className="status-breakdown">

                <h3>Status Breakdown</h3>

                {analytics.statusBreakdown.map((item) => {

                    const percentage =
                        analytics.totalApplications > 0
                            ? (
                                (item.count /
                                    analytics.totalApplications) *
                                100
                            ).toFixed(1)
                            : 0;

                    return (
                        <div
                            className="status-row"
                            key={item._id}
                        >
                            <span>{item._id}</span>

                            <span>
                                {item.count} ({percentage}%)
                            </span>
                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default Analytics;