// Setting up all the routes for our application
import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Using React.lazy for optimized performance. It will load pages only when it's required and not at initial stage.
// We're not using React.lazy for Homepage LoginPage and notfound page. This will ensure that essential content (like login or homepage) is available immediately, even before any user interactions.
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import FindFriends from "./pages/FindFriends"
import GroupPage from "./pages/GroupPage"
import Dashboard from "./pages/Dashboard"
import Opportunities from "./pages/Opportunities"
import Jobform from "./pages/JobForm"
import AdminDashboard from "./pages/AdminDashboard"
import UserNetwork from "./pages/UserNetwork"
import EventPage from "./pages/EventPage"



const ProfilePage = React.lazy(() => import("./pages/ProfilePage"))
const CommentPage = React.lazy(() => import("./pages/CommentPage"))
const EditProfile = React.lazy(() => import("./pages/EditProfile"))
// ** Use react.lazy while importing all the pages to optimize the performance

const routes = () => {
    return (
        // **** Include line for react.suspense here to show loader.
        <Router>
            <Suspense fallback={<div className="flex justify-center items-center h-dvh"><img className="h-20 w-20" src="../loading_blue.gif" alt="" /></div>}>
                <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                    <Route path="/comments" element={<CommentPage />} />
                    <Route path="/nav" element={<Navbar />} />
                    <Route path="/friends" element={<FindFriends />} />
                    <Route path="/:userId/edit" element={<EditProfile />} />
                    <Route path="/Opportunities" element={<Opportunities />} />
                    <Route path="/Jobform" element={<Jobform />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/UserNetwork" element={<UserNetwork />} />
                    {/* groupPostsPage */}
                    <Route path="/group/:groupId" element={<GroupPage />} />
                    <Route path="/Opportunities" element={<Opportunities />} />
                    <Route path="/EventPage" element={<EventPage />} />

                    {/* ... Think about more pages */}
                    <Route path="/404" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default routes;