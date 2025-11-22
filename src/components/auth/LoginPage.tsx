import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
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
            const { data, error: AuthError
            } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (AuthError) throw AuthError;

            const user = data?.user;

            if (user) {
                // Get user role from database
                const { data: userProfile, error: profileError } = await supabase
                    .from('user_profiles')
                    .select('onboarding_completed, role')
                    .eq('id', user.id)
                    .single();

                if (profileError) throw profileError;

                if (!userProfile) {
                    throw new Error('User profile not found.');
                }

                if (userProfile.onboarding_completed) {
                    // user completed onboarding, redirect based on role
                    if (userProfile.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }

                } else {
                    // user hasn't completed onboarding, redirecting to onboarding
                    navigate('/onboarding');
                }
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
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'https://ecommxpert.onrender.com/oauth-callback'
                }
            });
            if (error) throw error;
        } catch (err) {
            setError((err as Error).message || 'Google login failed');
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