import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, BookOpen, Crown, ChevronRight, Gamepad2, GraduationCap, LayoutDashboard } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const Home = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [activities, setActivities] = useState([]);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener for activities
        const unsubActivities = onSnapshot(query(collection(db, "activities")), (snapshot) => {
            setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Real-time listener for links
        const unsubLinks = onSnapshot(query(collection(db, "links")), (snapshot) => {
            setLinks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        return () => {
            unsubActivities();
            unsubLinks();
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const grades = [
        { id: '6ano', title: '6º Ano', subtitle: 'Mundos Antigos', color: 'from-[#3c8efc] to-[#5ba7fd]', icon: Star, count: 1 },
        { id: '7ano', title: '7º Ano', subtitle: 'Mundos Medieval e Moderno', color: 'from-[#5ba7fd] to-[#7abffe]', icon: Crown, count: 2 },
        { id: '8ano', title: '8º Ano', subtitle: 'Mundos Moderno e Contemporâneo', color: 'from-[#7abffe] to-[#98d8fe]', icon: Crown, count: 3 },
        { id: '9ano', title: '9º Ano', subtitle: 'Mundo Contemporâneo', color: 'from-[#3c8efc] to-[#98d8fe]', icon: Crown, count: 4 },
    ];

    const renderHome = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
        >
            {/* Hero Section */}
            <div className="text-center space-y-4 py-12 relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
                >
                    Escola Modelo de Conceição
                </motion.div>
                <motion.h2
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-black text-secondary uppercase tracking-tighter"
                >
                    Trilhas <span className="text-primary">Digitais</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-xl text-secondary/60 max-w-2xl mx-auto font-medium">
                    Explorando os caminhos da <span className="text-secondary font-bold">História</span> e da <span className="text-secondary font-bold">Religiosidade</span> com a Profª Regina Almada.
                </motion.p>
            </div>

            {/* Grade Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {grades.map((grade) => (
                    <motion.button
                        key={grade.id}
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(grade.id)}
                        className={`relative p-1 rounded-2xl bg-gradient-to-br ${grade.color} shadow-lg shadow-primary/20 group overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="bg-surface/90/90 backdrop-blur-xl p-6 rounded-xl h-full flex flex-col items-center text-center border border-white/5 relative z-10 transition-colors group-hover:bg-surface/90/80">
                            <div className={`p-4 rounded-full bg-gradient-to-br ${grade.color} mb-4 shadow-lg`}>
                                <grade.icon className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary mb-2">{grade.title}</h3>
                            <p className="text-sm text-secondary/80 group-hover:text-secondary transition-colors">{grade.subtitle}</p>
                            <div className="mt-4 flex gap-1">
                                {[...Array(grade.count)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-primary fill-current" />
                                ))}
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* LPT Section */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl border-t border-purple-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-6 flex items-center gap-3">
                    <BookOpen className="text-purple-400 w-6 h-6" />
                    Links da Hora
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {links.length > 0 ? links.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-4 p-4 rounded-xl bg-surface/90/50 border border-white/5 transition-all text-secondary hover:bg-white/10 active:scale-95`}
                        >
                            <span className="text-2xl">{link.icon}</span>
                            <span className="font-medium text-lg">{link.title}</span>
                            <ArrowRight className="w-5 h-5 ml-auto opacity-50" />
                        </a>
                    )) : (
                        <div className="col-span-full text-center py-8 text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/5">
                            <p>Nenhum link cadastrado ainda.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );

    const renderGrade = (gradeId) => {
        const gradeInfo = grades.find(g => g.id === gradeId);
        const gradeActivities = activities.filter(a => a.year === gradeId);

        const units = [1, 2, 3];

        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
            >
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div>
                        <h2 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradeInfo.color}`}>
                            Trilhas do {gradeInfo.title}
                        </h2>
                        <p className="text-secondary/80 mt-2 text-lg">Explorando o passado para compreender o presente</p>
                    </div>
                    <button
                        onClick={() => setActiveTab('home')}
                        className="px-6 py-2 rounded-lg bg-surface/90 hover:bg-surface/90/80 border border-white/10 text-secondary flex items-center gap-2 transition-all hover:gap-3"
                    >
                        Voltar <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                </div>

                {units.map((unit) => {
                    const unitActivities = gradeActivities.filter(a => String(a.unit) === String(unit));
                    if (unitActivities.length === 0) return null;

                    return (
                        <div key={unit} className="space-y-4">
                            <h3 className="text-2xl font-bold text-secondary flex items-center gap-2 border-l-4 border-primary pl-4">
                                <LayoutDashboard className="w-6 h-6 text-primary" />
                                Unidade {unit}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {unitActivities.map((activity) => (
                                    <motion.a
                                        key={activity.id}
                                        href={activity.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5 }}
                                        className="glass-card p-4 rounded-xl group block relative overflow-hidden"
                                    >
                                        <div className="h-40 bg-surface/90/50 rounded-lg mb-4 overflow-hidden relative">
                                            {activity.imageUrl ? (
                                                <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                                                    <Gamepad2 className="w-12 h-12 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="bg-primary text-secondary px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                    Acessar
                                                </span>
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">{activity.title}</h4>
                                        {activity.description && <p className="text-sm text-secondary/80 mt-2 line-clamp-2">{activity.description}</p>}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {gradeActivities.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-xl">Nenhuma atividade disponível no momento.</p>
                        <p className="text-sm">Aguarde as novidades da professora!</p>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="min-h-[80vh]">
            {activeTab === 'home' ? renderHome() : renderGrade(activeTab)}
        </div>
    );
};

export default Home;
