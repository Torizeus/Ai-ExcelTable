import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Ai-Ethics Web</h1>
                <p className="intro-text">Explore how artificial intelligence is shaping our world.</p>
            </header>
            <section className="home-content">
                <h2>About AI in the Modern World</h2>
                <p>Artificial Intelligence (AI) is revolutionizing our lives in profound ways. From enhancing everyday convenience through smart home devices to powering advanced medical diagnostics, AI is at the forefront of technological innovation. It enables us to process vast amounts of data, making predictions and decisions faster than ever before.</p>
                <p>AI improves our quality of life by automating mundane tasks, thus freeing up time for more creative and meaningful activities. It enhances efficiency across various sectors, including healthcare, finance, and transportation. For example, AI algorithms are used to detect patterns in medical data, which can lead to earlier diagnosis and better treatment options.</p>
                <p>As AI continues to evolve, it promises to drive significant advancements in science, engineering, and our daily lives. However, it also raises important ethical considerations, making it crucial to address AI's impact on society responsibly.</p>
            </section>
            <footer className="home-footer">
                <p>Choose where you want to go:</p>
                <ul>
                    <li><Link className="home-link" to="/table">Go to Table Page</Link></li>
                    <li><Link className="home-link" to="/SearchPage">Go to Search Page</Link></li>
                </ul>
            </footer>
        </div>
    );
};

export default HomePage;
