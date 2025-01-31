import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Avatar from '../../assets/user-avatar.svg';

const UserNetwork = () => {
    const [selectedCategory, setSelectedCategory] = useState("Connections");
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        { name: "Connections", icon: "👥", count: 549 },
        { name: "Followers", icon: "👤", count: 320 },
        { name: "Following", icon: "👣", count: 280 },
        { name: "Pending Requests", icon: "📨", count: 13 },
    ];

    // Demo user data
    const users = {
        Connections: [
            { id: 1, name: 'John Doe', role: 'Software Engineer', company: 'Tech Corp', mutualConnections: 12 },
            { id: 2, name: 'Jane Smith', role: 'Product Manager', company: 'Innovation Inc', mutualConnections: 8 },
        ],
        Followers: [
            { id: 3, name: 'Alice Johnson', role: 'UX Designer', company: 'Design Co', mutualConnections: 5 },
            { id: 4, name: 'Bob Wilson', role: 'Data Scientist', company: 'Data Corp', mutualConnections: 3 },
        ],
        Following: [
            { id: 5, name: 'Charlie Brown', role: 'Frontend Developer', company: 'Web Solutions', mutualConnections: 7 },
        ],
        "Pending Requests": [
            { id: 6, name: 'Diana Ross', role: 'Tech Lead', company: 'Software Inc', mutualConnections: 4 },
        ],
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Navbar />
            <div className="container mx-auto px-4 py-6 mt-20">
                {/* Mobile Dropdown */}
                <div className="md:hidden w-full mb-6">
                    <button
                        className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span>Category: {selectedCategory}</span>
                        <svg
                            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`${isOpen ? 'block' : 'hidden'} mt-2 bg-white rounded-lg shadow-lg`}>
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{category.icon}</span>
                                    <span>{category.name}</span>
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Desktop Sidebar */}
                    <div className="hidden md:block w-[280px]">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <h1 className="text-xl font-bold text-gray-800">Manage my network</h1>
                            </div>
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => handleCategoryClick(category.name)}
                                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 ${
                                        selectedCategory === category.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{category.icon}</span>
                                        <span className="font-medium text-gray-700">{category.name}</span>
                                    </div>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* User List */}
                    <div className="flex-1 md:max-w-[calc(100%-300px)]">
                        <div className="bg-white rounded-xl shadow-md p-6 pt-2">
                            <div className="md:flex justify-between items-center  mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">{selectedCategory}</h2>
                                <div className="relative mt-3">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            </div>

                            <div className="space-y-4">
                                {users[selectedCategory]?.map((user) => (
                                    <UserCard
                                        key={user.id}
                                        user={user}
                                        type={selectedCategory}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserCard = ({ user, type }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
        <div className="flex items-center gap-4">
            <img src={Avatar} alt={user.name} className="w-16 h-16 rounded-full" />
            <div>
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.role}</p>
                <p className="text-gray-500 text-sm">{user.company}</p>
                <p className="text-gray-400 text-sm">{user.mutualConnections} mutual connections</p>
            </div>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
            {type === "Pending Requests" && (
                <>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Accept
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Ignore
                    </button>
                </>
            )}
            {(type === "Followers" || type === "Following") && (
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Unfollow
                </button>
            )}
            {type === "Connections" && (
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Remove
                </button>
            )}
        </div>
    </div>
);

export default UserNetwork;
