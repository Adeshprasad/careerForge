import { useState } from "react";
import "./ApplicationCard.css";

function ApplicationCard(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [company, setCompany] = useState(props.company || "");
    const [role, setRole] = useState(props.role || "");
    const [status, setStatus] = useState(props.status || "Applied");

    async function viewResume() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${props.id}/resume`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                console.error("Failed to load resume");
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            window.open(url, "_blank");

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);

        } catch (error) {
            console.error("Error loading resume:", error);
        }
    }

    function cancelEdit() {
        setCompany(props.company || "");
        setRole(props.role || "");
        setStatus(props.status || "Applied");
        setIsEditing(false);
    }

    async function handleSave() {
        setSaving(true);

        try {
            const success = await props.onUpdate(
                props.id,
                {
                    company,
                    role,
                    status
                }
            );

            if (success) {
                setIsEditing(false);
            }

        } finally {
            setSaving(false);
        }
    }

    if (isEditing) {
        return (
            <article className="application-card edit-card">

                <div className="card-edit-header">
                    <span className="card-label">
                        EDIT APPLICATION
                    </span>

                    <h3>
                        Update application
                    </h3>
                </div>


                <div className="edit-form">

                    <div className="edit-field">
                        <label htmlFor={`company-${props.id}`}>
                            Company
                        </label>

                        <input
                            id={`company-${props.id}`}
                            type="text"
                            value={company}
                            onChange={(event) =>
                                setCompany(event.target.value)
                            }
                        />
                    </div>


                    <div className="edit-field">
                        <label htmlFor={`role-${props.id}`}>
                            Role
                        </label>

                        <input
                            id={`role-${props.id}`}
                            type="text"
                            value={role}
                            onChange={(event) =>
                                setRole(event.target.value)
                            }
                        />
                    </div>


                    <div className="edit-field">
                        <label htmlFor={`status-${props.id}`}>
                            Status
                        </label>

                        <select
                            id={`status-${props.id}`}
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value)
                            }
                        >
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

                </div>


                <div className="card-actions">

                    <button
                        type="button"
                        className="primary-action"
                        disabled={saving}
                        onClick={handleSave}
                    >
                        {saving
                            ? "Saving..."
                            : "Save changes"}
                    </button>


                    <button
                        type="button"
                        className="secondary-action"
                        disabled={saving}
                        onClick={cancelEdit}
                    >
                        Cancel
                    </button>

                </div>

            </article>
        );
    }


    return (
        <article className="application-card">

            <div className="application-main">

                <div className="company-avatar">
                    {props.company
                        ? props.company
                            .charAt(0)
                            .toUpperCase()
                        : "?"}
                </div>


                <div className="application-company">

                    <h3>
                        {props.company || "Unnamed company"}
                    </h3>

                    <p>
                        {props.role || "Role not specified"}
                    </p>

                </div>

            </div>


            <div className="application-status">

                <span
                    className={`status-badge ${String(
                        props.status || "Applied"
                    ).toLowerCase()}`}
                >
                    {props.status || "Applied"}
                </span>

            </div>


            <div className="application-resume">

                {props.resume ? (
                    <span className="resume-attached">
                        <span aria-hidden="true">●</span>
                        Resume attached
                    </span>
                ) : (
                    <span className="resume-missing">
                        No resume
                    </span>
                )}

            </div>


            <div className="application-actions">

                {props.resume && (
                    <button
                        type="button"
                        className="icon-action"
                        onClick={viewResume}
                        title="View Resume"
                        aria-label="View Resume"
                    >
                        ↗
                    </button>
                )}


                <button
                    type="button"
                    className="details-action"
                    onClick={() =>
                        props.onViewDetails(props.id)
                    }
                >
                    Details
                    <span aria-hidden="true">→</span>
                </button>


                <button
                    type="button"
                    className="icon-action"
                    onClick={() =>
                        setIsEditing(true)
                    }
                    title="Edit"
                    aria-label="Edit application"
                >
                    ✎
                </button>


                <button
                    type="button"
                    className="icon-action danger-icon"
                    onClick={() =>
                        props.onDelete(props.id)
                    }
                    title="Delete"
                    aria-label="Delete application"
                >
                    ×
                </button>

            </div>

        </article>
    );
}

export default ApplicationCard;