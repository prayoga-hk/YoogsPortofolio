// Data cadangan kalau Supabase tidak bisa diakses (offline)
// Isi sesuai data asli kamu di Supabase

import { press } from "motion";

export const FALLBACK_PROJECTS = [
    {
        id: 1,
        title: 'null',
        slug: 'null',
        description: 'null',
        content: null,
        image_url: null,
        tech_stack: null,
        live_url: '#',
        github_url: '#',
        featured: true,
        order_index: 1,
    },
    // tambah project lain sesuai data di DB kamu
];

export const FALLBACK_EDUCATIONS = [
    {
        id: 1,
        school: 'SMP Negeri 1 Karangploso',
        degree: 'SMP',
        field_of_study: 'none',
        start_date: '2022-07-01',
        end_date: '2025-06-30',
        status: null,
        description: 'Saya belajar pengetahuan umum dan mulai mengenal dunia IT',
        order_index: 1,
    },
    {
        id: 2,
        school: 'SMK PGRI 3 Malang',
        degree: 'SMK',
        field_of_study: 'Rekayasa Perangkat Lunak',
        start_date: '2025-07-01',
        end_date: null,  // null = "Present"
        status: 'Aktif',
        description: 'Mempelajari pemrograman, pengembangan website, basis data, dan pengembangan perangkat lunak.',
        order_index: 2,
    },
];

// Experience kosong — tidak ada fallback
export const FALLBACK_EXPERIENCES = [];
