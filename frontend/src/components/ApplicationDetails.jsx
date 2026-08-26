import { useEffect, useState } from "react";

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

                setNotes(data.data.notes || "");

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

                setError("Failed to load application");
                setLoading(false);
            }
        }

        fetchApplication();

    }, [applicationId]);


    async function saveNotes() {

        try {

            setSavingNotes(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        notes
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                console.error(data);
                return;
            }

            setApplication(data.data);
            setNotes(data.data.notes || "");

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

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        followUpDate: followUpDate || null
                    })
                }
            );

            const data = await response.json();

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

        if (!interviewDate || !interviewRound.trim()) {
            return;
        }

        try {

            setAddingInterview(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/interviews`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
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

            const data = await response.json();

            if (!response.ok) {

                console.error(data);
                return;
            }

            setApplication(data.data);

            setInterviews(
                data.data.interviews || []
            );

            // Clear form
            setInterviewDate("");
            setInterviewRound("");
            setInterviewType("Online");
            setInterviewNotes("");
            setInterviewOutcome("Pending");

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

        if (!interviewDate || !interviewRound.trim()) {
            return;
        }

        try {

            setAddingInterview(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/interviews/${editingInterviewId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
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

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setApplication(data.data);

            setInterviews(data.data.interviews || []);

            // Reset form
            setInterviewDate("");
            setInterviewRound("");
            setInterviewType("Online");
            setInterviewNotes("");
            setInterviewOutcome("Pending");

            setEditingInterviewId(null);

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
    }

    async function deleteInterview(interviewId) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this interview?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${applicationId}/interviews/${interviewId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

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

            console.error(
                "Error loading resume:",
                error
            );

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
                    <strong>
                        {application.status}
                    </strong>
                </p>

            </section>


            <p>
                Applied on:{" "}
                {new Date(
                    application.createdAt
                ).toLocaleDateString()}
            </p>


            <p>
                Applicant:{" "}
                {application.user.name}
            </p>


            <p>
                Email:{" "}
                {application.user.email}
            </p>


            {/* NOTES */}

            <section>

                <h3>Notes</h3>

                <textarea
                    value={notes}
                    onChange={(event) =>
                        setNotes(event.target.value)
                    }
                    placeholder="Add notes about this application..."
                    rows="5"
                />

                <br />

                <button
                    onClick={saveNotes}
                    disabled={savingNotes}
                >
                    {savingNotes
                        ? "Saving..."
                        : "Save Notes"}
                </button>

            </section>


            {/* FOLLOW-UP */}

            <section>

                <h3>Follow-up</h3>

                <input
                    type="date"
                    value={followUpDate}
                    onChange={(event) =>
                        setFollowUpDate(event.target.value)
                    }
                />

                <button
                    onClick={saveFollowUp}
                    disabled={savingFollowUp}
                >
                    {savingFollowUp
                        ? "Saving..."
                        : "Save Follow-up"}
                </button>

            </section>


            {/* INTERVIEWS */}

            <section className="interviews-section">

                <h3>Interviews</h3>

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


                    <div className="form-group">

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
                            rows="4"
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
                                    : "Add Interview"}
                        </button>


                        {editingInterviewId && (

                            <button
                                className="cancel-interview-button"
                                onClick={() => {

                                    setEditingInterviewId(null);

                                    setInterviewDate("");
                                    setInterviewRound("");
                                    setInterviewType("Online");
                                    setInterviewNotes("");
                                    setInterviewOutcome("Pending");

                                }}
                            >
                                Cancel Edit
                            </button>

                        )}

                    </div>

                </div>


                <div className="interview-list">

                    <h4>
                        Interview History
                    </h4>


                    {interviews.length === 0 ? (

                        <p className="empty-message">
                            No interviews scheduled.
                        </p>

                    ) : (

                        interviews.map((interview) => (

                            <div
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
                                        className={
                                            `interview-outcome ${interview.outcome.toLowerCase()}`
                                        }
                                    >
                                        {interview.outcome}
                                    </span>

                                </div>


                                <div className="interview-meta">

                                    <span>
                                        Type: {interview.type}
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

                            </div>

                        ))

                    )}

                </div>

            </section>


            {/* STATUS HISTORY */}

            <h3>Status History</h3>

            {application.statusHistory &&
                application.statusHistory.length > 0 ? (

                <div>

                    {application.statusHistory.map(
                        (history, index) => (

                            <div key={index}>

                                <p>
                                    ●{" "}
                                    <strong>
                                        {history.status}
                                    </strong>
                                </p>

                                <p>
                                    {new Date(
                                        history.changedAt
                                    ).toLocaleString()}
                                </p>

                                {index <
                                    application.statusHistory.length - 1 && (
                                        <p>│</p>
                                    )}

                            </div>
                        )
                    )}

                </div>

            ) : (

                <p>
                    No status history available.
                </p>

            )}


            {/* RESUME */}

            {application.resume && (

                <button onClick={viewResume}>
                    View Resume
                </button>

            )}


            <br />

            <button onClick={onBack}>
                Back to Applications
            </button>

        </main>
    );
}

export default ApplicationDetails;