import { useState } from "react";

function AddApplication({ onApplicationAdded }) {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [resume, setResume] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
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
                console.log(data);
                return;
            }

            console.log("Application added successfully!");

            await onApplicationAdded();

            setCompany("");
            setRole("");
            setStatus("Applied");
            setResume(null);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
            />

            <input
                type="text"
                placeholder="Role"
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

            <input
                type="file"
                accept="application/pdf"
                onChange={(event) => setResume(event.target.files[0])}
            />

            <button type="submit">
                Add Application
            </button>
        </form>
    );
}

export default AddApplication;