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
                        Authorization:
                            `Bearer ${token}`
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

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }


        if (file.type !== "application/pdf") {

            setError(
                "Please select a PDF file."
            );

            setResume(null);

            return;
        }


        setError("");
        setSuccess("");

        setResume(file);
    }


    return (
        <main className="add-application-page">

            {/* Header */}

            <section className="add-application-header">

                <div>

                    <p className="add-application-eyebrow">
                        NEW OPPORTUNITY
                    </p>

                    <h1>
                        Add Application
                    </h1>

                    <p>
                        Keep your job search organized by
                        adding a new opportunity.
                    </p>

                </div>

            </section>


            {/* Form */}

            <form
                className="application-form"
                onSubmit={handleSubmit}
            >

                <div className="application-form-grid">

                    {/* Company */}

                    <div className="application-field">

                        <label htmlFor="company">
                            Company
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

                    </div>


                    {/* Role */}

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

                    </div>


                    {/* Status */}

                    <div className="application-field">

                        <label htmlFor="status">
                            Status
                        </label>

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


                    {/* Resume */}

                    <div className="application-field">

                        <label>
                            Resume
                        </label>

                        <label className="file-upload">

                            <span className="file-upload-icon">
                                ↑
                            </span>

                            <span className="file-upload-content">

                                <strong>
                                    {resume
                                        ? resume.name
                                        : "Upload your resume"}
                                </strong>

                                <small>
                                    {resume
                                        ? "PDF selected"
                                        : "PDF files only"}
                                </small>

                            </span>

                            <span className="file-upload-browse">
                                Browse
                            </span>

                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />

                        </label>

                    </div>

                </div>


                {/* Feedback */}

                {error && (

                    <div className="form-feedback form-error">
                        {error}
                    </div>

                )}


                {success && (

                    <div className="form-feedback form-success">
                        ✓ {success}
                    </div>

                )}


                {/* Footer */}

                <div className="application-form-footer">

                    <p>
                        You can add a resume now or later.
                    </p>

                    <button
                        type="submit"
                        className="add-application-button"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Adding..."
                            : "+ Add Application"}
                    </button>

                </div>

            </form>

        </main>
    );
}

export default AddApplication;