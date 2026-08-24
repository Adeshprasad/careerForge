import { useEffect, useState } from "react";

function ApplicationDetails({ applicationId, onBack }) {

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchApplication() {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:3000/applications/${applicationId}`,
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

                setApplication(data.data);
                setLoading(false);

            } catch (error) {
                console.error(error);

                setError("Failed to load application");
                setLoading(false);
            }
        }

        fetchApplication();

    }, [applicationId]);

    async function viewResume() {
        const newWindow = window.open("", "_blank");

        if (!newWindow) {
            console.error("Popup was blocked.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/resume`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                console.error(
                    "Failed to load resume:",
                    response.status
                );

                newWindow.close();
                return;
            }

            const blob = await response.blob();

            const url = URL.createObjectURL(blob);

            newWindow.location.href = url;

        } catch (error) {
            console.error("Error loading resume:", error);
            newWindow.close();
        }
    }


    if (loading) {
        return (
            <main>
                <p>Loading application...</p>
            </main>
        );
    }


    if (error) {
        return (
            <main>
                <p>{error}</p>

                <button onClick={onBack}>
                    Back to Applications
                </button>
            </main>
        );
    }


    return (
        <main>
            <h1>Application Details</h1>

            <h2>{application.company}</h2>

            <p>
                Role: {application.role}
            </p>

            <section>
                <h3>Current Status</h3>

                <p>
                    <strong>{application.status}</strong>
                </p>
            </section>

            <p>
                Applied on:{" "}
                {new Date(application.createdAt).toLocaleDateString()}
            </p>

            <p>
                Applicant: {application.user.name}
            </p>

            <p>
                Email: {application.user.email}
            </p>

            <h3>Status History</h3>

            {application.statusHistory &&
                application.statusHistory.length > 0 ? (
                <div>
                    {application.statusHistory.map((history, index) => (
                        <div key={index}>
                            <p>
                                ● <strong>{history.status}</strong>
                            </p>

                            <p>
                                {new Date(
                                    history.changedAt
                                ).toLocaleString()}
                            </p>

                            {index < application.statusHistory.length - 1 && (
                                <p>│</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No status history available.</p>
            )}

            {application.resume && (
                <button onClick={viewResume}>
                    View Resume
                </button>
            )}

            <button onClick={onBack}>
                Back to Applications
            </button>
        </main>
    );
}

export default ApplicationDetails;