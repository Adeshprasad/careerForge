import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        localStorage.setItem("token", data.token);

        console.log(data);
    }

    return (
        <main>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </main>
    );
}

export default Login;