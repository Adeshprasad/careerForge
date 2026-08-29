import ApplicationCard from "./ApplicationCard";

function Dashboard({
    applications,
    loading,
    error,
    page,
    setPage,
    totalPages,
    onDelete,
    onUpdate,
    company,
    setCompany,
    status,
    setStatus,
    sort,
    setSort,
    onClearFilters,
    onViewDetails,
    from,
    to,
    setFrom,
    setTo
}) {

    return (
        <main>
            <h1>Your Applications</h1>

            <input
                type="text"
                placeholder="Search by company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
            />

            <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
            >
                <option value="">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
            </select>

            <input
                type="date"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
            />

            <input
                type="date"
                value={to}
                onChange={(event) => setTo(event.target.value)}
            />

            <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
            >
                <option value="-createdAt">Newest first</option>
                <option value="createdAt">Oldest first</option>
            </select>

            <button onClick={onClearFilters}>
                Clear Filters
            </button>

            {error ? (
                <p>{error}</p>
            ) : loading ? (
                <p>Loading applications...</p>
            ) : (
                <>
                    {applications.map((application) => (
                        <ApplicationCard
                            key={application._id}
                            id={application._id}
                            company={application.company}
                            role={application.role}
                            status={application.status}
                            resume={application.resume}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            onViewDetails={onViewDetails}
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