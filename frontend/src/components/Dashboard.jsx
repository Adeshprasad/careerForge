import { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";

function Dashboard() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchApplications() {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:3000/applications?page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    setError("Failed to load applications");
                    setLoading(false);
                    return;
                }

                const data = await response.json();

                setApplications(data.data);
                setTotalPages(data.totalPages);
                setLoading(false);

            } catch (error) {
                setError("Failed to load applications");
                setLoading(false);
            }
        }

        fetchApplications();
    }, [page]);

    return (
        <main>
            <h1>Your Applications</h1>

            {error ? (
                <p>{error}</p>
            ) : loading ? (
                <p>Loading applications...</p>
            ) : (
                <>
                    {applications.map((application) => (
                        <ApplicationCard
                            key={application._id}
                            company={application.company}
                            role={application.role}
                            status={application.status}
                        />
                    ))}

                    <div>
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}

export default Dashboard;