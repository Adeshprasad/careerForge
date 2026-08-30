import { useState } from "react";
import "./Auth.css";

function Register({ onRegister }) {

    const [name, setName] = useState("");
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
                "http://localhost:3000/users/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.message ||
                    "Unable to create your account."
                );

                setLoading(false);

                return;
            }


            setLoading(false);

            onRegister();

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            setError(
                "Something went wrong. Please try again."
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
                        GET STARTED
                    </p>

                    <h1>
                        Create your account
                    </h1>

                    <p>
                        Start organizing your applications
                        and building your career pipeline.
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
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />

                    </div>


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
                            placeholder="Create a password"
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
                            ? "Creating account..."
                            : "Create account"}
                    </button>

                </form>


                <div className="auth-footer">
                    Your career journey, organized in one place.
                </div>

            </section>

        </main>
    );
}

export default Register;