import ApplicationCard from "./components/ApplicationCard";

function App() {
    const applications = [
        { company: "Google", status: "Applied" },
        { company: "Amazon", status: "Interview" },
        { company: "Microsoft", status: "Rejected" }
    ];

    return (
        <>
            <h1>CareerForge</h1>

            {applications.map((application) => (
                <ApplicationCard
                    company={application.company}
                    status={application.status}
                />
            ))}
        </>
    );
}

export default App;