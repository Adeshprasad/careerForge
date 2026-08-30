import { useEffect, useState } from "react";
import "./UpcomingFollowUps.css";

function UpcomingFollowUps() {

    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchFollowUps() {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:3000/applications/follow-ups",
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

                setFollowUps(data.data);
                setLoading(false);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load upcoming follow-ups"
                );

                setLoading(false);
            }
        }

        fetchFollowUps();

    }, []);


    if (loading) {
        return (
            <section className="follow-ups follow-ups-state">
                <div className="loading-spinner"></div>
                <p>Loading follow-ups...</p>
            </section>
        );
    }


    if (error) {
        return (
            <section className="follow-ups follow-ups-state">
                <h3>Unable to load follow-ups</h3>
                <p>{error}</p>
            </section>
        );
    }


    return (
        <section className="follow-ups">

            <div className="follow-ups-header">

                <div>
                    <p className="follow-ups-eyebrow">
                        STAY ON TRACK
                    </p>

                    <h2>
                        Upcoming Follow-ups
                    </h2>

                    <p>
                        Don't let good opportunities go cold.
                    </p>
                </div>

                <div className="follow-up-count">
                    {followUps.length}
                </div>

            </div>


            {followUps.length === 0 ? (

                <div className="no-follow-ups">

                    <div className="follow-up-empty-icon">
                        ✓
                    </div>

                    <div>
                        <h3>
                            You're all caught up
                        </h3>

                        <p>
                            No upcoming follow-ups right now.
                        </p>
                    </div>

                </div>

            ) : (

                <div className="follow-ups-list">

                    {followUps.map((application) => (

                        <div
                            className="follow-up-card"
                            key={application._id}
                        >

                            <div className="follow-up-date">

                                <span>
                                    FOLLOW UP
                                </span>

                                <strong>
                                    {new Date(
                                        application.followUpDate
                                    ).toLocaleDateString(
                                        undefined,
                                        {
                                            month: "short",
                                            day: "numeric"
                                        }
                                    )}
                                </strong>

                            </div>


                            <div className="follow-up-info">

                                <h3>
                                    {application.company}
                                </h3>

                                <p>
                                    {application.role ||
                                        "Role not specified"}
                                </p>

                            </div>


                            <span
                                className={`follow-up-status ${String(
                                    application.status
                                ).toLowerCase()}`}
                            >
                                {application.status}
                            </span>

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
}

export default UpcomingFollowUps;