import { useState } from "react";

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
        } catch (error) {
            console.error("Error loading resume:", error);
        }
    }

    if (isEditing) {
        return (
            <div>
                <input
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                />

                <input
                    type="text"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                />

                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                </select>

                <button
                    disabled={saving}
                    onClick={async () => {
                        setSaving(true);

                        const success = await props.onUpdate(props.id, {
                            company,
                            role,
                            status
                        });

                        setSaving(false);

                        if (success) {
                            setIsEditing(false);
                        }
                    }}
                >
                    {saving ? "Saving..." : "Save"}
                </button>

                <button
                    onClick={() => {
                        setCompany(props.company || "");
                        setRole(props.role || "");
                        setStatus(props.status || "Applied");
                        setIsEditing(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>{props.company}</h2>
            <p>{props.role}</p>
            <p>{props.status}</p>

            {props.resume && (
                <button onClick={viewResume}>
                    View Resume
                </button>
            )}

            <button onClick={() => props.onViewDetails(props.id)}>
                View Details
            </button>

            <button onClick={() => setIsEditing(true)}>
                Edit
            </button>

            <button onClick={() => props.onDelete(props.id)}>
                Delete
            </button>
        </div>
    );
}

export default ApplicationCard;