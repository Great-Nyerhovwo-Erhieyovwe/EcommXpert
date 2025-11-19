import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const CourseManagement: React.FC = () => {
    const { state, dispatch } = useAdmin();
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState('all');
    const [showCreateModal, setShowCreateModal] = React.useState(false);

    const filteredCourses = state.courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'published' && course.status === 'published') ||
            (filter === 'draft' && course.status === 'draft');
        return matchesSearch && matchesFilter;
    });

    const handleStatusChange = (courseId: string, newStatus: 'published' | 'draft' | 'archived') => {
        const updatedCourses = state.courses.map(course =>
            course.id === courseId ? { ...course, status: newStatus } : course
        );
        dispatch({ courses: updatedCourses });
    };

    return (
        <div className="course-management">
            <div className="admin-header-actions">
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Courses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                    + Create Course
                </button>
            </div>

            <div className="course-grid">
                {filteredCourses.map(course => (
                    <div key={course.id} className="course-card">
                        <div className="course-header">
                            <h3>{course.title}</h3>
                            <span className={`status-badge ${course.status}`}>
                                {course.status}
                            </span>
                        </div>
                        <p className="course-description">{course.description}</p>
                        <div className="course-meta">
                            <div className="meta-item">
                                <i className="fas fa-user"></i>
                                <span>{course.instructor}</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-graduation-cap"></i>
                                <span>{course.modules} modules</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-users"></i>
                                <span>{course.enrolled} enrolled</span>
                            </div>
                        </div>
                        <div className="course-stats">
                            <div className="stat">
                                <span>Completion</span>
                                <strong>{course.completionRate}%</strong>
                            </div>
                            <div className="stat">
                                <span>Revenue</span>
                                <strong>${course.revenue.toLocaleString()}</strong>
                            </div>
                        </div>
                        <div className="course-actions">
                            <button className="action-btn edit">Edit</button>
                            {course.status === 'published' ? (
                                <button
                                    className="action-btn draft"
                                    onClick={() => handleStatusChange(course.id, 'draft')}
                                >
                                    Unpublish
                                </button>
                            ) : (
                                <button
                                    className="action-btn publish"
                                    onClick={() => handleStatusChange(course.id, 'published')}
                                >
                                    Publish
                                </button>
                            )}
                            <button className="action-btn delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Create New Course</h3>
                            <button onClick={() => setShowCreateModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Course Title</label>
                                    <input type="text" placeholder="Enter course title" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea placeholder="Enter course description" rows={3}></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select>
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Pro</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Instructor</label>
                                        <input type="text" placeholder="Instructor name" />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">Create Course</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;