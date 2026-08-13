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

    async function fetchApplications() {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/applications?page=${page}`,
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
    }, [page]);

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
            />

            <AddApplication onApplicationAdded={fetchApplications} />
        </>
    );
}

export default App;