import { useState } from "react";

function AddApplication({ onApplicationAdded }) {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        company: company,
                        role: role,
                        status: status
                    })
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
            <button type="submit">
                Add Application
            </button>
        </form>
    );
}

export default AddApplication;