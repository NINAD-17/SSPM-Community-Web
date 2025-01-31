import React, { useState } from 'react';

function Jobform() {
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        jobType: 'Full-time',
        jobDescription: '',
        requiredSkills: '',
        applicationDeadline: '',
        contactInfo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // You can add your form submission logic here
    };

    return (
        <div className="flex justify-center items-center mt-10 bg-gray-100">
            <form className="bg-blue-300 p-8 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Job Vacancy Submission Form</h2>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Job Type</label>
                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Job Description</label>
                    <textarea
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Required Skills</label>
                    <textarea
                        name="requiredSkills"
                        value={formData.requiredSkills}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Application Deadline</label>
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-900 font-semibold">Contact Information</label>
                    <input
                        type="text"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Jobform;
