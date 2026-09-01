import ApplicationCard from "./ApplicationCard";
import "./Dashboard.css";

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

    function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this application?\n\nThis action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        onDelete(id);
    }

    function hasActiveFilters() {
        return Boolean(
            company ||
            status ||
            from ||
            to ||
            sort !== "-createdAt"
        );
    }


    return (
        <main className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="dashboard-eyebrow">
                        WORKSPACE
                    </p>

                    <h1>
                        Applications
                    </h1>

                    <p className="dashboard-subtitle">
                        Track and manage every opportunity in your pipeline.
                    </p>
                </div>

                <div className="application-count">
                    <span>
                        {applications.length}
                    </span>

                    <small>
                        applications
                    </small>
                </div>

            </div>


            <div className="filters-card">

                <div className="filter-search">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={company}
                        onChange={(event) =>
                            setCompany(event.target.value)
                        }
                    />

                </div>


                <div className="filter-group">

                    <label>
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                    >
                        <option value="">
                            All statuses
                        </option>

                        <option value="Applied">
                            Applied
                        </option>

                        <option value="Interview">
                            Interview
                        </option>

                        <option value="Rejected">
                            Rejected
                        </option>

                        <option value="Offer">
                            Offer
                        </option>
                    </select>

                </div>


                <div className="filter-group">

                    <label>
                        From
                    </label>

                    <input
                        type="date"
                        value={from}
                        onChange={(event) =>
                            setFrom(event.target.value)
                        }
                    />

                </div>


                <div className="filter-group">

                    <label>
                        To
                    </label>

                    <input
                        type="date"
                        value={to}
                        onChange={(event) =>
                            setTo(event.target.value)
                        }
                    />

                </div>


                <div className="filter-group">

                    <label>
                        Sort
                    </label>

                    <select
                        value={sort}
                        onChange={(event) =>
                            setSort(event.target.value)
                        }
                    >
                        <option value="-createdAt">
                            Newest
                        </option>

                        <option value="createdAt">
                            Oldest
                        </option>
                    </select>

                </div>


                <button
                    type="button"
                    className={`clear-filters-button ${hasActiveFilters() ? "active" : ""
                        }`}
                    onClick={onClearFilters}
                >
                    Clear
                </button>

            </div>


            <section className="applications-section">

                <div className="section-heading">

                    <h2>
                        Your Applications
                    </h2>

                    <span>
                        Showing page {page}
                    </span>

                </div>


                {error ? (

                    <div className="dashboard-state error-state">

                        <h3>
                            Unable to load applications
                        </h3>

                        <p>
                            {error}
                        </p>

                    </div>

                ) : loading ? (

                    <div className="dashboard-state">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading applications...
                        </p>

                    </div>

                ) : applications.length === 0 ? (

                    <div className="dashboard-state">

                        <div className="empty-icon">
                            {hasActiveFilters() ? "🔍" : "📋"}
                        </div>

                        <h3>
                            {hasActiveFilters()
                                ? "No matching applications"
                                : "No applications yet"}
                        </h3>

                        <p>
                            {hasActiveFilters()
                                ? "Try adjusting or clearing your filters."
                                : "Add your first application to start tracking your pipeline."}
                        </p>

                        {hasActiveFilters() && (
                            <button
                                type="button"
                                className="empty-clear-button"
                                onClick={onClearFilters}
                            >
                                Clear filters
                            </button>
                        )}

                    </div>

                ) : (

                    <div className="applications-grid">

                        {applications.map((application) => (

                            <ApplicationCard
                                key={application._id}

                                id={application._id}

                                company={application.company}

                                role={application.role}

                                status={application.status}

                                resume={application.resume}

                                onDelete={handleDelete}

                                onUpdate={onUpdate}

                                onViewDetails={onViewDetails}
                            />

                        ))}

                    </div>

                )}

            </section>


            {!loading &&
                !error &&
                applications.length > 0 && (

                    <div className="pagination">

                        <button
                            type="button"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        <div className="page-indicator">

                            <span>
                                Page {page}
                            </span>

                            <span className="page-divider">
                                of
                            </span>

                            <span>
                                {totalPages}
                            </span>

                        </div>

                        <button
                            type="button"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>

                    </div>

                )}

        </main>
    );
}

export default Dashboard;