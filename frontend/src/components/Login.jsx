import { useState } from "react";
import "./Auth.css";

function Login({ onLogin, onRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);
        setError("");


        try {

            const response = await fetch(
                "http://localhost:3000/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.message || "Invalid email or password."
                );

                setLoading(false);

                return;
            }


            localStorage.setItem(
                "token",
                data.token
            );

            setLoading(false);

            onLogin();

        } catch (error) {

            console.error("Login error:", error);

            setError(
                "Unable to connect to the server. Please try again."
            );

            setLoading(false);
        }
    }


    return (
        <main className="auth-page">

            <section className="auth-card">

                {/* Brand */}

                <div className="auth-brand">

                    <div className="auth-logo">
                        CF
                    </div>

                    <span>
                        CareerForge
                    </span>

                </div>


                {/* Header */}

                <div className="auth-header">

                    <p className="auth-eyebrow">
                        WELCOME BACK
                    </p>

                    <h1>
                        Sign in to CareerForge
                    </h1>

                    <p>
                        Continue managing your applications
                        and career pipeline.
                    </p>

                </div>


                {/* Error */}

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                {/* Form */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="auth-field">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="auth-field">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>


                    <button
                        className="auth-switch"
                        type="button"
                        onClick={onRegister}
                    >
                        Don't have an account? Create one
                    </button>

                </form>


                <div className="auth-footer">
                    Organize your job search. Track every opportunity.
                </div>

            </section>

        </main>
    );
}

export default Login;