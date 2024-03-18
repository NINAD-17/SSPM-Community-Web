import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { setUpdatedProfile } from "../../state"
import { LegendToggleTwoTone } from '@mui/icons-material';

const EditProfile = () => {
    const loggedInUser = useSelector(state => state.user);
    const loggedInUserId = loggedInUser._id;
    const dispatch = useDispatch();
    // const [picture, setPicture] = useState(loggedInUser.picturePath);
    const [headline, setHeadline] = useState(loggedInUser.headline);
    const [about, setAbout] = useState(loggedInUser.about);
    const [status, setStatus] = useState(loggedInUser.status);
    // const [skillSet, setSkillSet] = useState([]);
    const [gradYear, setGradYear] = useState(loggedInUser.gradYear);
    const [branch, setBranch] = useState(loggedInUser.branch);
    const [workingAt, setWorkingAt] = useState(loggedInUser.workingAt);
    console.log({loggedInUser});
    console.log("Logg", loggedInUser._id);
    console.log(typeof loggedInUser._id);
    console.log(typeof headline);
    console.log(typeof about);
    console.log(typeof gradYear);
    console.log(typeof status);
    console.log(typeof workingAt);
    

    const handleUpdate = async(event) => {
        event.preventDefault();
        const id = loggedInUser._id;
        const response = await fetch(`http://localhost:3000/users/${id}/edit`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ headline, about, gradYear, branch, status, workingAt })
        });
        console.log(loggedInUser._id);

        const updatedprofile = await response.json();
        console.log({updatedprofile});
        dispatch(setUpdatedProfile({ user: updatedprofile }));
    }

    return (

        <>
            <Navbar />
            <div className="bg-white mt-20 mx-2 mb-5 rounded-xl px-8 py-5 md:mx-24 lg:mx-32 xl:mx-40 ">
                <form onSubmit={handleUpdate}>
                    <div className="h-24 w-24 mx-auto cursor-pointer relative">
                        <img className="rounded-full hover:opacity-50 h-24 w-24 object-cover" src={`${loggedInUser.picturePath ? loggedInUser.picturePath : "../../user.png"}`} alt="" />
                        <div className="absolute inset-0 rounded-full bg-black opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity duration-200 ease-in-out">
                            <span className="material-symbols-outlined text-white">edit</span>
                        </div>
                    </div>
                    <div className="text-2xl font-semibold text-center m-3">
                        <h1>{loggedInUser.firstName} {loggedInUser.lastName}</h1>
                    </div>
                    <hr />
                    <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="headline">Headline</label>
                        <textarea className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" name="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                    </div>
                    <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="about">About</label>
                        <textarea className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" name="about" value={about} onChange={(e) => setAbout(e.target.value)} />
                    </div>
                    <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="branch">Branch</label>
                        <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={branch} onChange={(e) => setBranch(e.target.value)}  name="branch" />
                    </div>
                    <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="gradYear">Graduation Year</label>
                        <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={gradYear} onChange={(e) => setGradYear(e.target.value)}  name="gradYear" />
                    </div>
                    <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="usertype">Status</label>
                        <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={status} onChange={(e) => setStatus(e.target.value)}  name="usertype" />
                    </div>
                    <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="workingAt">Working At</label>
                        <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={workingAt} onChange={(e) => setWorkingAt(e.target.value)}  name="workingAt" />
                    </div>
                    {/* <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="usertype">Status</label>
                        <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={gradYear} onChange={(e) => setGradYear(e.target.value)}  name="usertype" />
                    </div> */}
                    <button type="submit" className="w-full bg-blue-800 p-2 rounded-xl mt-7 text-white hover:bg-blue-500">Update Profile</button>
                </form>
            </div>
        </>
    );
}

export default EditProfile;
