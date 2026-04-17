import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Loader, Search, Clock, MessageCircle, Link as LinkIcon, BookOpen, Feather, PenTool, LayoutDashboard, Type, CheckCircle, Mic, Zap, Users, Shield, Smartphone } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const badgesData = {
    'historiador': { name: 'Historiador(a) Investigativo(a)', icon: Search, color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/30' },
    'viajante': { name: 'Viajante do Tempo', icon: Clock, color: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-500/30' },
    'debate': { name: 'Guardião/Guardiã do Debate', icon: MessageCircle, color: 'from-pink-400 to-pink-600', shadow: 'shadow-pink-500/30' },
    'conexoes': { name: 'Mestre das Conexões', icon: LinkIcon, color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/30' },
    'leitor': { name: 'Leitor(a) Voraz', icon: BookOpen, color: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/30' },
    'critico': { name: 'Crítico(a) Literário(a)', icon: Feather, color: 'from-red-400 to-red-600', shadow: 'shadow-red-500/30' },
    'poeta': { name: 'Poeta Revelação', icon: PenTool, color: 'from-indigo-400 to-indigo-600', shadow: 'shadow-indigo-500/30' },
    'arquiteto': { name: 'Arquiteto(a) de Mundos', icon: LayoutDashboard, color: 'from-cyan-400 to-cyan-600', shadow: 'shadow-cyan-500/30' },
    'palavras': { name: 'Mestre das Palavras', icon: Type, color: 'from-lime-400 to-lime-600', shadow: 'shadow-lime-500/30' },
    'revisor': { name: 'Revisor(a) Implacável', icon: CheckCircle, color: 'from-yellow-400 to-amber-600', shadow: 'shadow-yellow-500/30' },
    'contador': { name: 'Contador(a) de Histórias', icon: Mic, color: 'from-rose-400 to-rose-600', shadow: 'shadow-rose-500/30' },
    'argumento': { name: 'Poder do Argumento', icon: Zap, color: 'from-fuchsia-400 to-fuchsia-600', shadow: 'shadow-fuchsia-500/30' },
    'colaborador': { name: 'Colaborador(a) Incrível', icon: Users, color: 'from-teal-400 to-teal-600', shadow: 'shadow-teal-500/30' },
    'persistencia': { name: 'Mestre da Persistência', icon: Shield, color: 'from-violet-400 to-violet-600', shadow: 'shadow-violet-500/30' },
    'digital': { name: 'Entusiasta Digital', icon: Smartphone, color: 'from-sky-400 to-sky-600', shadow: 'shadow-sky-500/30' },
};

const Badges = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener for students
        const unsub = onSnapshot(query(collection(db, "students")), (snapshot) => {
            setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => {
            console.error(err);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-primary">
                <Loader className="w-12 h-12 animate-spin mb-4" />
                <p>Carregando Mural das Conquistas...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20"
                >
                    <Trophy className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold font-display text-gradient-gold">
                    Mural das Conquistas
                </h1>
                <p className="text-xl text-secondary/60">Um reconhecimento à evolução dos nossos cyber-estudantes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Object.entries(badgesData).map(([key, badge], index) => {
                    const winners = students.filter(s => s.badges && s.badges.includes(key));

                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>

                            <div className="relative z-10 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                <div className={`w-28 h-28 rounded-2xl rotate-3 bg-gradient-to-br ${badge.color} p-1 ${badge.shadow} shadow-xl group-hover:rotate-12 transition-all duration-500`}>
                                    <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                                        <badge.icon className="w-14 h-14 text-white drop-shadow-md" />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-secondary mb-4 h-12 flex items-center text-center justify-center relative z-10">
                                {badge.name}
                            </h3>

                            <div className="w-full h-px bg-white/10 mb-4"></div>

                            <div className="w-full relative z-10 min-h-[60px]">
                                {winners.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {winners.map(winner => (
                                            <div key={winner.id} className="relative group/tooltip">
                                                <img
                                                    src={winner.avatar}
                                                    alt={winner.name}
                                                    className="w-10 h-10 rounded-full border-2 border-primary/50 object-cover hover:scale-110 transition-transform cursor-help"
                                                />
                                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                    {winner.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-secondary/40 italic py-2">Aguardando um herói...</p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Badges;
