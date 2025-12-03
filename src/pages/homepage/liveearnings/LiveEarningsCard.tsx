const LiveEarningsCard = () => {
    // Mock earnings data
    const earningsData = [
        { user: 'Sarah J.', amount: '$12,450', platform: 'Crypto', date: '2 hours ago' },
        { user: 'Michael C.', amount: '$8,920', platform: 'E-commerce', date: '4 hours ago' },
        { user: 'Emma R.', amount: '$15,680', platform: 'Investment', date: '6 hours ago' },
        { user: 'David K.', amount: '$9,340', platform: 'Crypto', date: '8 hours ago' },
        { user: 'James W.', amount: '$22,150', platform: 'E-commerce', date: '12 hours ago' },
        { user: 'Adam L.', amount: '$72,050', platform: 'Investment', date: '1 hours ago' },
        { user: 'Ritesh K.', amount: '$9,700', platform: 'E-commerce', date: '12 hours ago' },
        { user: 'Olivia P.', amount: '$66,320', platform: 'Crypto', date: '11 hours ago' },
        // { user: 'Annalisa L.', amount: '$32,900', platform: 'Crypto', date: '8 hours ago' },
        // { user: 'Wilson Z.', amount: '$30,000', platform: 'E-commerce', date: '19 hours ago' },
        // { user: 'Lucas L.', amount: '$52,400', platform: 'Investment', date: '3 hours ago' },
        // { user: 'Boss B.', amount: '$11,000', platform: 'E-commerce', date: '9 hours ago' },
    ];

    return (
        <>
            {/* Live Earnings Section */}
            <section className="live-earnings">
                <div className="container">
                    <h2>Real User Earnings - Live Updates</h2>
                    <div className="earnings-grid">
                        {earningsData.map((earning, index) => (
                            <div key={index} className="earning-card">
                                <div className="user-info">
                                    <div className="user-avatar">👤</div>
                                    <div className="user-details">
                                        <h4>{earning.user}</h4>
                                        <p className="platform">{earning.platform}</p>
                                    </div>
                                </div>
                                <div className="earning-amount">
                                    <span className="amount">{earning.amount}</span>
                                    <span className="date">{earning.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default LiveEarningsCard;