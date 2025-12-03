import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { useGamification } from '../../hooks/useGamification';

const LearningSection: React.FC = () => {
    const { state } = useDashboard();
    const { awardBadge } = useGamification();

    const handleCourseComplete = (courseId: string) => {
        // Award badge for first course completion
        if (courseId === 'c1') {
            awardBadge('badge_001');
        }
        // Award badge for 5 courses completed
        const completedCourses = state.courses.filter(c => c.completed).length;
        if (completedCourses === 5) {
            awardBadge('badge_002');
        }
    };

    const ongoing = state.courses.filter(c => !c.completed && c.progress > 0);
    const nextCourse = ongoing.length > 0 ? ongoing[0] : state.courses[1];

    return (
        <div className="learning-section">
            <h2>Learning</h2>

            <div className="learning-header">
                <h3>Continue Where You Left Off</h3>
                {nextCourse && (
                    <div className="continue-card">
                        <div className="course-icon">
                            <i className={`fas fa-${nextCourse.icon}`}></i>
                        </div>
                        <div className="course-info">
                            <h4>{nextCourse.title}</h4>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${nextCourse.progress}%` }}
                                ></div>
                            </div>
                            <span>{nextCourse.progress}% complete</span>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={() => handleCourseComplete(nextCourse.id)}
                        >
                            Resume
                        </button>
                    </div>
                )}
            </div>

            <div className="tracks">
                <h4>Your Learning Tracks</h4>
                <div className="track-grid">
                    {(['beginner', 'intermediate', 'pro'] as const).map((track) => {
                        const courses = state.courses.filter(c => c.category === track);
                        const completed = courses.filter(c => c.completed).length;
                        const total = courses.length;
                        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

                        return (
                            <div key={track} className="track-card">
                                <h5>{track.charAt(0).toUpperCase() + track.slice(1)}</h5>
                                <div className="track-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <span>{completed}/{total} completed</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="badges">
                <h4>Your Badges</h4>
                <div className="badge-grid">
                    {state.user?.badges.map((badge, i) => (
                        <div key={i} className="badge-item">
                            <i className="fas fa-medal"></i>
                            <span>{badge}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="course-list">
                <h4>All Courses</h4>
                <div className="course-grid">
                    {state.courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <div className="course-header">
                                <h4>{course.title}</h4>
                                <span className={`status ${course.completed ? 'completed' : 'in-progress'}`}>
                                    {course.completed ? 'Completed' : 'In Progress'}
                                </span>
                            </div>
                            <div className="course-progress">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <span>{course.progress}%</span>
                            </div>
                            <button
                                className="btn-secondary"
                                onClick={() => handleCourseComplete(course.id)}
                            >
                                {course.completed ? 'Review' : 'Continue'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningSection;