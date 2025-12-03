const Partnership = () => {

    return (
        <>
            {/* Trust Strip with Partners */}
            <section className="trust-strip">
                <div className="trust-container">
                    <p>Trusted by over 20,000+ e-commerce learners, creators, and investors worldwide.</p>

                    {/* Partners Logos */}
                    <div className="partners-section">
                        <h3>Partners & Sponsors</h3>
                        <div className="partners-logos">
                            <div className="partner-logo">Binance</div>
                            <div className="partner-logo">CBOE</div>
                            <div className="partner-logo">Coinbase</div>
                            <div className="partner-logo">Shopify</div>
                            <div className="partner-logo">Amazon</div>
                            <div className="partner-logo">Ebay</div>
                        </div>
                    </div>

                    <div className="rating">
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <span>4.9/5 Satisfaction Score</span>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Partnership;