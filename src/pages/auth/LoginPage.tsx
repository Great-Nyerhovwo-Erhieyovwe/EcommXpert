import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://ecommxpertbackend.onrender.com/auth/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed")
            }

            const user = data?.user;

            if (user) {
                // Redirect based on onboarding status and role
                if (user.onboarding_completed) {
                    // user completed onboarding, redirect based on role
                    if (user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }

                } else {
                    // user hasn't completed onboarding, redirecting to onboarding
                    navigate('/onboarding');
                }
            } else {
                throw new Error("User not found");
            }
        } catch (err) {
            setError((err as Error).message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://ecommxpertbackend.onrender.com/auth/google', {
                method: 'GET'
            });
        } catch (err) {
            setError((err as Error).message || 'Google login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Sign In to EcommXpert</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="divider">or</div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="btn-google"
                >
                    <i className="fab fa-google"></i>
                    Sign in with Google
                </button>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <a href="/signup">Sign up</a>
                    </p>
                    <p>
                        <a href="/forgot-password">Forgot password?</a>
                    </p>
                </div>
            </div>
        </div>
    );

};

export default LoginPage;