import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!acceptTerms) {
            setError('You must accept the terms and conditions');
            return;
        }

        setLoading(true);

        try {
            // FIX: Correctly destructure data and error from the response
            const response = await fetch('https://ecommxpertbackend.onrender.com/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Signup failed");
            }
                // Navigate to login
                navigate('/login');

        } catch (err) {
            // FIX: Ensure error message is a string
            setError((err as Error).message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://ecommxpertbackend.onrender.com/auth/google", {
                method: "GET"
            })    
        } catch (err) {
            // FIX: Ensure error message is a string
            setError((err as Error).message || 'Google signup failed');
        } finally {
            // FIX: Set loading to false regardless of error
            setLoading(false);
        }
    };

    // The rest of your component remains the same, as all state variables
    // and imported components are now being used.

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Create Your EcommXpert Account</h2>

                {error && <div className="error-message">{error}</div>}
                {/* All state variables are used: error, loading, email, password, confirmPassword, firstName, lastName, acceptTerms */}

                <form onSubmit={handleSignup}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                placeholder='First Name'
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                placeholder='Last Name'
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder='Email'
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
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={8}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                required
                            />
                            I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="divider">or</div>

                <button
                    onClick={handleGoogleSignup}
                    disabled={loading}
                    className="btn-google"
                >
                    <i className="fab fa-google"></i>
                    Sign up with Google
                </button>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;