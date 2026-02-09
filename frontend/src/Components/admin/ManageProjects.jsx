import React, { useState, useEffect } from 'react';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image: null,
        featured: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else if (e.target.name === 'featured') {
            setFormData({ ...formData, featured: e.target.checked });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('image', formData.image);
        data.append('featured', formData.featured);

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: data
            });
            if (res.ok) {
                alert('Project Added successfully!');
                setFormData({ title: '', category: '', description: '', image: null, featured: false });
                fetchProjects();
            } else {
                alert('Failed to add project');
            }
        } catch (err) {
            console.error('Error adding project:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                fetchProjects();
            } catch (err) {
                console.error('Error deleting project:', err);
            }
        }
    };

    return (
        <div className="admin-section">
            <h2>Manage Portfolio Projects</h2>

            {/* Add Project Form */}
            <div className="admin-card">
                <h3>Add New Project</h3>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Project Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Project Image</label>
                        <input type="file" name="image" onChange={handleChange} required />
                    </div>
                    <div className="form-group checkbox">
                        <label>
                            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                            Featured Project?
                        </label>
                    </div>
                    <button type="submit" disabled={loading} className="btn-admin">
                        {loading ? 'Adding...' : 'Add Project'}
                    </button>
                </form>
            </div>

            {/* Project List */}
            <div className="project-list">
                <h3>Existing Projects</h3>
                {projects.length === 0 ? <p>No projects found.</p> : (
                    <div className="admin-grid">
                        {projects.map(project => (
                            <div key={project._id} className="admin-item-card">
                                <img src={`/${project.image}`} alt={project.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                <div className="card-content">
                                    <h4>{project.title}</h4>
                                    <p>{project.category}</p>
                                    <button onClick={() => handleDelete(project._id)} className="btn-delete">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProjects;
