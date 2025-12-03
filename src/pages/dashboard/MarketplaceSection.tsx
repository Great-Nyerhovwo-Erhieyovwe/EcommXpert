import React from 'react';
// import { useDashboard } from '../../hooks/useDashboard';

const MarketplaceSection: React.FC = () => {
    const trendingProducts = [
        { name: 'Smart Fitness Tracker', profitMargin: '68%', demand: 'High', image: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Eco-Friendly Water Bottle', profitMargin: '72%', demand: 'Very High', image: 'https://i.pravatar.cc/150?img=2' },
        { name: 'Phone Grip Stand', profitMargin: '85%', demand: 'Medium', image: 'https://i.pravatar.cc/150?img=3' },
    ];

    return (
        <div className="marketplace-section">
            <h2>Marketplace</h2>

            <div className="marketplace-header">
                <h3>Trending Products</h3>
                <button className="btn-primary">Build Demo Store</button>
            </div>

            <div className="product-grid">
                {trendingProducts.map((product, i) => (
                    <div key={i} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <div className="product-meta">
                            <span className="profit">{product.profitMargin} margin</span>
                            <span className={`demand ${product.demand.toLowerCase()}`}>{product.demand}</span>
                        </div>
                        <button className="btn-outline">Test in Simulator</button>
                    </div>
                ))}
            </div>

            <div className="demo-tutorial">
                <h4>💡 Tip: Use our Demo Store Simulator to test pricing, ads, and funnels before launching.</h4>
            </div>
        </div>
    );
};

export default MarketplaceSection;