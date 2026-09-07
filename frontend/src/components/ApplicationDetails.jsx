import { useEffect, useState } from "react";
import "./ApplicationDetails.css";

function ApplicationDetails({ applicationId, onBack }) {
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [notes, setNotes] = useState("");
    const [followUpDate, setFollowUpDate] = useState("");

    const [savingNotes, setSavingNotes] = useState(false);
    const [savingFollowUp, setSavingFollowUp] = useState(false);

    const [interviews, setInterviews] = useState([]);

    const [interviewDate, setInterviewDate] = useState("");
    const [interviewRound, setInterviewRound] = useState("");
    const [interviewType, setInterviewType] = useState("Online");
    const [interviewNotes, setInterviewNotes] = useState("");
    const [interviewOutcome, setInterviewOutcome] = useState("Pending");

    const [addingInterview, setAddingInterview] = useState(false);
    const [editingInterviewId, setEditingInterviewId] = useState(null);


    useEffect(() => {
        async function fetchApplication() {
            try {
                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:3000/applications/${applicationId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {
                    setError(
                        data.message ||
                        "Failed to load application."
                    );

                    setLoading(false);
                    return;
                }

                setApplication(data.data);

                setNotes(
                    data.data.notes || ""
                );

                setFollowUpDate(
                    data.data.followUpDate
                        ? data.data.followUpDate.split("T")[0]
                        : ""
                );

                setInterviews(
                    data.data.interviews || []
                );

                setLoading(false);

            } catch (error) {
                console.error(error);

                setError(
                    "Failed to load application."
                );

                setLoading(false);
            }
        }

        fetchApplication();

    }, [applicationId]);


    async function saveNotes() {
        try {
            setSavingNotes(true);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        notes
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setApplication(data.data);

            setNotes(
                data.data.notes || ""
            );

        } catch (error) {
            console.error(
                "Error saving notes:",
                error
            );

        } finally {
            setSavingNotes(false);
        }
    }


    async function saveFollowUp() {
        try {
            setSavingFollowUp(true);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        followUpDate:
                            followUpDate || null
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setApplication(data.data);

            setFollowUpDate(
                data.data.followUpDate
                    ? data.data.followUpDate.split("T")[0]
                    : ""
            );

        } catch (error) {
            console.error(
                "Error saving follow-up:",
                error
            );

        } finally {
            setSavingFollowUp(false);
        }
    }


    async function addInterview() {
        if (
            !interviewDate ||
            !interviewRound.trim()
        ) {
            return;
        }

        try {
            setAddingInterview(true);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/interviews`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        date: interviewDate,
                        round: interviewRound,
                        type: interviewType,
                        notes: interviewNotes,
                        outcome: interviewOutcome
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setApplication(data.data);

            setInterviews(
                data.data.interviews || []
            );

            clearInterviewForm();

        } catch (error) {
            console.error(
                "Error adding interview:",
                error
            );

        } finally {
            setAddingInterview(false);
        }
    }


    async function updateInterview() {
        if (
            !interviewDate ||
            !interviewRound.trim()
        ) {
            return;
        }

        try {
            setAddingInterview(true);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/interviews/${editingInterviewId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        date: interviewDate,
                        round: interviewRound,
                        type: interviewType,
                        notes: interviewNotes,
                        outcome: interviewOutcome
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setApplication(data.data);

            setInterviews(
                data.data.interviews || []
            );

            clearInterviewForm();

        } catch (error) {
            console.error(
                "Error updating interview:",
                error
            );

        } finally {
            setAddingInterview(false);
        }
    }


    function startEditingInterview(interview) {
        setEditingInterviewId(interview._id);

        setInterviewDate(
            interview.date
                ? new Date(interview.date)
                    .toISOString()
                    .slice(0, 16)
                : ""
        );

        setInterviewRound(
            interview.round || ""
        );

        setInterviewType(
            interview.type || "Online"
        );

        setInterviewNotes(
            interview.notes || ""
        );

        setInterviewOutcome(
            interview.outcome || "Pending"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function clearInterviewForm() {
        setInterviewDate("");
        setInterviewRound("");
        setInterviewType("Online");
        setInterviewNotes("");
        setInterviewOutcome("Pending");
        setEditingInterviewId(null);
    }


    async function deleteInterview(interviewId) {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this interview?"
            );

        if (!confirmed) {
            return;
        }

        try {
            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/interviews/${interviewId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setApplication(data.data);

            setInterviews(
                data.data.interviews || []
            );

        } catch (error) {
            console.error(
                "Error deleting interview:",
                error
            );
        }
    }


    async function viewResume() {
        const newWindow =
            window.open("", "_blank");

        if (!newWindow) {
            console.error(
                "Popup was blocked."
            );
            return;
        }

        try {
            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/resume`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                newWindow.close();

                console.error(
                    "Failed to load resume:",
                    response.status
                );

                return;
            }

            const blob =
                await response.blob();

            const url =
                URL.createObjectURL(blob);

            newWindow.location.href = url;

        } catch (error) {
            console.error(
                "Error loading resume:",
                error
            );

            newWindow.close();
        }
    }


    function getStatusClass(status) {
        return String(status || "")
            .toLowerCase()
            .replace(/\s+/g, "-");
    }


    function formatDate(date) {
        return new Date(date).toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    }


    if (loading) {
        return (
            <main className="application-details-state">

                <div className="details-loading">

                    <div className="loading-dot"></div>

                    <p>
                        Loading application...
                    </p>

                </div>

            </main>
        );
    }


    if (error) {
        return (
            <main className="application-details-state">

                <div className="details-error">

                    <div className="details-error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load application
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="primary-action"
                        onClick={onBack}
                    >
                        ← Back to Applications
                    </button>

                </div>

            </main>
        );
    }


    return (
        <main className="application-details">

            {/* BACK */}

            <button
                className="back-button"
                onClick={onBack}
            >
                <span>←</span>
                Back to Applications
            </button>


            {/* HERO */}

            <section className="details-hero">

                <div className="details-hero-main">

                    <div className="details-company-avatar">
                        {application.company
                            ? application.company
                                .charAt(0)
                                .toUpperCase()
                            : "?"}
                    </div>


                    <div className="details-hero-info">

                        <div className="details-title-row">

                            <p className="details-eyebrow">
                                APPLICATION
                            </p>

                            <span
                                className={`details-status ${getStatusClass(
                                    application.status
                                )}`}
                            >
                                {application.status}
                            </span>

                        </div>


                        <h1>
                            {application.company}
                        </h1>


                        <p className="details-role">
                            {application.role ||
                                "Role not specified"}
                        </p>


                        <div className="hero-meta">

                            <span>
                                Applied {formatDate(
                                    application.createdAt
                                )}
                            </span>

                            <span className="hero-meta-dot">
                                •
                            </span>

                            <span>
                                {application.resume
                                    ? "Resume attached"
                                    : "No resume attached"}
                            </span>

                        </div>

                    </div>

                </div>


                {application.resume && (
                    <button
                        className="hero-resume-button"
                        onClick={viewResume}
                    >
                        <span>📄</span>
                        View Resume
                    </button>
                )}

            </section>


            {/* CONTENT */}

            <div className="details-layout">

                {/* MAIN */}

                <div className="details-main-column">

                    {/* NOTES */}

                    <section className="details-section">

                        <div className="details-section-header">

                            <div>

                                <p className="details-section-eyebrow">
                                    NOTES
                                </p>

                                <h3>
                                    Application Notes
                                </h3>

                                <p>
                                    Keep important information
                                    about this opportunity.
                                </p>

                            </div>

                        </div>


                        <textarea
                            className="details-textarea"
                            value={notes}
                            onChange={(event) =>
                                setNotes(
                                    event.target.value
                                )
                            }
                            placeholder="Add notes about this application..."
                            rows="5"
                        />


                        <div className="details-section-actions">

                            <button
                                className="primary-action"
                                onClick={saveNotes}
                                disabled={savingNotes}
                            >
                                {savingNotes
                                    ? "Saving..."
                                    : "Save Notes"}
                            </button>

                        </div>

                    </section>


                    {/* INTERVIEWS */}

                    <section className="details-section">

                        <div className="details-section-header">

                            <div>

                                <p className="details-section-eyebrow">
                                    INTERVIEWS
                                </p>

                                <h3>
                                    Interview Tracker
                                </h3>

                                <p>
                                    Record interviews and
                                    track their outcomes.
                                </p>

                            </div>


                            {interviews.length > 0 && (
                                <span className="section-count">
                                    {interviews.length}
                                </span>
                            )}

                        </div>


                        <div className="interview-form">

                            <div className="form-group">

                                <label>
                                    Date & Time
                                </label>

                                <input
                                    type="datetime-local"
                                    value={interviewDate}
                                    onChange={(event) =>
                                        setInterviewDate(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Interview Round
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Technical Round"
                                    value={interviewRound}
                                    onChange={(event) =>
                                        setInterviewRound(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Interview Type
                                </label>

                                <select
                                    value={interviewType}
                                    onChange={(event) =>
                                        setInterviewType(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option value="Online">
                                        Online
                                    </option>

                                    <option value="Offline">
                                        Offline
                                    </option>

                                    <option value="Phone">
                                        Phone
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Outcome
                                </label>

                                <select
                                    value={interviewOutcome}
                                    onChange={(event) =>
                                        setInterviewOutcome(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Passed">
                                        Passed
                                    </option>

                                    <option value="Failed">
                                        Failed
                                    </option>

                                </select>

                            </div>


                            <div className="form-group interview-notes-field">

                                <label>
                                    Interview Notes
                                </label>

                                <textarea
                                    placeholder="What happened during the interview?"
                                    value={interviewNotes}
                                    onChange={(event) =>
                                        setInterviewNotes(
                                            event.target.value
                                        )
                                    }
                                    rows="3"
                                />

                            </div>


                            <div className="interview-form-actions">

                                <button
                                    className="add-interview-button"
                                    onClick={
                                        editingInterviewId
                                            ? updateInterview
                                            : addInterview
                                    }
                                    disabled={
                                        addingInterview ||
                                        !interviewDate ||
                                        !interviewRound.trim()
                                    }
                                >
                                    {addingInterview
                                        ? "Saving..."
                                        : editingInterviewId
                                            ? "Update Interview"
                                            : "+ Add Interview"}
                                </button>


                                {editingInterviewId && (
                                    <button
                                        className="cancel-interview-button"
                                        onClick={
                                            clearInterviewForm
                                        }
                                    >
                                        Cancel
                                    </button>
                                )}

                            </div>

                        </div>


                        {/* INTERVIEW HISTORY */}

                        <div className="interview-list">

                            <div className="subsection-heading">

                                <h4>
                                    Interview History
                                </h4>

                                {interviews.length > 0 && (
                                    <span>
                                        {interviews.length} recorded
                                    </span>
                                )}

                            </div>


                            {interviews.length === 0 ? (

                                <div className="empty-message">

                                    <div className="empty-message-icon">
                                        ○
                                    </div>

                                    <div>

                                        <strong>
                                            No interviews recorded
                                        </strong>

                                        <p>
                                            Add an interview when
                                            you move to the next
                                            stage.
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                interviews.map((interview) => (

                                    <article
                                        key={interview._id}
                                        className="interview-card"
                                    >

                                        <div className="interview-card-header">

                                            <div>

                                                <h4>
                                                    {interview.round}
                                                </h4>

                                                <p className="interview-date">
                                                    {new Date(
                                                        interview.date
                                                    ).toLocaleString()}
                                                </p>

                                            </div>


                                            <span
                                                className={`interview-outcome ${String(
                                                    interview.outcome
                                                ).toLowerCase()}`}
                                            >
                                                {interview.outcome}
                                            </span>

                                        </div>


                                        <div className="interview-meta">
                                            <span>
                                                {interview.type}
                                            </span>
                                        </div>


                                        {interview.notes && (
                                            <div className="interview-notes-display">

                                                <strong>
                                                    Notes
                                                </strong>

                                                <p>
                                                    {interview.notes}
                                                </p>

                                            </div>
                                        )}


                                        <div className="interview-card-actions">

                                            <button
                                                className="edit-interview-button"
                                                onClick={() =>
                                                    startEditingInterview(
                                                        interview
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-interview-button"
                                                onClick={() =>
                                                    deleteInterview(
                                                        interview._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </article>

                                ))

                            )}

                        </div>

                    </section>

                </div>


                {/* SIDEBAR */}

                <aside className="details-side-column">

                    {/* FOLLOW-UP */}

                    <section className="side-card follow-up-card">

                        <div className="side-card-header">

                            <div>

                                <p>
                                    FOLLOW-UP
                                </p>

                                <h3>
                                    Stay on track
                                </h3>

                            </div>

                            <span className="side-card-icon">
                                ↗
                            </span>

                        </div>


                        <p className="side-card-description">
                            Set a reminder for your next
                            action on this application.
                        </p>


                        <div className="follow-up-form">

                            <label>
                                Follow-up date
                            </label>

                            <input
                                type="date"
                                value={followUpDate}
                                onChange={(event) =>
                                    setFollowUpDate(
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                className="primary-action full-width"
                                onClick={saveFollowUp}
                                disabled={savingFollowUp}
                            >
                                {savingFollowUp
                                    ? "Saving..."
                                    : "Save Follow-up"}
                            </button>

                        </div>

                    </section>


                    {/* STATUS TIMELINE */}

                    <section className="side-card timeline-card">

                        <div className="side-card-header">

                            <div>

                                <p>
                                    TIMELINE
                                </p>

                                <h3>
                                    Status History
                                </h3>

                            </div>

                        </div>


                        <p className="side-card-description">
                            Track how this application
                            has progressed.
                        </p>


                        {application.statusHistory &&
                            application.statusHistory.length > 0 ? (

                            <div className="status-history">

                                {application.statusHistory.map(
                                    (history, index) => (

                                        <div
                                            className="history-item"
                                            key={index}
                                        >

                                            <div className="history-marker">

                                                <span></span>

                                                {index <
                                                    application
                                                        .statusHistory
                                                        .length -
                                                    1 && (
                                                        <div className="history-line"></div>
                                                    )}

                                            </div>


                                            <div className="history-content">

                                                <div className="history-top">

                                                    <strong>
                                                        {history.status}
                                                    </strong>

                                                    <span>
                                                        {new Date(
                                                            history.changedAt
                                                        ).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                day: "numeric",
                                                                month: "short"
                                                            }
                                                        )}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="history-empty">

                                <span>
                                    ○
                                </span>

                                <p>
                                    No status history yet.
                                </p>

                            </div>

                        )}

                    </section>

                </aside>

            </div>

        </main>
    );
}

export default ApplicationDetails;