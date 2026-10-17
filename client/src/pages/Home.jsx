import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ClickSpark from '../components/react-bits/ClickSpark';
import LoadingScreen from '../components/LoadingScreen';
import {
    FALLBACK_PROJECTS,
    FALLBACK_TIMELINES,
} from '../data/fallback';

function fetchWithTimeout(promise, ms = 3000) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('TIMEOUT')), ms)
        ),
    ]);
}

function getCache(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function setCache(key, value) {
    try {
        if (value) localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore
    }
}

export default function Home() {
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [timelines, setTimelines] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setIsOffline(false);

            try {
                const [
                    profileRes,
                    projectsRes,
                    timelinesRes,
                    socialLinksRes,
                    settingsRes,
                ] = await fetchWithTimeout(
                    Promise.all([
                        supabase.from('profiles').select('*').limit(1).single(),
                        supabase.from('projects').select('*').order('created_at', { ascending: false }),
                        supabase.from('timelines').select('*').eq('published', true).order('order_index', { ascending: true }),
                        supabase.from('social_links').select('*').eq('is_active', true).order('order_index', { ascending: true }),
                        supabase.from('site_settings').select('*').limit(1).maybeSingle(),
                    ]),
                    3000
                );

                if (profileRes.error && profileRes.error.code !== 'PGRST116') throw profileRes.error;
                if (projectsRes.error) throw projectsRes.error;
                if (timelinesRes.error) throw timelinesRes.error;
                if (socialLinksRes.error) throw socialLinksRes.error;
                if (settingsRes.error && settingsRes.error.code !== 'PGRST116') throw settingsRes.error;

                setProfile(profileRes.data);
                setProjects(projectsRes.data || []);
                setTimelines(timelinesRes.data || []);
                setSocialLinks(socialLinksRes.data || []);
                setSettings(settingsRes.data);

                setCache('cache_profile', profileRes.data);
                setCache('cache_projects', projectsRes.data);
                setCache('cache_timelines', timelinesRes.data);
                setCache('cache_socialLinks', socialLinksRes.data);
                setCache('cache_settings', settingsRes.data);

            } catch (err) {
                console.warn('Offline / Supabase unreachable. Using cache or fallback.', err.message);
                setIsOffline(true);

                const cachedProfile = getCache('cache_profile');
                const cachedProjects = getCache('cache_projects');
                const cachedTimelines = getCache('cache_timelines');
                const cachedSocial = getCache('cache_socialLinks');
                const cachedSettings = getCache('cache_settings');

                const fallbackTimelines = FALLBACK_TIMELINES;

                setProfile(cachedProfile || null);
                setProjects(cachedProjects?.length ? cachedProjects : FALLBACK_PROJECTS);
                setTimelines(cachedTimelines?.length ? cachedTimelines : fallbackTimelines);
                setSocialLinks(cachedSocial || []);
                setSettings(cachedSettings || null);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    const sparkColor = settings?.accent_color || '#ef4444';

    return (
        <ClickSpark sparkColor={sparkColor} sparkCount={10} sparkRadius={18} sparkSize={12} duration={450}>
            <div className="min-h-screen bg-[#0a0e16] text-white">
                {isOffline && (
                    <div className="fixed top-0 left-0 right-0 z-50 bg-[#eab308]/10 border-b border-[#eab308]/30 text-[#eab308] text-xs font-mono text-center py-1">
                        ⚠ Offline mode — menampilkan data cache / fallback
                    </div>
                )}
                <Navbar profile={profile} settings={settings} />
                <Hero />
                <About />
                <Skills settings={settings} />
                <Projects projects={projects} settings={settings} />

                <Experience timelines={timelines} settings={settings} />

                <Contact />
                <Footer />
            </div>
        </ClickSpark>
    );
}
