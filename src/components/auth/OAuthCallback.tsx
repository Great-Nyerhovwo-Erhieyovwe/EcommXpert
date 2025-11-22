import { useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
                return
            }

            // Fetch Profile
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('role, onboarding_completed')
                .eq('id', user.id)
                .single();
            
            if (!profile) {
                // New user, redirect to onboarding
                navigate('/onboarding');
                return;
            }

            // Redirect based on role
            if (!profile.onboarding_completed) navigate('/onboarding');
            else if (profile.role === 'admin') navigate('/admin');
            else navigate('/dashboard');
        };
        checkUser();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;

