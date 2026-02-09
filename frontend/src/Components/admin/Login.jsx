import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Temporary hardcoded credential for MVP
        // Replace with real backend auth in production
        if (username === 'admin' && password === 'admin123') {
            onLogin(true);
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Admin Login</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.group}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.group}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.btn}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' },
    card: { background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    group: { marginBottom: '20px' },
    input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px' },
    btn: { width: '100%', padding: '12px', background: '#B8965C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    error: { color: 'red', marginBottom: '15px' }
};

export default Login;
