import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/admin/Profile';
import Skills from './pages/admin/Skills';
import Projects from './pages/admin/Projects';
// HAPUS import Education dan Experience
// import Education from './pages/admin/Education';
// import Experience from './pages/admin/Experience';
import Timeline from './pages/admin/Timeline'; // TAMBAHKAN IMPORT BARU INI
import SocialLinks from './pages/admin/SocialLinks';
import Settings from './pages/admin/Settings';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                {/* ===== PUBLIC ROUTES ===== */}
                <Route path="/" element={<Home />} />

                {/* ===== ADMIN AUTH ===== */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* ===== ADMIN PROTECTED ROUTES ===== */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="timeline" element={<Timeline />} />
                    <Route path="social-links" element={<SocialLinks />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
