import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ClickSpark from '../components/react-bits/ClickSpark';
import LoadingScreen from '../components/LoadingScreen';

export default function Home() {
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [
                    profileRes,
                    skillsRes,
                    projectsRes,
                    educationsRes,
                    experiencesRes,
                    socialLinksRes,
                    settingsRes
                ] = await Promise.all([
                    supabase.from('profiles').select('*').limit(1).single(),
                    supabase.from('skills').select('*').eq('is_active', true).order('order_index', { ascending: true }),
                    supabase.from('projects').select('*').order('created_at', { ascending: false }),
                    supabase.from('educations').select('*').eq('published', true).order('order_index', { ascending: true }),
                    supabase.from('experiences').select('*').eq('published', true).order('order_index', { ascending: true }),
                    supabase.from('social_links').select('*').eq('is_active', true).order('order_index', { ascending: true }),
                    supabase.from('site_settings').select('*').limit(1).maybeSingle(),
                ]);

                if (profileRes.error && profileRes.error.code !== 'PGRST116') throw profileRes.error;
                if (skillsRes.error) throw skillsRes.error;
                if (projectsRes.error) throw projectsRes.error;
                if (educationsRes.error) throw educationsRes.error;
                if (experiencesRes.error) throw experiencesRes.error;
                if (socialLinksRes.error) throw socialLinksRes.error;
                if (settingsRes.error && settingsRes.error.code !== 'PGRST116') throw settingsRes.error;

                console.log('PROJECTS:', projectsRes.data);
                console.log('PROJECTS ERROR:', projectsRes.error);

                setProfile(profileRes.data);
                setSkills(skillsRes.data || []);
                setProjects(projectsRes.data || []);
                setEducations(educationsRes.data || []);
                setExperiences(experiencesRes.data || []);
                setSocialLinks(socialLinksRes.data || []);
                setSettings(settingsRes.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0e16]">
                <div className="text-[#ef4444] font-mono">Error: {error}</div>
            </div>
        );
    }

    const sparkColor = settings?.accent_color || '#ef4444';

    return (
        <ClickSpark sparkColor={sparkColor} sparkCount={10} sparkRadius={18} sparkSize={12} duration={450}>
            <div className="min-h-screen bg-[#0a0e16] text-white">
                <Navbar profile={profile} settings={settings} />
                <Hero profile={profile} settings={settings} />
                <About profile={profile} />
                <Skills skills={skills} settings={settings} />
                <Projects projects={projects} settings={settings} />
                <Education educations={educations} settings={settings} />
                <Experience experiences={experiences} settings={settings} />
                <Contact socialLinks={socialLinks} settings={settings} profile={profile} />
                <Footer profile={profile} settings={settings} />
            </div>
        </ClickSpark>
    );
}
