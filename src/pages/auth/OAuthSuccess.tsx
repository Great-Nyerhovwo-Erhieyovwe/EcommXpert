import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            navigate('/login');
            return;
        }

        // save token
        localStorage.setItem('token', token);

        // Fetch user profile from backend
        const fetchProfile = async () => {
            try {
                const res = await fetch('https://ecommxpertbackend.onrender.com/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const user = await res.json();

                if (!res.ok) {
                    navigate('/login');
                    return;
                }

                // Redirect logic
                if (user.role === 'admin') {
                    navigate('/admin');
                } else if (user.onboarding_completed) {
                    navigate('/dashboard');
                } else {
                    navigate('/onboarding');
                }
            } catch (error) {
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <>
            <div className="auth-container">
                <div className="auth-form" style={{ textAlign: "center" }}>
                    <h2>Signing you in...</h2>
                    <p>Please wait while we finish your Google login.</p>
                </div>
        </div>
        </>
    );
};

export default OAuthSuccess;