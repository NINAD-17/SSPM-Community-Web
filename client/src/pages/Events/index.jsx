import React from "react"

const Event = () => {
    return (
        <div className="flex w-full h-screen">
            {/* Jobs List Section (25%) */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                <h2 className="font-bold text-xl mb-4">Job Listings</h2>
                <ul>
                    <li className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                        Software Engineer
                    </li>
                    <li className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                        Data Scientist
                    </li>
                    <li className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                        Product Manager
                    </li>
                    <li className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                        UX/UI Designer
                    </li>
                </ul>
            </div>

            {/* Job Description Section (50%) */}
            <div className="w-1/2 p-4 h-screen flex flex-col items-center ">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Software Engineer</h3>
                    <p className="text-gray-700 text-base">
                        We are looking for a highly skilled Software Engineer to join our
                        team. You will be responsible for developing high-quality software
                        solutions, collaborating with other teams, and contributing to
                        innovative projects.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Software Engineer</h3>
                    <p className="text-gray-700 text-base">
                        We are looking for a highly skilled Software Engineer to join our
                        team. You will be responsible for developing high-quality software
                        solutions, collaborating with other teams, and contributing to
                        innovative projects.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Software Engineer</h3>
                    <p className="text-gray-700 text-base">
                        We are looking for a highly skilled Software Engineer to join our
                        team. You will be responsible for developing high-quality software
                        solutions, collaborating with other teams, and contributing to
                        innovative projects.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Software Engineer</h3>
                    <p className="text-gray-700 text-base">
                        We are looking for a highly skilled Software Engineer to join our
                        team. You will be responsible for developing high-quality software
                        solutions, collaborating with other teams, and contributing to
                        innovative projects.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Software Engineer</h3>
                    <p className="text-gray-700 text-base">
                        We are looking for a highly skilled Software Engineer to join our
                        team. You will be responsible for developing high-quality software
                        solutions, collaborating with other teams, and contributing to
                        innovative projects.
                    </p>
                </div>
            </div>

            {/* Empty Section (25%) */}
            <div className="w-1/4"></div>
        </div>
    );
};



export default Event;