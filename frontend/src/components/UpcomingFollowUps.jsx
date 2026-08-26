import { useEffect, useState } from "react";

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
        return <p>Loading follow-ups...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    return (
        <section>

            <h2>Upcoming Follow-ups</h2>

            {followUps.length === 0 ? (

                <p>
                    No upcoming follow-ups.
                </p>

            ) : (

                followUps.map((application) => (

                    <div key={application._id}>

                        <h3>
                            {application.company}
                        </h3>

                        <p>
                            {application.role}
                        </p>

                        <p>
                            Follow up:{" "}
                            {new Date(
                                application.followUpDate
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            Status:{" "}
                            {application.status}
                        </p>

                    </div>

                ))
            )}

        </section>
    );
}

export default UpcomingFollowUps;