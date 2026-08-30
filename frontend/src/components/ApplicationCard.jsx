import { useState } from "react";
import "./ApplicationCard.css";

function ApplicationCard(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [company, setCompany] = useState(
        props.company || ""
    );

    const [role, setRole] = useState(
        props.role || ""
    );

    const [status, setStatus] = useState(
        props.status || "Applied"
    );


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

        } catch (error) {

            console.error(
                "Error loading resume:",
                error
            );

        }
    }


    function cancelEdit() {

        setCompany(props.company || "");
        setRole(props.role || "");
        setStatus(props.status || "Applied");

        setIsEditing(false);
    }


    if (isEditing) {

        return (
            <article className="application-card edit-card">

                <div className="card-edit-header">

                    <div>

                        <span className="card-label">
                            EDIT APPLICATION
                        </span>

                        <h3>
                            Update application
                        </h3>

                    </div>

                </div>


                <div className="edit-form">

                    <div className="edit-field">

                        <label>
                            Company
                        </label>

                        <input
                            type="text"
                            value={company}
                            onChange={(event) =>
                                setCompany(event.target.value)
                            }
                        />

                    </div>


                    <div className="edit-field">

                        <label>
                            Role
                        </label>

                        <input
                            type="text"
                            value={role}
                            onChange={(event) =>
                                setRole(event.target.value)
                            }
                        />

                    </div>


                    <div className="edit-field">

                        <label>
                            Status
                        </label>

                        <select
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
                        className="primary-action"
                        disabled={saving}
                        onClick={async () => {

                            setSaving(true);

                            const success =
                                await props.onUpdate(
                                    props.id,
                                    {
                                        company,
                                        role,
                                        status
                                    }
                                );

                            setSaving(false);

                            if (success) {
                                setIsEditing(false);
                            }

                        }}
                    >
                        {saving
                            ? "Saving..."
                            : "Save changes"}
                    </button>


                    <button
                        className="secondary-action"
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

            {/* Company */}
            <div className="application-main">

                <div className="company-avatar">
                    {props.company
                        ? props.company.charAt(0).toUpperCase()
                        : "?"}
                </div>

                <div className="application-company">

                    <h3>
                        {props.company}
                    </h3>

                    <p>
                        {props.role || "Role not specified"}
                    </p>

                </div>

            </div>


            {/* Status */}
            <div className="application-status">

                <span
                    className={`status-badge ${String(
                        props.status
                    ).toLowerCase()}`}
                >
                    {props.status}
                </span>

            </div>


            {/* Resume */}
            <div className="application-resume">

                {props.resume ? (

                    <span className="resume-attached">

                        <span>●</span>

                        Resume attached

                    </span>

                ) : (

                    <span className="resume-missing">
                        No resume
                    </span>

                )}

            </div>


            {/* Actions */}
            <div className="application-actions">

                {props.resume && (
                    <button
                        className="icon-action"
                        onClick={viewResume}
                        title="View Resume"
                    >
                        ↗
                    </button>
                )}

                <button
                    className="details-action"
                    onClick={() =>
                        props.onViewDetails(props.id)
                    }
                >
                    Details
                    <span>→</span>
                </button>

                <button
                    className="icon-action"
                    onClick={() =>
                        setIsEditing(true)
                    }
                    title="Edit"
                >
                    ✎
                </button>

                <button
                    className="icon-action danger-icon"
                    onClick={() =>
                        props.onDelete(props.id)
                    }
                    title="Delete"
                >
                    ×
                </button>

            </div>

        </article>
    );
}

export default ApplicationCard;