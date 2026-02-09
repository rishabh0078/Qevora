import React, { useState, useEffect } from 'react';
import '../admin.css';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);

    // Login state
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Project form
    const [projectForm, setProjectForm] = useState({
        title: '', category: '', description: '', image: null, gallery: []
    });
    const [editingProject, setEditingProject] = useState(null); // Track which project is being edited

    // Service form
    const [serviceForm, setServiceForm] = useState({
        title: '',
        description: '',
        featuresText: '', // Store features as text (one per line)
        icon: '',
        order: 0
    });
    const [editingService, setEditingService] = useState(null);

    // Package form
    const [packageForm, setPackageForm] = useState({
        name: '',
        price: '',
        description: '',
        featuresText: '',
        featured: false,
        order: 0
    });
    const [editingPackage, setEditingPackage] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects();
            fetchServices();
            fetchPackages();
        }
    }, [isAuthenticated]);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const fetchPackages = async () => {
        try {
            const res = await fetch('/api/packages');
            const data = await res.json();
            setPackages(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.username === 'admin' && loginData.password === 'admin123') {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Invalid credentials');
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', projectForm.title);
        formData.append('category', projectForm.category);
        formData.append('description', projectForm.description);
        formData.append('image', projectForm.image);

        // Append gallery files
        if (projectForm.gallery) {
            projectForm.gallery.forEach(file => {
                formData.append('gallery', file);
            });
        }

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                alert('Project added!');
                setProjectForm({ title: '', category: '', description: '', image: null, gallery: [] });
                fetchProjects();
            }
        } catch (err) {
            alert('Error adding project');
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project.id);
        setProjectForm({
            title: project.title,
            category: project.category,
            description: project.description || '',
            image: null, // Don't pre-fill file inputs
            gallery: []
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', projectForm.title);
        formData.append('category', projectForm.category);
        formData.append('description', projectForm.description);

        // Only append new image if one was selected
        if (projectForm.image) {
            formData.append('image', projectForm.image);
        }

        // Only append new gallery if images were selected
        if (projectForm.gallery && projectForm.gallery.length > 0) {
            projectForm.gallery.forEach(file => {
                formData.append('gallery', file);
            });
        }

        try {
            const res = await fetch(`/api/projects/${editingProject}`, {
                method: 'PUT',
                body: formData
            });
            if (res.ok) {
                alert('Project updated!');
                setProjectForm({ title: '', category: '', description: '', image: null, gallery: [] });
                setEditingProject(null);
                fetchProjects();
            }
        } catch (err) {
            alert('Error updating project');
        }
    };

    const handleCancelEdit = () => {
        setEditingProject(null);
        setProjectForm({ title: '', category: '', description: '', image: null, gallery: [] });
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Delete this project?')) {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            fetchProjects();
        }
    };

    // Helper to format image URL
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('/images')) return path;
        const cleanPath = path.replace(/\\/g, '/');
        return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    };

    // LOGIN SCREEN
    if (!isAuthenticated) {
        return (
            <div className="admin-login-page">
                <div className="admin-login-card">
                    <div className="login-header">
                        <h1>QEVORA</h1>
                        <p>Admin Portal</p>
                    </div>
                    {loginError && <div className="login-error">{loginError}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="Enter password"
                            />
                        </div>
                        <button type="submit" className="login-btn">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }

    // Service handlers
    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            // Convert features text to array
            const features = serviceForm.featuresText
                .split('\n')
                .map(f => f.trim())
                .filter(f => f.length > 0);

            const serviceData = {
                title: serviceForm.title,
                description: serviceForm.description,
                features: features,
                icon: serviceForm.icon,
                order: parseInt(serviceForm.order) || 0
            };

            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            });

            if (res.ok) {
                alert('Service added successfully!');
                setServiceForm({ title: '', description: '', featuresText: '', icon: '', order: 0 });
                fetchServices();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to add service');
        }
    };

    const handleEditService = (service) => {
        setEditingService(service.id);
        setServiceForm({
            title: service.title,
            description: service.description,
            featuresText: service.features ? service.features.join('\n') : '',
            icon: service.icon || '',
            order: service.order || 0
        });
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateService = async (e) => {
        e.preventDefault();
        try {
            // Convert features text to array
            const features = serviceForm.featuresText
                .split('\n')
                .map(f => f.trim())
                .filter(f => f.length > 0);

            const serviceData = {
                title: serviceForm.title,
                description: serviceForm.description,
                features: features,
                icon: serviceForm.icon,
                order: parseInt(serviceForm.order) || 0
            };

            const res = await fetch(`/api/services/${editingService}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            });

            if (res.ok) {
                alert('Service updated successfully!');
                setServiceForm({ title: '', description: '', featuresText: '', icon: '', order: 0 });
                setEditingService(null);
                fetchServices();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to update service');
        }
    };

    const handleCancelEditService = () => {
        setEditingService(null);
        setServiceForm({ title: '', description: '', featuresText: '', icon: '', order: 0 });
    };

    const handleDeleteService = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const res = await fetch(`/api/services/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                alert('Service deleted successfully!');
                fetchServices();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to delete service');
        }
    };

    // Package handlers
    const handleAddPackage = async (e) => {
        e.preventDefault();
        try {
            const features = packageForm.featuresText
                .split('\n')
                .map(f => f.trim())
                .filter(f => f.length > 0);

            const packageData = {
                name: packageForm.name,
                price: packageForm.price,
                description: packageForm.description,
                features: features,
                featured: packageForm.featured,
                order: parseInt(packageForm.order) || 0
            };

            const res = await fetch('/api/packages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(packageData)
            });

            if (res.ok) {
                alert('Package added successfully!');
                setPackageForm({ name: '', price: '', description: '', featuresText: '', featured: false, order: 0 });
                fetchPackages();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to add package');
        }
    };

    const handleEditPackage = (pkg) => {
        setEditingPackage(pkg.id);
        setPackageForm({
            name: pkg.name,
            price: pkg.price,
            description: pkg.description,
            featuresText: pkg.features ? pkg.features.join('\n') : '',
            featured: pkg.featured || false,
            order: pkg.order || 0
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdatePackage = async (e) => {
        e.preventDefault();
        try {
            const features = packageForm.featuresText
                .split('\n')
                .map(f => f.trim())
                .filter(f => f.length > 0);

            const packageData = {
                name: packageForm.name,
                price: packageForm.price,
                description: packageForm.description,
                features: features,
                featured: packageForm.featured,
                order: parseInt(packageForm.order) || 0
            };

            const res = await fetch(`/api/packages/${editingPackage}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(packageData)
            });

            if (res.ok) {
                alert('Package updated successfully!');
                setPackageForm({ name: '', price: '', description: '', featuresText: '', featured: false, order: 0 });
                setEditingPackage(null);
                fetchPackages();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to update package');
        }
    };

    const handleCancelEditPackage = () => {
        setEditingPackage(null);
        setPackageForm({ name: '', price: '', description: '', featuresText: '', featured: false, order: 0 });
    };

    const handleDeletePackage = async (id) => {
        if (!confirm('Are you sure you want to delete this package?')) return;

        try {
            const res = await fetch(`/api/packages/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                alert('Package deleted successfully!');
                fetchPackages();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to delete package');
        }
    };

    // DASHBOARD
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <h2>QEVORA</h2>
                    <span>Admin Panel</span>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={activeTab === 'projects' ? 'active' : ''}
                        onClick={() => setActiveTab('projects')}
                    >
                        📁 Projects
                    </button>
                    <button
                        className={activeTab === 'services' ? 'active' : ''}
                        onClick={() => setActiveTab('services')}
                    >
                        ⚙️ Services
                    </button>
                    <button
                        className={activeTab === 'packages' ? 'active' : ''}
                        onClick={() => setActiveTab('packages')}
                    >
                        💰 Pricing Packages
                    </button>
                </nav>
                <button className="logout-btn" onClick={() => setIsAuthenticated(false)}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {activeTab === 'projects' && (
                    <div className="admin-section">
                        <h2>Manage Projects</h2>

                        {/* Add/Edit Project Form */}
                        <div className="admin-card">
                            <h3>{editingProject ? '✏️ Edit Project' : 'Add New Project'}</h3>
                            {editingProject && (
                                <div style={{
                                    padding: '10px',
                                    background: '#fff3cd',
                                    border: '1px solid #ffc107',
                                    borderRadius: '4px',
                                    marginBottom: '15px',
                                    color: '#856404'
                                }}>
                                    ⚠️ Editing mode: Leave image fields empty to keep existing images
                                </div>
                            )}
                            <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} className="admin-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={projectForm.title}
                                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input
                                            type="text"
                                            value={projectForm.category}
                                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                                            placeholder="e.g., Wedding Venue"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={projectForm.description}
                                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Cover Image {editingProject && '(Optional - leave empty to keep current)'}</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files[0] })}
                                        required={!editingProject}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gallery Images {editingProject ? '(Optional - leave empty to keep current)' : '(Optional)'}</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => setProjectForm({ ...projectForm, gallery: Array.from(e.target.files) })}
                                    />
                                    <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                        Select multiple images for the project popup gallery.
                                    </small>
                                    {projectForm.gallery && projectForm.gallery.length > 0 && (
                                        <>
                                            <div style={{
                                                marginTop: '10px',
                                                padding: '10px',
                                                background: '#f0f9ff',
                                                border: '1px solid #b8965c',
                                                borderRadius: '4px',
                                                color: '#1a1a1a'
                                            }}>
                                                ✓ {projectForm.gallery.length} image{projectForm.gallery.length !== 1 ? 's' : ''} selected
                                            </div>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                                gap: '10px',
                                                marginTop: '15px'
                                            }}>
                                                {projectForm.gallery.map((file, index) => (
                                                    <div key={index} style={{
                                                        position: 'relative',
                                                        paddingTop: '100%',
                                                        border: '2px solid #e0e0e0',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        background: '#f5f5f5'
                                                    }}>
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Gallery ${index + 1}`}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newGallery = projectForm.gallery.filter((_, i) => i !== index);
                                                                setProjectForm({ ...projectForm, gallery: newGallery });
                                                            }}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '5px',
                                                                right: '5px',
                                                                background: 'rgba(255, 0, 0, 0.8)',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                width: '24px',
                                                                height: '24px',
                                                                cursor: 'pointer',
                                                                fontSize: '14px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn-primary">
                                        {editingProject ? 'Update Project' : 'Add Project'}
                                    </button>
                                    {editingProject && (
                                        <button type="button" onClick={handleCancelEdit} className="btn-outline" style={{
                                            padding: '12px 24px',
                                            background: 'transparent',
                                            border: '2px solid #999',
                                            color: '#666',
                                            cursor: 'pointer',
                                            borderRadius: '4px'
                                        }}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>



                        {/* Project List */}
                        <div className="admin-card">
                            <h3>Existing Projects ({projects.length})</h3>
                            <div className="project-grid">
                                {projects.map(project => (
                                    <div key={project.id} className="project-item">
                                        <img src={getImageUrl(project.image)} alt={project.title} />
                                        <div className="project-info">
                                            <h4>{project.title}</h4>
                                            <p>{project.category}</p>
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                                <button onClick={() => handleEditProject(project)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteProject(project.id)} className="btn-danger">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                )}

                {
                    activeTab === 'services' && (
                        <div className="admin-section">
                            <h2>Manage Services</h2>

                            {/* Add/Edit Service Form */}
                            <div className="admin-card">
                                <h3>{editingService ? '✏️ Edit Service' : 'Add New Service'}</h3>
                                {editingService && (
                                    <div style={{
                                        padding: '10px',
                                        background: '#fff3cd',
                                        border: '1px solid #ffc107',
                                        borderRadius: '4px',
                                        marginBottom: '15px',
                                        color: '#856404'
                                    }}>
                                        ⚠️ Editing mode: Update service details below
                                    </div>
                                )}
                                <form onSubmit={editingService ? handleUpdateService : handleAddService} className="admin-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Service Title</label>
                                            <input
                                                type="text"
                                                value={serviceForm.title}
                                                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                                                placeholder="e.g., Wedding Venue Websites"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Display Order</label>
                                            <input
                                                type="number"
                                                value={serviceForm.order}
                                                onChange={(e) => setServiceForm({ ...serviceForm, order: e.target.value })}
                                                placeholder="0"
                                                min="0"
                                            />
                                            <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                                Lower numbers appear first
                                            </small>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={serviceForm.description}
                                            onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                            rows="3"
                                            placeholder="Brief description of the service"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Icon (Optional)</label>
                                        <input
                                            type="text"
                                            value={serviceForm.icon}
                                            onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                                            placeholder="e.g., 🏰 or icon class name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Features (one per line)</label>
                                        <textarea
                                            value={serviceForm.featuresText}
                                            onChange={(e) => setServiceForm({ ...serviceForm, featuresText: e.target.value })}
                                            rows="5"
                                            placeholder="Virtual venue tours&#10;Package & pricing displays&#10;Inquiry & booking forms&#10;Photo & video galleries"
                                        ></textarea>
                                        <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                            Enter each feature on a new line
                                        </small>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" className="btn-primary">
                                            {editingService ? 'Update Service' : 'Add Service'}
                                        </button>
                                        {editingService && (
                                            <button type="button" onClick={handleCancelEditService} className="btn-outline" style={{
                                                padding: '12px 24px',
                                                background: 'transparent',
                                                border: '2px solid #999',
                                                color: '#666',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Service List */}
                            <div className="admin-card">
                                <h3>Existing Services ({services.length})</h3>
                                {services.length === 0 ? (
                                    <p style={{ color: '#666', fontStyle: 'italic' }}>No services added yet. Add your first service above!</p>
                                ) : (
                                    <div className="project-grid">
                                        {services.map(service => (
                                            <div key={service.id} className="project-item" style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                padding: '20px',
                                                background: '#fff'
                                            }}>
                                                <div style={{ flex: 1 }}>
                                                    {service.icon && (
                                                        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                                                            {service.icon}
                                                        </div>
                                                    )}
                                                    <h4 style={{ marginBottom: '8px', color: '#1a1a1a' }}>{service.title}</h4>
                                                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '12px' }}>
                                                        {service.description}
                                                    </p>
                                                    {service.features && service.features.length > 0 && (
                                                        <ul style={{
                                                            listStyle: 'none',
                                                            padding: 0,
                                                            margin: '12px 0',
                                                            fontSize: '0.85rem',
                                                            color: '#555'
                                                        }}>
                                                            {service.features.map((feature, idx) => (
                                                                <li key={idx} style={{ marginBottom: '4px' }}>
                                                                    <span style={{ color: '#b8965c', marginRight: '6px' }}>✓</span>
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    <div style={{
                                                        fontSize: '0.75rem',
                                                        color: '#999',
                                                        marginTop: '8px',
                                                        paddingTop: '8px',
                                                        borderTop: '1px solid #f0f0f0'
                                                    }}>
                                                        Order: {service.order}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                                                    <button
                                                        onClick={() => handleEditService(service)}
                                                        className="btn-primary"
                                                        style={{ padding: '8px 16px', fontSize: '14px', flex: 1 }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteService(service.id)}
                                                        className="btn-danger"
                                                        style={{ flex: 1 }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }

                {/* Packages Tab */}
                {
                    activeTab === 'packages' && (
                        <div className="admin-section">
                            <h2>Manage Pricing Packages</h2>

                            {/* Add/Edit Package Form */}
                            <div className="admin-card">
                                <h3>{editingPackage ? '✏️ Edit Package' : 'Add New Pricing Package'}</h3>
                                {editingPackage && (
                                    <div style={{
                                        padding: '10px',
                                        background: '#fff3cd',
                                        border: '1px solid #ffc107',
                                        borderRadius: '4px',
                                        marginBottom: '15px',
                                        color: '#856404'
                                    }}>
                                        ⚠️ Editing mode: Update package details below
                                    </div>
                                )}
                                <form onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage} className="admin-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Package Name</label>
                                            <input
                                                type="text"
                                                value={packageForm.name}
                                                onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                                                placeholder="e.g., The Essential"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input
                                                type="text"
                                                value={packageForm.price}
                                                onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                                                placeholder="e.g., Starting from ₹45,000"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={packageForm.description}
                                            onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                                            rows="2"
                                            placeholder="Brief description of the package"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Features (one per line)</label>
                                        <textarea
                                            value={packageForm.featuresText}
                                            onChange={(e) => setPackageForm({ ...packageForm, featuresText: e.target.value })}
                                            rows="6"
                                            placeholder="Luxury Responsive Website&#10;Premium Animations & UI&#10;Contact Form Integration&#10;SEO Optimization"
                                        ></textarea>
                                        <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                            Enter each feature on a new line
                                        </small>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Display Order</label>
                                            <input
                                                type="number"
                                                value={packageForm.order}
                                                onChange={(e) => setPackageForm({ ...packageForm, order: e.target.value })}
                                                placeholder="0"
                                                min="0"
                                            />
                                            <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                                Lower numbers appear first
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={packageForm.featured}
                                                    onChange={(e) => setPackageForm({ ...packageForm, featured: e.target.checked })}
                                                    style={{ marginRight: '8px', width: '20px', height: '20px' }}
                                                />
                                                <span>Mark as Featured (highlighted)</span>
                                            </label>
                                            <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                                Featured packages get gold styling
                                            </small>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" className="btn-primary">
                                            {editingPackage ? 'Update Package' : 'Add Package'}
                                        </button>
                                        {editingPackage && (
                                            <button type="button" onClick={handleCancelEditPackage} className="btn-outline" style={{
                                                padding: '12px 24px',
                                                background: 'transparent',
                                                border: '2px solid #999',
                                                color: '#666',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Package List */}
                            <div className="admin-card">
                                <h3>Existing Packages ({packages.length})</h3>
                                {packages.length === 0 ? (
                                    <p style={{ color: '#666', fontStyle: 'italic' }}>No packages added yet. Add your first pricing package above!</p>
                                ) : (
                                    <div className="project-grid">
                                        {packages.map(pkg => (
                                            <div key={pkg.id} className="project-item" style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                border: pkg.featured ? '2px solid #b8965c' : '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                padding: '20px',
                                                background: pkg.featured ? '#fffbf0' : '#fff',
                                                position: 'relative'
                                            }}>
                                                {pkg.featured && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '-10px',
                                                        right: '20px',
                                                        background: '#b8965c',
                                                        color: '#fff',
                                                        padding: '4px 12px',
                                                        borderRadius: '12px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        ⭐ FEATURED
                                                    </div>
                                                )}
                                                <div style={{ flex: 1 }}>
                                                    <h4 style={{ marginBottom: '8px', color: '#1a1a1a', fontSize: '1.2rem' }}>{pkg.name}</h4>
                                                    <p style={{ color: '#b8965c', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>
                                                        {pkg.price}
                                                    </p>
                                                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '12px' }}>
                                                        {pkg.description}
                                                    </p>
                                                    {pkg.features && pkg.features.length > 0 && (
                                                        <ul style={{
                                                            listStyle: 'none',
                                                            padding: 0,
                                                            margin: '12px 0',
                                                            fontSize: '0.85rem',
                                                            color: '#555'
                                                        }}>
                                                            {pkg.features.map((feature, idx) => (
                                                                <li key={idx} style={{ marginBottom: '4px' }}>
                                                                    <span style={{ color: '#b8965c', marginRight: '6px' }}>✓</span>
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    <div style={{
                                                        fontSize: '0.75rem',
                                                        color: '#999',
                                                        marginTop: '8px',
                                                        paddingTop: '8px',
                                                        borderTop: '1px solid #f0f0f0'
                                                    }}>
                                                        Order: {pkg.order} | Featured: {pkg.featured ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                                                    <button
                                                        onClick={() => handleEditPackage(pkg)}
                                                        className="btn-primary"
                                                        style={{ padding: '8px 16px', fontSize: '14px', flex: 1 }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePackage(pkg.id)}
                                                        className="btn-danger"
                                                        style={{ flex: 1 }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </main >
        </div >
    );
};

export default Admin;
