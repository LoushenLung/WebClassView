'use client';

import React, { useState } from 'react';
import { updateProfile } from '@/actions/profile.actions';
import { Profile } from '@/lib/db';
import { Save, Plus, X } from 'lucide-react';

interface ProfileFormProps {
  profile: Profile;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile.fullName);
  const [nickname, setNickname] = useState(profile.nickname || '');
  const [studentId, setStudentId] = useState(profile.studentId || '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');
  const [bioQuote, setBioQuote] = useState(profile.bioQuote || '');
  const [birthDate, setBirthDate] = useState(profile.birthDate ? profile.birthDate.split('T')[0] : '');
  const [whatsapp, setWhatsapp] = useState(profile.whatsapp || '');
  const [instagram, setInstagram] = useState(profile.instagram || '');
  const [linkedin, setLinkedin] = useState(profile.linkedin || '');
  const [github, setGithub] = useState(profile.github || '');
  const [address, setAddress] = useState(profile.address || '');
  const [hideContact, setHideContact] = useState(profile.hideContact || false);
  
  // Skills list state
  const [skills, setSkills] = useState<string[]>(profile.academicSkills || []);
  const [newSkill, setNewSkill] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await updateProfile(profile.id, {
        fullName,
        nickname,
        studentId,
        avatarUrl,
        bioQuote,
        birthDate: birthDate ? new Date(birthDate).toISOString() : undefined,
        whatsapp,
        instagram,
        linkedin,
        github,
        address,
        hideContact,
        academicSkills: skills
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
      } else {
        setMessage({ type: 'error', text: 'Gagal memperbarui profil.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl text-xs font-bold ${
          message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
        }`}>
          {message.text}
        </div>
      )}

      {/* Row 1: Basic Info */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400">Nama Lengkap</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400">Nama Panggilan</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400">NISN / NIM</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400">Tanggal Lahir</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Profile Pic Link & Bio Quote */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400">Foto Profil URL (Cloudinary / Unsplash)</label>
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400">Quote Favorit / Bio Singkat</label>
        <textarea
          value={bioQuote}
          onChange={(e) => setBioQuote(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Tulis quote atau deskripsi singkat diri..."
        />
      </div>

      {/* Social Media & Contact Info */}
      <div className="border-t border-slate-100 pt-6 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Kontak & Media Sosial</h3>
        
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400">Nomor WhatsApp</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0812..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400">Instagram Handle</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="username_instagram"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400">LinkedIn Link</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="linkedin.com/in/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400">GitHub Link</label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="github.com/..."
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="border-t border-slate-100 pt-6 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Minat / Keahlian Akademik</h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-slate-100 pl-3 pr-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {skill}
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="rounded-full p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tambah skill baru (misal: UI Design, Database, Public Speaking)"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="inline-flex items-center justify-center rounded-xl bg-slate-100 p-2.5 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-850 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="border-t border-slate-100 pt-6 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hideContact"
            checked={hideContact}
            onChange={(e) => setHideContact(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="hideContact" className="text-xs font-bold text-slate-400 cursor-pointer">Sembunyikan kontak saya dari publik</label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-600/40 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
