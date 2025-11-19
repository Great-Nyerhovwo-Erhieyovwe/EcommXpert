import React from 'react';
import { useEmail } from '../../hooks/useEmail';

const PreferenceCenter: React.FC = () => {
    const { state, updatePreference } = useEmail();
    const [activeCategory, setActiveCategory] = React.useState('all');

    const categories = ['all', 'welcome', 'course', 'investment', 'security', 'marketing'];
    const categoryLabels: Record<string, string> = {
        all: 'All Preferences',
        welcome: 'Welcome Emails',
        course: 'Course Updates',
        investment: 'Investment Alerts',
        security: 'Security Notifications',
        marketing: 'Marketing & Offers',
    };

    const filteredPreferences = activeCategory === 'all'
        ? state.preferences
        : state.preferences.filter(p => p.category === activeCategory);

    const handlePreferenceChange = (categoryId: string, enabled: boolean) => {
        updatePreference('usr_001', categoryId, enabled);
    };

    return (
        <div className="preference-center">
            <div className="preference-header">
                <h3>Email Preference Center</h3>
                <p>Control what emails you receive</p>
            </div>

            <div className="category-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={activeCategory === category ? 'active' : ''}
                        onClick={() => setActiveCategory(category)}
                    >
                        {categoryLabels[category]}
                    </button>
                ))}
            </div>

            <div className="preference-list">
                {filteredPreferences.map(pref => (
                    <div key={pref.id} className="preference-item">
                        <div className="preference-info">
                            <h4>{categoryLabels[pref.category]}</h4>
                            <p>
                                {pref.category === 'welcome' && 'Receive welcome emails when you sign up'}
                                {pref.category === 'course' && 'Get updates about your courses and progress'}
                                {pref.category === 'investment' && 'Receive investment performance updates'}
                                {pref.category === 'security' && 'Get critical security alerts'}
                                {pref.category === 'marketing' && 'Receive promotional offers and newsletters'}
                            </p>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={pref.enabled}
                                onChange={(e) => handlePreferenceChange(pref.category, e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="preference-actions">
                <button className="btn-secondary">
                    Export Preferences
                </button>
                <button className="btn-danger">
                    Unsubscribe from All
                </button>
            </div>
        </div>
    );
};

export default PreferenceCenter;