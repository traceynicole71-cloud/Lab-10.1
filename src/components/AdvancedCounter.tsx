import React, { useState, useEffect } from 'react';

const AdvancedCounter: React.FC = () => {
    const [count, setCount] = useState<number>(() => {
        const saved = localStorage.getItem('currentCount');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [history, setHistory] = useState<number[]>([count]);
    const [step, setStep] = useState<number>(1);
    const [isSaving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        setHistory((prev) => [...prev, count]);
        setSaving(true);
        const timer = setTimeout(() => {
            localStorage.setItem('currentCount', count.toString());
            setSaving(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [count]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'ArrowUp') setCount((prev) => prev + step);
            if (event.key === 'ArrowDown') setCount((prev) => prev - step);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [step]);

    const increment = () => setCount((prev) => prev + step);
    const decrement = () => setCount((prev) => prev - step);
    const reset = () => {
        setCount(0);
        setHistory([0]);
        localStorage.removeItem('currentCount');
    };

    return (
        <div className="counter-card">
            <header>
                <p className="sub-header">COUNTER APP</p>
                <h1 className="main-count">
                    Count: <span>{count}</span>
                </h1>
            </header>

            <div className="button-row">
                <button onClick={decrement} className="btn decrement-btn">-</button>
                <button onClick={increment} className="btn increment-btn">+</button>
                <button onClick={reset} className="btn reset-btn">Reset</button>
            </div>

            <div className="control-row">
                <label htmlFor="stepInput">Step Value:</label>
                <input
                id="stepInput"
                type="number"
                value={step}
                onChange={(e) => setStep(parseInt(e.target.value) || 0)}
                className="step-input"
                />
            </div>

            <div className="status-area">
                {isSaving ? <em>Writing...</em> : <em>Changes Saved.</em>}            
                </div>

        <hr className="divider" />

        <section className="history-box">
            <p className="history-label">History Log:</p>
            <div className="history-list">{history.join(', ')}</div>
        </section>

        <footer className="footer">
            Use ArrowUp/Down to Play.
        </footer>
        </div>
    );
};

export default AdvancedCounter;