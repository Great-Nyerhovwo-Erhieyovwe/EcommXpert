const GuideCard = () => {
     

    return (
        <>
            {/* How It Works */}
            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <h2>Start in Minutes. Learn and Earn for a Lifetime.</h2>
                    <div className="timeline">
                        <div className="timeline-step">
                            <div className="step-number">1</div>
                            <h3>Create Your Account</h3>
                            <p>Signup using email or Google. Choose your goal: Learn, Invest, or Both.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">2</div>
                            <h3>Complete Onboarding</h3>
                            <p>Personalized questions tailor your dashboard and course roadmap.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">3</div>
                            <h3>Start Learning</h3>
                            <p>Watch video lessons, download templates, complete quizzes, practice with demo stores.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">4</div>
                            <h3>Begin Earning (Optional)</h3>
                            <p>Invest in vetted e-commerce growth plans with transparent ROI.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">5</div>
                            <h3>Track Your Progress</h3>
                            <p>Use the dashboard to monitor earnings, learning milestones, store performance, investment growth.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">6</div>
                            <h3>Withdraw or Reinvest</h3>
                            <p>Instant payouts, transparent fees, secure transactions.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GuideCard;