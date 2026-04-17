import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Link as LinkIcon, 
    Trophy, 
    Plus, 
    Trash2, 
    Save, 
    LogOut, 
    Search, 
    Image as ImageIcon,
    FileText,
    Type,
    Layers,
    GraduationCap,
    History,
    Pencil
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../lib/firebase';
import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    orderBy, 
    onSnapshot 
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('activities');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ activities: [], links: [], students: [] });
    const navigate = useNavigate();

    // Form States
    const [activityForm, setActivityForm] = useState({ year: '6ano', unit: '1', title: '', description: '', linkUrl: '', imageUrl: '' });
    const [linkForm, setLinkForm] = useState({ title: '', url: '', icon: '🔗' });
    const [studentForm, setStudentForm] = useState({ name: '', avatar: '', badges: [] });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            }
        });

        // Real-time listeners
        const unsubActivities = onSnapshot(query(collection(db, "activities")), (snapshot) => {
            setData(prev => ({ ...prev, activities: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) }));
        });

        const unsubLinks = onSnapshot(query(collection(db, "links")), (snapshot) => {
            setData(prev => ({ ...prev, links: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) }));
        });

        const unsubStudents = onSnapshot(query(collection(db, "students")), (snapshot) => {
            setData(prev => ({ ...prev, students: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) }));
        });

        return () => {
            unsubscribe();
            unsubActivities();
            unsubLinks();
            unsubStudents();
        };
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    const handleAddActivity = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, "activities"), {
                ...activityForm,
                createdAt: new Date().toISOString()
            });
            setActivityForm({ year: '6ano', unit: '1', title: '', description: '', linkUrl: '', imageUrl: '' });
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAddLink = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, "links"), {
                ...linkForm,
                createdAt: new Date().toISOString()
            });
            setLinkForm({ title: '', url: '', icon: '🔗' });
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (collectionName, id) => {
        if (!window.confirm('Tem certeza que deseja excluir?')) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const tabs = [
        { id: 'activities', label: 'Atividades', icon: LayoutDashboard },
        { id: 'links', label: 'Links da Hora', icon: LinkIcon },
        { id: 'badges', label: 'Mural Conquistas', icon: Trophy },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <header className="glass-panel sticky top-4 z-50 px-6 py-4 rounded-2xl flex items-center justify-between mb-8 mx-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-xl">
                        <History className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-secondary">Painel Administrativo (Firebase)</h1>
                        <p className="text-xs text-secondary/60">Escola Modelo de Conceição (Regina Almada)</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center bg-white/40 p-1 rounded-xl border border-white/40">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeTab === tab.id 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-secondary/60 hover:text-secondary hover:bg-white/60'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <button 
                    onClick={handleLogout}
                    className="p-2.5 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-sm"
                    title="Sair"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-4">
                <AnimatePresence mode="wait">
                    {activeTab === 'activities' && (
                        <motion.div 
                            key="activities"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="space-y-8"
                        >
                            {/* New Activity Form */}
                            <section className="glass-panel p-8 rounded-3xl border-t-4 border-emerald-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <Plus className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-secondary">Nova Atividade</h2>
                                </div>

                                <form onSubmit={handleAddActivity} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-secondary/70 ml-1">Série / Ano</label>
                                            <select 
                                                value={activityForm.year}
                                                onChange={e => setActivityForm({...activityForm, year: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                            >
                                                <option value="6ano">6º Ano</option>
                                                <option value="7ano">7º Ano</option>
                                                <option value="8ano">8º Ano</option>
                                                <option value="9ano">9º Ano</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-secondary/70 ml-1">Unidade</label>
                                            <select 
                                                value={activityForm.unit}
                                                onChange={e => setActivityForm({...activityForm, unit: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                            >
                                                <option value="1">Unidade I</option>
                                                <option value="2">Unidade II</option>
                                                <option value="3">Unidade III</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-secondary/70 ml-1">Título</label>
                                        <input 
                                            type="text"
                                            required
                                            value={activityForm.title}
                                            onChange={e => setActivityForm({...activityForm, title: e.target.value})}
                                            placeholder="Ex: Introdução à Roma Antiga"
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-secondary/70 ml-1">Descrição</label>
                                        <textarea 
                                            value={activityForm.description}
                                            onChange={e => setActivityForm({...activityForm, description: e.target.value})}
                                            placeholder="Breve descrição da atividade..."
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-secondary/70 ml-1">Link da Atividade</label>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40" />
                                                <input 
                                                    type="url"
                                                    required
                                                    value={activityForm.linkUrl}
                                                    onChange={e => setActivityForm({...activityForm, linkUrl: e.target.value})}
                                                    placeholder="https://..."
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-secondary/70 ml-1">URL da Imagem</label>
                                            <div className="relative">
                                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40" />
                                                <input 
                                                    type="url"
                                                    value={activityForm.imageUrl}
                                                    onChange={e => setActivityForm({...activityForm, imageUrl: e.target.value})}
                                                    placeholder="https://..."
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-5 h-5" /> Adicionar Atividade
                                    </button>
                                </form>
                            </section>

                            {/* Activities List */}
                            <div className="grid grid-cols-1 gap-4">
                                {data.activities.length > 0 ? data.activities.map(act => (
                                    <div key={act.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-secondary/5 flex items-center justify-center overflow-hidden">
                                                {act.imageUrl ? <img src={act.imageUrl} className="w-full h-full object-cover" /> : <Layers className="w-6 h-6 text-secondary/20" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-secondary">{act.title}</h3>
                                                <p className="text-xs text-secondary/60 uppercase tracking-wider">{act.year} • Unidade {act.unit}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete('activities', act.id)}
                                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 bg-white/40 rounded-3xl border-2 border-dashed border-white/60 text-secondary/40">
                                        Nenhuma atividade cadastrada.
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'links' && (
                        <motion.div 
                            key="links"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="space-y-8"
                        >
                            <section className="glass-panel p-8 rounded-3xl border-t-4 border-blue-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <LinkIcon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-secondary">Gerenciar Links</h2>
                                </div>

                                <form onSubmit={handleAddLink} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-secondary/70 ml-1">Título do Link</label>
                                            <input 
                                                type="text"
                                                required
                                                value={linkForm.title}
                                                onChange={e => setLinkForm({...linkForm, title: e.target.value})}
                                                placeholder="Ex: Biblioteca Digital"
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-secondary/70 ml-1">Ícone (Emoji)</label>
                                            <input 
                                                type="text"
                                                value={linkForm.icon}
                                                onChange={e => setLinkForm({...linkForm, icon: e.target.value})}
                                                placeholder="Ex: 📚"
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none text-center text-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-secondary/70 ml-1">URL (https://...)</label>
                                        <input 
                                            type="url"
                                            required
                                            value={linkForm.url}
                                            onChange={e => setLinkForm({...linkForm, url: e.target.value})}
                                            placeholder="https://..."
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-5 h-5" /> Adicionar Link
                                    </button>
                                </form>
                            </section>

                            <div className="grid grid-cols-1 gap-4">
                                {data.links.map(link => (
                                    <div key={link.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl w-10 h-10 flex items-center justify-center bg-white/50 rounded-lg">{link.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-secondary">{link.title}</h3>
                                                <p className="text-xs text-secondary/40 select-all">{link.url}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete('links', link.id)}
                                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'badges' && (
                        <motion.div 
                            key="badges"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="space-y-8"
                        >
                            <section className="glass-panel p-8 rounded-3xl border-t-4 border-purple-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <GraduationCap className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-secondary">Alunos & Conquistas</h2>
                                </div>
                                <p className="text-center py-10 text-secondary/40">Gerenciamento de alunos em sincronia com o mural.</p>
                            </section>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.students.map(student => (
                                    <div key={student.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <img src={student.avatar} className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover" />
                                            <div>
                                                <h3 className="font-bold text-secondary">{student.name}</h3>
                                                <p className="text-xs text-secondary/60">{student.badges?.length || 0} conquistas</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-lg text-secondary/40 hover:text-primary transition-colors">
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete('students', student.id)}
                                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminDashboard;
