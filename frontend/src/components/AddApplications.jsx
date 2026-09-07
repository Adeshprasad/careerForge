import { useState } from "react";
import "./AddApplications.css";

function AddApplication({ onApplicationAdded }) {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [resume, setResume] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("company", company);
            formData.append("role", role);
            formData.append("status", status);

            if (resume) {
                formData.append("resume", resume);
            }

            const response = await fetch(
                "http://localhost:3000/applications",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Failed to add application."
                );
                return;
            }

            await onApplicationAdded();

            setCompany("");
            setRole("");
            setStatus("Applied");
            setResume(null);

            setSuccess(
                "Application added successfully."
            );

        } catch (error) {
            console.error(error);

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Please select a PDF file.");
            setResume(null);
            return;
        }

        setError("");
        setSuccess("");
        setResume(file);
    }

    return (
        <main className="add-application-page">

            <section className="add-application-header">

                <div>
                    <p className="add-application-eyebrow">
                        NEW OPPORTUNITY
                    </p>

                    <h1>
                        Add an application
                    </h1>

                    <p>
                        Capture the details now so you can focus
                        on landing the role later.
                    </p>
                </div>


            </section>


            <div className="add-application-layout">

                {/* Main form */}

                <form
                    className="application-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-section-header">
                        <div className="form-section-icon">
                            ✦
                        </div>

                        <div>
                            <h2>
                                Application details
                            </h2>

                            <p>
                                Add the essentials for this opportunity.
                            </p>
                        </div>
                    </div>


                    <div className="application-form-grid">

                        <div className="application-field field-company">

                            <label htmlFor="company">
                                Company
                                <span>*</span>
                            </label>

                            <input
                                id="company"
                                type="text"
                                placeholder="e.g. Google"
                                value={company}
                                onChange={(event) =>
                                    setCompany(
                                        event.target.value
                                    )
                                }
                                required
                            />

                            <small>
                                The company you're applying to.
                            </small>

                        </div>


                        <div className="application-field">

                            <label htmlFor="role">
                                Role
                            </label>

                            <input
                                id="role"
                                type="text"
                                placeholder="e.g. Software Engineer"
                                value={role}
                                onChange={(event) =>
                                    setRole(
                                        event.target.value
                                    )
                                }
                            />

                            <small>
                                Job title or position.
                            </small>

                        </div>


                        <div className="application-field">

                            <label htmlFor="status">
                                Current status
                            </label>

                            <div className="select-wrapper">

                                <select
                                    id="status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(
                                            event.target.value
                                        )
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

                            <small>
                                You can update this anytime.
                            </small>

                        </div>


                        <div className="application-field">

                            <label>
                                Resume
                            </label>

                            <label className="file-upload">

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                />

                                <div className="file-upload-icon">
                                    {resume ? "✓" : "↑"}
                                </div>

                                <div className="file-upload-content">

                                    <strong>
                                        {resume
                                            ? resume.name
                                            : "Upload your resume"}
                                    </strong>

                                    <span>
                                        {resume
                                            ? "PDF ready to attach"
                                            : "PDF files only · optional"}
                                    </span>

                                </div>

                                <span className="file-upload-browse">
                                    {resume
                                        ? "Change"
                                        : "Browse"}
                                </span>

                            </label>

                        </div>

                    </div>


                    {error && (
                        <div className="form-feedback form-error">
                            <span>!</span>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="form-feedback form-success">
                            <span>✓</span>
                            {success}
                        </div>
                    )}


                    <div className="application-form-footer">

                        <div className="form-footer-note">
                            <span>↗</span>

                            <p>
                                You can add or replace the resume later.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="add-application-button"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Adding..."
                                : "Add application"}

                            {!submitting && (
                                <span>→</span>
                            )}
                        </button>

                    </div>

                </form>


                {/* Side information */}

                <aside className="add-application-side">

                    <div className="add-side-card">

                        <div className="side-card-icon">
                            ✦
                        </div>

                        <p className="side-card-eyebrow">
                            QUICK TIP
                        </p>

                        <h3>
                            Capture it while it's fresh.
                        </h3>

                        <p>
                            Adding an application takes a few
                            seconds now and saves you from
                            hunting through emails later.
                        </p>

                    </div>


                    <div className="add-side-checklist">

                        <div className="checklist-header">
                            <span>
                                Before you save
                            </span>

                            <strong>
                                1/3
                            </strong>
                        </div>


                        <div className="checklist-item">
                            <span className="checklist-number">
                                01
                            </span>

                            <div>
                                <strong>
                                    Company
                                </strong>

                                <p>
                                    Who are you applying to?
                                </p>
                            </div>
                        </div>


                        <div className="checklist-item">
                            <span className="checklist-number">
                                02
                            </span>

                            <div>
                                <strong>
                                    Position
                                </strong>

                                <p>
                                    What role are you targeting?
                                </p>
                            </div>
                        </div>


                        <div className="checklist-item">
                            <span className="checklist-number">
                                03
                            </span>

                            <div>
                                <strong>
                                    Resume
                                </strong>

                                <p>
                                    Attach it if you have it ready.
                                </p>
                            </div>
                        </div>

                    </div>


                    <div className="add-side-footer">
                        <span>CF</span>

                        <div>
                            <strong>
                                CareerForge
                            </strong>

                            <p>
                                Keep every opportunity in one place.
                            </p>
                        </div>
                    </div>

                </aside>

            </div>

        </main>
    );
}

export default AddApplication;