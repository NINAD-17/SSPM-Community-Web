// Setting up all the routes for our application
import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Using React.lazy for optimized performance. It will load pages only when it's required and not at initial stage.
// We're not using React.lazy for Homepage LoginPage and notfound page. This will ensure that essential content (like login or homepage) is available immediately, even before any user interactions.
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"))
const CommentPage = React.lazy(() => import("./pages/CommentPage"))
// ** Use react.lazy while importing all the pages to optimize the performance

const routes = () => {
    return (
        // **** Include line for react.suspense here to show loader.
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/comments" element={<CommentPage />} />
                <Route path="/nav" element={<Navbar />} />
                {/* groupPostsPage */}
                {/* ... Think about more pages */}
                <Route path="/404" element={<NotFound />} />
            </Routes>
            </Suspense>
        </Router>
    )
}

export default routes;