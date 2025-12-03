import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import '../HomePage.css'

const TestimonyCard = () => {

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [_currentUser, setCurrentUser] = useState<User | null>(null);

    // Mock testimonials
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "E-commerce Entrepreneur",
            content: "EcommXpert transformed my business from $0 to $50k/month in just 6 months. The courses and tools are invaluable!",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=32"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Dropshipping Beginner",
            content: "As a complete beginner, I was skeptical, but the step-by-step guidance and demo stores made everything click.",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=4"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Marketing Professional",
            content: "The analytics tools alone are worth the price. I can now track exactly what's driving my sales.",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=5"
        }
    ];


    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // check if user is already logged in
    useEffect(() => {
        const checkSession = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error.message);
                setCurrentUser(null)
                return;
            }
            setCurrentUser(user);
        };
        checkSession();
    }, []);

    return (
        <>
            {/* Testimonials */}
            <section id="testimonials" className="testimonials">
                <div className="container">
                    <h2>What Our Users Say</h2>
                    <div className="testimonial-carousel">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
                            >
                                <div className="stars">
                                    {'⭐'.repeat(testimonial.rating)}
                                </div>
                                <p>{testimonial.content}</p>
                                <div className="testimonial-author">
                                    <img src={testimonial.avatar} alt={testimonial.name} />
                                    <div>
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="testimonial-indicators">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={index === currentTestimonial ? 'active' : ''}
                                onClick={() => setCurrentTestimonial(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );

}

export default TestimonyCard;