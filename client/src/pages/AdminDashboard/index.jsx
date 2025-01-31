import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('opportunities');
    const [searchTerm, setSearchTerm] = useState('');

    // Demo data - replace with actual API calls
    const stats = {
        totalOpportunities: 156,
        activeOpportunities: 89,
        totalUsers: 1234,
        totalApplications: 567,
        pendingReports: 12
    };

    const recentOpportunities = [
        { id: 1, title: 'Software Engineer Intern', status: 'active', date: '2024-03-15' },
        { id: 2, title: 'Data Science Workshop', status: 'pending', date: '2024-03-14' },
        { id: 3, title: 'UI/UX Design Contest', status: 'active', date: '2024-03-13' },
    ];

    const recentUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-03-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-03-14' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', joinDate: '2024-03-13' },
    ];

    const reportedItems = [
        {
            id: 1,
            type: 'opportunity',
            itemTitle: 'Software Engineer Intern',
            reportedBy: 'user123@email.com',
            reason: 'Misleading information',
            date: '2024-03-15',
            status: 'pending',
            description: 'The job description contains incorrect salary information'
        },
        {
            id: 2,
            type: 'user',
            itemTitle: 'John Smith',
            reportedBy: 'alice@email.com',
            reason: 'Harassment',
            date: '2024-03-14',
            status: 'pending',
            description: 'Sending inappropriate messages in comments'
        },
        {
            id: 3,
            type: 'application',
            itemTitle: 'Data Science Workshop',
            reportedBy: 'jane@email.com',
            reason: 'Spam',
            date: '2024-03-13',
            status: 'resolved',
            description: 'Multiple spam applications submitted'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Navbar />
            <div className="container mx-auto px-4 py-6 mt-20">
                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Opportunities"
                        value={stats.totalOpportunities}
                        icon="📊"
                        color="blue"
                    />
                    <StatCard
                        title="Active Opportunities"
                        value={stats.activeOpportunities}
                        icon="✅"
                        color="green"
                    />
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon="👥"
                        color="indigo"
                    />
                    <StatCard
                        title="Total Applications"
                        value={stats.totalApplications}
                        icon="📝"
                        color="purple"
                    />
                    <StatCard
                        title="Pending Reports"
                        value={stats.pendingReports}
                        icon="⚠️"
                        color="yellow"
                    />
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-md backdrop-blur-sm bg-opacity-90 p-6">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 border-b mb-6">
                        <TabButton
                            label="Opportunities"
                            active={activeTab === 'opportunities'}
                            onClick={() => setActiveTab('opportunities')}
                        />
                        <TabButton
                            label="Users"
                            active={activeTab === 'users'}
                            onClick={() => setActiveTab('users')}
                        />
                        <TabButton
                            label="Applications"
                            active={activeTab === 'applications'}
                            onClick={() => setActiveTab('applications')}
                        />
                        <TabButton
                            label="Reports"
                            active={activeTab === 'reports'}
                            onClick={() => setActiveTab('reports')}
                        />
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6 relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Content based on active tab */}
                    {activeTab === 'opportunities' && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentOpportunities.map((opp) => (
                                        <tr key={opp.id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">{opp.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${opp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {opp.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{opp.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-200">Edit</button>
                                                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.joinDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-200">Edit</button>
                                                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="text-center py-8 text-gray-500">
                            Applications tab content will go here
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div className="overflow-x-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Reported Items</h2>
                                <div className="flex gap-2">
                                    <select
                                        className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
                                        onChange={(e) => console.log('Filter by:', e.target.value)}
                                    >
                                        <option value="all">All Types</option>
                                        <option value="opportunity">Opportunities</option>
                                        <option value="user">Users</option>
                                        <option value="application">Applications</option>
                                    </select>
                                    <select
                                        className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
                                        onChange={(e) => console.log('Status:', e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                            </div>
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reportedItems.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${report.type === 'opportunity' ? 'bg-blue-100 text-blue-800' :
                                                        report.type === 'user' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-orange-100 text-orange-800'}`}>
                                                    {report.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{report.itemTitle}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                    {report.reason}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{report.reportedBy}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                    ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    className="text-red-600 hover:text-red-900 mr-3 transition-colors duration-200"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                                                            console.log('Delete item:', report.id);
                                                        }
                                                    }}
                                                >
                                                    Delete Item
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                                    onClick={() => {
                                                        if (window.confirm('Dismiss this report?')) {
                                                            console.log('Dismiss report:', report.id);
                                                        }
                                                    }}
                                                >
                                                    Dismiss
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Updated Helper Components
const StatCard = ({ title, value, icon, color }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        indigo: 'from-indigo-500 to-indigo-600',
        purple: 'from-purple-500 to-purple-600',
        yellow: 'from-yellow-500 to-yellow-600'
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">{title}</p>
                        <p className="text-2xl font-bold mt-2">{value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
                        <span className="text-2xl">{icon}</span>
                    </div>
                </div>
            </div>
            <div className={`h-1 bg-gradient-to-r ${colorClasses[color]}`}></div>
        </div>
    );
};

const TabButton = ({ label, active, onClick }) => (
    <button
        className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ${active
                ? 'bg-blue-50 border-b-2 border-blue-500 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
        onClick={onClick}
    >
        {label}
    </button>
);

// Add these styles for tables
const tableStyles = {
    header: "bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    cell: "px-6 py-4 whitespace-nowrap",
    row: "hover:bg-gray-50 transition-colors duration-200",
    button: "transition-colors duration-200",
    badge: "px-3 py-1 text-xs font-medium rounded-full"
};

export default AdminDashboard;
