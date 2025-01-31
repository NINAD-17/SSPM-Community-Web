import React from "react"
import Avatar from "../../assets/user-avatar.svg"

const Dashboard = () => {
    const contacts = [
        {
            Name: 'Sumit',
            Status: 'Available',
            Img: 'Avatar'
        },
        {
            Name: 'Ninad',
            Status: 'Available',
            Img: 'Avatar'
        },
        {
            Name: 'Aniket',
            Status: 'Available',
            Img: 'Avatar'
        },
        {
            Name: 'Siddhesh',
            Status: 'Available',
            Img: 'Avatar'
        },
        {
            Name: 'Amol',
            Status: 'Available',
            Img: 'Avatar'
        },
        {
            Name: 'Deep',
            Status: 'Available',
            Img: 'Avatar'
        }
    ]
    return (
        <div className="w-screen flex bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Contacts Sidebar */}
            <div className="w-[25%] h-screen bg-white shadow-lg">
                <div className="flex items-center p-8 border-b border-gray-200">
                    <div className="border border-blue-500 overflow-hidden p-[2px] rounded-full shadow-md">
                        <img src={Avatar} width={75} height={75} alt="User Avatar" className="rounded-full" />
                    </div>
                    <div className="ml-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Tutorials Dev</h3>
                        <p className="text-sm text-gray-600">My Account</p>
                    </div>
                </div>

                <div className="p-6 flex flex-col h-[calc(100vh-160px)]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            {contacts.length} online
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

                    {/* Contacts List with hidden scrollbar */}
                    <div className="overflow-y-auto scrollbar-hide flex-1">
                        <div className="space-y-2">
                            {contacts.map(({ Name, Status }, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                >
                                    <div className="relative">
                                        <img src={Avatar} width={50} height={50} alt={Name} className="rounded-full" />
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{Name}</h3>
                                        <p className="text-sm text-gray-600">{Status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-[50%] h-screen flex flex-col bg-white shadow-lg">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="relative">
                            <img src={Avatar} width={60} height={60} alt="Chat Avatar" className="rounded-full" />
                            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">Sumit</h3>
                            <p className="text-sm text-green-600">Active now</p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                            <path d="M15 9l5 -5"></path>
                            <path d="M15 5l0 4l4 0"></path>
                        </svg>
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="max-w-[40%] bg-gray-100 rounded-2xl rounded-tl-none p-4 text-gray-800">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet rerum obcaecati fugit, dicta ex eum, nostrum vero
                    </div>
                    <div className="max-w-[40%] bg-blue-500 rounded-2xl rounded-tr-none ml-auto p-4 text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet rerum obcaecati fugit, dicta ex eum, nostrum vero
                    </div>
                    {/* Repeat messages for demo */}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                    <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-0 focus:ring-0 outline-none"
                        />
                        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar (can be used for user details, shared media, etc.) */}
            <div className="w-[25%] h-screen bg-white shadow-lg"></div>
        </div>
    )
}

export default Dashboard