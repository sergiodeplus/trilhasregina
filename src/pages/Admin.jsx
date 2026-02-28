import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Lock, LogIn, Plus, Trash2, Layout, LogOut, Edit2, Link as LinkIcon, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
    const { currentUser, login, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('activities'); // activities, links, badges

    // Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setAuthError('');
            setLoading(true);
            await login(email, password);
        } catch (err) {
            setAuthError('Falha ao fazer login. Verifique suas credenciais.');
        }
        setLoading(false);
    };

    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 glass-panel rounded-xl max-w-sm w-full border border-primary/20"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/20 rounded-full">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6 text-secondary">Área do Professor</h2>
                    {authError && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{authError}</div>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm text-secondary/80 mb-1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-surface/90 border border-white/10 rounded-lg p-3 text-secondary focus:ring-2 focus:ring-primary outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm text-secondary/80 mb-1">Senha</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-surface/90 border border-white/10 rounded-lg p-3 text-secondary focus:ring-2 focus:ring-primary outline-none" required />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                            {loading ? 'Entrando...' : <><LogIn className="w-5 h-5" /> Entrar</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-secondary">Painel Administrativo</h1>
                <div className="flex items-center gap-4">
                    <div className="flex bg-surface/90/50 p-1 rounded-lg border border-white/5">
                        <button onClick={() => setActiveTab('activities')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'activities' ? 'bg-primary text-secondary' : 'text-secondary/80 hover:text-secondary'}`}>
                            Atividades
                        </button>
                        <button onClick={() => setActiveTab('links')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'links' ? 'bg-primary text-secondary' : 'text-secondary/80 hover:text-secondary'}`}>
                            Links da Hora
                        </button>
                        <button onClick={() => setActiveTab('badges')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'badges' ? 'bg-primary text-secondary' : 'text-secondary/80 hover:text-secondary'}`}>
                            Mural Conquistas
                        </button>
                    </div>
                    <button onClick={() => logout()} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Sair">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {activeTab === 'activities' && <ActivitiesManager />}
            {activeTab === 'links' && <LinksManager />}
            {activeTab === 'badges' && <BadgesManager />}
        </div>
    );
};

// --- SUB-COMPONENTS FOR MANAGERS ---

const ActivitiesManager = () => {
    const [activities, setActivities] = useState([]);
    const [formData, setFormData] = useState({ year: '6ano', unit: '1', title: '', description: '', imageUrl: '', linkUrl: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchActivities(); }, []);

    const fetchActivities = async () => {
        const snapshot = await getDocs(collection(db, 'activities'));
        setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDoc(doc(db, 'activities', editingId), formData);
                alert('Atividade atualizada!');
            } else {
                await addDoc(collection(db, 'activities'), { ...formData, createdAt: new Date() });
                alert('Atividade criada!');
            }
            setFormData({ year: '6ano', unit: '1', title: '', description: '', imageUrl: '', linkUrl: '' });
            setEditingId(null);
            fetchActivities();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao salvar.");
        }
    };

    const handleEdit = (act) => {
        setFormData(act);
        setEditingId(act.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apagar atividade?')) {
            await deleteDoc(doc(db, 'activities', id));
            fetchActivities();
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-xl border border-white/5 h-fit lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                    {editingId ? <Edit2 className="w-5 h-5 text-yellow-400" /> : <Plus className="w-5 h-5 text-green-400" />}
                    {editingId ? 'Editar Atividade' : 'Nova Atividade'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <select value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} className="bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary">
                            <option value="6ano">6º Ano</option><option value="7ano">7º Ano</option><option value="8ano">8º Ano</option><option value="9ano">9º Ano</option>
                        </select>
                        <select value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} className="bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary">
                            <option value="1">Unidade I</option><option value="2">Unidade II</option><option value="3">Unidade III</option>
                        </select>
                    </div>
                    <input placeholder="Título" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary" required />
                    <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary h-20" />
                    <input placeholder="Link da Atividade" value={formData.linkUrl} onChange={e => setFormData({ ...formData, linkUrl: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary" required />
                    <input placeholder="URL da Imagem" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary" />
                    <div className="flex gap-2">
                        <button type="submit" className={`flex-1 font-bold py-2 rounded-lg text-white ${editingId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}>
                            {editingId ? 'Salvar Alterações' : 'Adicionar'}
                        </button>
                        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ year: '6ano', unit: '1', title: '', description: '', imageUrl: '', linkUrl: '' }); }} className="px-4 bg-gray-600 rounded-lg hover:bg-gray-700">Cancelar</button>}
                    </div>
                </form>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {activities.map(act => (
                    <div key={act.id} className="bg-surface/90/30 border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:bg-surface/90/50">
                        <div>
                            <div className="flex gap-2 text-xs mb-1"><span className="bg-blue-500/20 text-blue-300 px-2 rounded uppercase">{act.year}</span><span className="bg-purple-500/20 text-purple-300 px-2 rounded">Unidade {act.unit}</span></div>
                            <h4 className="font-bold text-secondary">{act.title}</h4>
                            <p className="text-sm text-secondary/80 truncate max-w-sm">{act.linkUrl}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(act)} className="p-2 text-secondary/80 hover:text-yellow-400 hover:bg-yellow-400/10 rounded"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(act.id)} className="p-2 text-secondary/80 hover:text-red-400 hover:bg-red-400/10 rounded"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LinksManager = () => {
    const [links, setLinks] = useState([]);
    const [formData, setFormData] = useState({ title: '', url: '', icon: '🔗' });
    const [editingId, setEditingId] = useState(null);

    // List of available emojis/icons for simplicity
    const icons = ['📅', '📆', '📻', '✉️', '🔗', '🎥', '🎮', '📚'];

    useEffect(() => { fetchLinks(); }, []);

    const fetchLinks = async () => {
        const snapshot = await getDocs(collection(db, 'links'));
        setLinks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDoc(doc(db, 'links', editingId), formData);
            } else {
                await addDoc(collection(db, 'links'), formData);
            }
            setFormData({ title: '', url: '', icon: '🔗' });
            setEditingId(null);
            fetchLinks();
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apagar link?')) {
            await deleteDoc(doc(db, 'links', id));
            fetchLinks();
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-xl border border-white/5 h-fit chat-sticky">
                <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-blue-400" /> Gerenciar Links
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Título do Link" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary" required />
                    <input placeholder="URL (https://...)" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary" required />
                    <div className="grid grid-cols-4 gap-2">
                        {icons.map(icon => (
                            <button type="button" key={icon} onClick={() => setFormData({ ...formData, icon })} className={`p-2 rounded text-xl ${formData.icon === icon ? 'bg-primary border border-white' : 'bg-surface/90/50 border border-white/10'}`}>
                                {icon}
                            </button>
                        ))}
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-secondary font-bold py-2 rounded-lg">{editingId ? 'Atualizar' : 'Adicionar'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', url: '', icon: '🔗' }) }} className="w-full bg-gray-600 hover:bg-gray-700 text-secondary py-2 rounded-lg">Cancelar</button>}
                </form>
            </div>
            <div className="lg:col-span-2 grid gap-4">
                {links.map(link => (
                    <div key={link.id} className="bg-surface/90/30 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{link.icon}</span>
                            <div>
                                <h4 className="font-bold text-secondary">{link.title}</h4>
                                <p className="text-xs text-secondary/80">{link.url}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setFormData(link); setEditingId(link.id) }} className="p-2 text-secondary/80 hover:text-yellow-400"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(link.id)} className="p-2 text-secondary/80 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BadgesManager = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ name: '', avatar: '', badges: [] });
    const [editingId, setEditingId] = useState(null);

    // Hardcoded list of available badge keys (matching the static map in Badges.jsx for now)
    const availableBadges = [
        'historiador', 'viajante', 'debate', 'conexoes', 'leitor',
        'critico', 'poeta', 'arquiteto', 'palavras', 'revisor',
        'contador', 'argumento', 'colaborador', 'persistencia', 'digital'
    ];

    useEffect(() => { fetchStudents(); }, []);

    const fetchStudents = async () => {
        const snapshot = await getDocs(collection(db, 'students'));
        setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDoc(doc(db, 'students', editingId), formData);
            } else {
                await addDoc(collection(db, 'students'), formData);
            }
            setFormData({ name: '', avatar: '', badges: [] });
            setEditingId(null);
            fetchStudents();
        } catch (e) { console.error(e); }
    };

    const toggleBadge = (badge) => {
        const currentBadges = formData.badges || [];
        if (currentBadges.includes(badge)) {
            setFormData({ ...formData, badges: currentBadges.filter(b => b !== badge) });
        } else {
            setFormData({ ...formData, badges: [...currentBadges, badge] });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remover aluno?')) {
            await deleteDoc(doc(db, 'students', id));
            fetchStudents();
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-xl border border-white/5 h-fit">
                <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" /> Gerenciar Alunos & Badges
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Nome do Aluno" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary" required />
                    <input placeholder="URL do Avatar" value={formData.avatar} onChange={e => setFormData({ ...formData, avatar: e.target.value })} className="w-full bg-surface/90/50 border border-white/10 rounded-lg p-2 text-secondary" required />

                    <div>
                        <p className="text-sm text-secondary/80 mb-2">Conquistas (Clique para selecionar):</p>
                        <div className="flex flex-wrap gap-2">
                            {availableBadges.map(badge => (
                                <button
                                    key={badge} type="button"
                                    onClick={() => toggleBadge(badge)}
                                    className={`px-2 py-1 text-xs rounded border ${formData.badges?.includes(badge) ? 'bg-primary border-primary text-secondary' : 'bg-transparent border-white/20 text-secondary/80'}`}
                                >
                                    {badge}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-secondary font-bold py-2 rounded-lg">{editingId ? 'Atualizar Aluno' : 'Cadastrar Aluno'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', avatar: '', badges: [] }) }} className="w-full bg-gray-600 hover:bg-gray-700 text-secondary py-2 rounded-lg mt-2">Cancelar</button>}
                </form>
            </div>

            <div className="space-y-4">
                {students.map(student => (
                    <div key={student.id} className="bg-surface/90/30 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={student.avatar} alt="" className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                            <div>
                                <h4 className="font-bold text-secondary">{student.name}</h4>
                                <p className="text-xs text-yellow-400">{student.badges?.length || 0} conquistas</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setFormData(student); setEditingId(student.id) }} className="p-2 text-secondary/80 hover:text-yellow-400"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(student.id)} className="p-2 text-secondary/80 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
