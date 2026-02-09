import React, { useState, useEffect } from 'react';

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    // Helper to format image URL
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('/images')) return path;
        const cleanPath = path.replace(/\\/g, '/');
        return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    };

    if (loading) {
        return (
            <section id="portfolio" className="section bg-cream">
                <div className="container">
                    <div className="section-header">
                        <span className="section-eyebrow">Our Work</span>
                        <h2>Featured Projects</h2>
                        <p>Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="section bg-cream">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Our Work</span>
                    <h2>Featured Projects</h2>
                    <p>
                        Explore our collection of premium digital experiences for the
                        hospitality industry.
                    </p>
                </div>

                <div className="portfolio-grid">
                    {projects.map((project, index) => {
                        console.log('Project data:', project); // Debug log
                        return (
                            <div
                                key={project.id || index}
                                className="portfolio-item"
                                onClick={() => openModal(project)}
                            >
                                <div className="portfolio-item-image">
                                    <img src={getImageUrl(project.image)} alt={project.title} />
                                    <div className="portfolio-overlay-hover">
                                        <span>View Project</span>
                                    </div>
                                </div>
                                <div className="portfolio-item-content" style={{
                                    padding: '24px',
                                    textAlign: 'center',
                                    background: '#fff'
                                }}>
                                    <h3 style={{
                                        color: '#1a1a1a',
                                        fontSize: '1.25rem',
                                        marginBottom: '8px'
                                    }}>
                                        {project.title || 'No Title'}
                                    </h3>
                                    <p style={{
                                        color: '#b8965c',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {project.category || 'No Category'}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className="project-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>

                        <div className="modal-header">
                            <h3>{selectedProject.title}</h3>
                            <p>{selectedProject.category}</p>
                        </div>

                        <div className="modal-gallery">
                            <div className="modal-image-wrapper">
                                <img src={getImageUrl(selectedProject.image)} alt="Main view" />
                            </div>
                            {selectedProject.gallery && selectedProject.gallery.map((img, idx) => (
                                <div key={idx} className="modal-image-wrapper">
                                    <img src={getImageUrl(img)} alt={`${selectedProject.title} view ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
