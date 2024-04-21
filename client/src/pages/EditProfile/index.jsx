import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { setUpdatedProfile } from "../../state"
import { LegendToggleTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../../components/Dropzone';

const EditProfile = () => {
    const loggedInUser = useSelector(state => state.user);
    const loggedInUserId = loggedInUser._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [picture, setPicture] = useState(loggedInUser.picturePath);
    const [headline, setHeadline] = useState(loggedInUser.headline);
    const [about, setAbout] = useState(loggedInUser.about);
    const [status, setStatus] = useState(loggedInUser.status);
    // const [skillSet, setSkillSet] = useState([]);
    const [gradYear, setGradYear] = useState(loggedInUser.gradYear);
    const [branch, setBranch] = useState(loggedInUser.branch);
    const [workingAt, setWorkingAt] = useState(loggedInUser.workingAt);
    const [ isPictureSelected, setIsPictureSelected ] = useState(false);
    const [ picture, setPicture ] = useState(null);
    const [ github, setGithub ] = useState(loggedInUser.socialHandles[0].url || null);
    const [ linkedin, setLinkedin ] = useState(loggedInUser.socialHandles[1].url || null);
    console.log({loggedInUser});
    console.log("Logg", loggedInUser._id);
    console.log(typeof loggedInUser._id);
    console.log(typeof headline);
    console.log(typeof about);
    console.log(typeof gradYear);
    console.log(typeof status);
    console.log(typeof workingAt);
    console.log("kk", loggedInUser.picturePath);
    

    const handleUpdate = async(event) => {
        event.preventDefault();
        const id = loggedInUser._id;

        const formData = new FormData();
        formData.append("headline", headline)
        formData.append("about", about)
        formData.append("gradYear", gradYear)
        formData.append("branch", branch)
        formData.append("status", status)
        formData.append("workingAt", workingAt)

        if(github || linkedin) {
            const socialHandles = [
                {
                    "name": "GitHub",
                    "url": github
                },
                {
                    "name": "LinkedIn",
                    "url": linkedin
                }
            ]

            formData.append("socialHandles", JSON.stringify(socialHandles));
        }
        
        if(picture) {
            formData.append("picture", picture[0])
            formData.append("picturePath", picture[0].name)
        } else {
            formData.append("picturePath", loggedInUser.picturePath)
        }


        const response = await fetch(`http://localhost:3000/users/${id}/edit`, {
            method: "PATCH",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: formData
        });
        console.log(loggedInUser._id);

        const updatedprofile = await response.json();
        console.log({updatedprofile});
        dispatch(setUpdatedProfile({ user: updatedprofile }));
        navigate(`/profile/${id}`);
    }

    return (

        <>
            <Navbar />
            <div className="bg-white mt-20 mb-5 rounded-xl px-8 py-5 mx-2 md:mx-24 lg:mx-32 xl:mx-40 max-w-7xl 2xl:mx-auto">
                <form onSubmit={handleUpdate}>
                    { 
                        isPictureSelected ?
                            <div className="flex w-full justify-center">
                                <div className="h-24 ">
                                    <Dropzone files={picture} setFiles={setPicture} custCSS={"h-24 w-48 rounded-full"} />
                                </div>
                                <span className={`${picture ? "hidden": "block"} material-symbols-outlined cursor-pointer ml-2 hover:text-red-400`} onClick={() => setIsPictureSelected(!isPictureSelected)}>close</span>
                            </div>
                        :
                        <div className="h-24 w-24 mx-auto cursor-pointer relative" onClick={() => setIsPictureSelected(!isPictureSelected)}>
                            <img className="rounded-full hover:opacity-50 h-24 w-24 object-cover" src={`${loggedInUser.picturePath ? loggedInUser.picturePath : "../../user.png"}`} alt="" />
                            <div className="absolute inset-0 rounded-full bg-black opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity duration-200 ease-in-out">
                                <span className="material-symbols-outlined text-white">edit</span>
                            </div>
                        </div>
                    }
                    
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
                    {
                        loggedInUser.status === "Student" ? 
                        <></>
                        :
                        <div className="mt-5">
                            <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="workingAt">Working At</label>
                            <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={workingAt} onChange={(e) => setWorkingAt(e.target.value)}  name="workingAt" />
                        </div>
                    }
                    {/* <div className="mt-5">
                        <label className="block sm:flex sm:flex-row text-sm font-semibold m-2" htmlFor="usertype">Status</label>
                        <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={gradYear} onChange={(e) => setGradYear(e.target.value)}  name="usertype" />
                    </div> */}

                    {/* add social handles */}
                    <div className="font-semibold mt-5 text-sm text-blue-700 ml-2 ">Social Handles</div>
                        <div className="mt-2 flex">
                            <label className="block sm:flex sm:flex-row w-1/6 text-sm font-semibold m-2" htmlFor="gradYear">GitHub Profile</label>
                            <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={github} onChange={(e) => setGithub(e.target.value)}  name="github" placeholder='Enter your GitHub URL' />
                        </div>
                        <div className="mt-5 flex">
                            <label className="block sm:flex sm:flex-row w-1/6 text-sm font-semibold m-2" htmlFor="usertype">Linkedin Profile</label>
                            <input className="bg-gray-50 w-full font-sm outline-blue-400 rounded-xl px-3 py-2" type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}  name="linkedin" placeholder='Enter your LinkedIn URL' />
                        </div> 
                    =

                    <button type="submit" className="w-full bg-blue-800 p-2 rounded-xl mt-7 text-white hover:bg-blue-500">Update Profile</button>
                </form>
            </div>
        </>
    );
}

export default EditProfile;
