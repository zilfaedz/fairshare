import React from 'react';
import { useAppData } from '../context/AppDataContext';

const Dashboard = () => {
    const { chores, expenses } = useAppData();

    // Calculate stats
    const today = new Date().toISOString().split('T')[0];
    const tasksDueToday = chores.filter(chore => chore.date === today && chore.status !== 'completed').length;

    const currentMonth = new Date().getMonth();
    const monthlyExpense = expenses
        .filter(expense => new Date(expense.date).getMonth() === currentMonth)
        .reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

    const tasksCompleted = chores.filter(chore => chore.status === 'completed').length;
    const tasksOverdue = chores.filter(chore => chore.date < today && chore.status !== 'completed').length;

    return (
        <div className="dashboard-container">
            <div className="welcome-banner">
                <div className="welcome-text">
                    <h1>Hello, <strong>User!</strong></h1>
                    <p>You're holding up your end of the bargain. Check your Chore Queue to keep the balance.</p>
                </div>
                <div className="welcome-circle"></div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card personal-card">
                    <h3>Personal Dashboard</h3>
                    <p className="card-subtitle">View and manage your profile information and account details.</p>
                    <hr />
                    <div className="info-group">
                        <label>Email</label>
                        <p className="info-value">user@email.com</p>
                    </div>
                    <div className="info-group">
                        <label>Account status</label>
                        <span className="status-badge active">Active</span>
                    </div>
                    <button className="card-button">View Details</button>
                </div>

                <div className="dashboard-card stats-card">
                    <h3>Chores & Expenses</h3>
                    <p className="card-subtitle">Track and manage your upcoming tasks and spending.</p>
                    <hr />
                    <div className="stat-row">
                        <span>Tasks due today</span>
                        <span className="stat-badge">{tasksDueToday}</span>
                    </div>
                    <div className="stat-row">
                        <span>Monthly Expense</span>
                        <span className="stat-badge expense">${monthlyExpense.toFixed(2)}</span>
                    </div>
                    <div className="stat-row">
                        <span>Budget Remaining</span>
                        <span className="stat-badge budget">$ 760</span>
                    </div>
                    <div className="card-actions">
                        <button className="action-button">Manage Expenses</button>
                        <button className="action-button">Manage Chores</button>
                    </div>
                </div>
            </div>

            <div className="summary-grid">
                <div className="summary-card">
                    <h4>Tasks Completed</h4>
                    <div className="summary-value-box">{tasksCompleted}</div>
                </div>
                <div className="summary-card">
                    <h4>Tasks Overdue</h4>
                    <div className="summary-value-box">{tasksOverdue}</div>
                </div>
                <div className="summary-card">
                    <h4>Date</h4>
                    <div className="summary-value-box date-box">
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
