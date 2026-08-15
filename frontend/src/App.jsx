import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddApplication from "./components/AddApplications";

function App() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("-createdAt");

    function clearFilters() {
        setCompany("");
        setStatus("");
        setSort("-createdAt");
        setPage(1);
    }

    async function updateApplication(id, updatedData) {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return false;
            }

            console.log("Application updated successfully!");

            await fetchApplications();

            return true;

        } catch (error) {
            console.error("Error updating application:", error);
            return false;
        }
    }

    async function deleteApplication(id) {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                console.error("Failed to delete application");
                return;
            }

            await fetchApplications();

        } catch (error) {
            console.error("Error deleting application:", error);
        }
    }

    async function fetchApplications() {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications?page=${page}&company=${company}&status=${status}&sort=${sort}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                setError("Failed to load applications");
                setLoading(false);
                return;
            }

            const data = await response.json();

            setApplications(data.data);
            setTotalPages(data.totalPages);
            setLoading(false);

        } catch (error) {
            setError("Failed to load applications");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [page, company, status, sort]);

    return (
        <>
            <Navbar title="CareerForge" />

            <Dashboard
                applications={applications}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                onDelete={deleteApplication}
                onUpdate={updateApplication}
                company={company}
                setCompany={setCompany}
                status={status}
                setStatus={setStatus}
                sort={sort}
                setSort={setSort}
                onClearFilters={clearFilters}
            />

            <AddApplication onApplicationAdded={fetchApplications} />
        </>
    );
}

export default App;