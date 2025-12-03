const InvestmentOpportunityCard = () => {

    return (
        <>
            {/* Investment Opportunities */}
            <section className="investment-opportunities">
                <div className="container">
                    <h2>Earn Smarter With E-Commerce Growth Plans</h2>
                    <div className="investment-plans">
                        <div className="investment-plan">
                            <h3>Starter Pool</h3>
                            <div className="plan-details">
                                <div>Min Deposit: $100</div>
                                <div>ROI: 8-12%</div>
                                <div>Risk: Low</div>
                            </div>
                            <div className="performance-chart">
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '80%' }}></div>
                            </div>
                        </div>
                        <div className="investment-plan">
                            <h3>Growth Pool</h3>
                            <div className="plan-details">
                                <div>Min Deposit: $500</div>
                                <div>ROI: 12-18%</div>
                                <div>Risk: Medium</div>
                            </div>
                            <div className="performance-chart">
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '85%' }}></div>
                                <div className="bar" style={{ height: '95%' }}></div>
                            </div>
                        </div>
                        <div className="investment-plan">
                            <h3>Premium Pool</h3>
                            <div className="plan-details">
                                <div>Min Deposit: $1,000</div>
                                <div>ROI: 18-25%</div>
                                <div>Risk: High</div>
                            </div>
                            <div className="performance-chart">
                                <div className="bar" style={{ height: '80%' }}></div>
                                <div className="bar" style={{ height: '90%' }}></div>
                                <div className="bar" style={{ height: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default InvestmentOpportunityCard;