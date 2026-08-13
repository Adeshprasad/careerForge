import ApplicationCard from "./ApplicationCard";

function Dashboard({
    applications,
    loading,
    error,
    page,
    setPage,
    totalPages
}) {
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