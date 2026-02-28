import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Loader } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const badgesData = {
    'historiador': { name: 'Historiador(a) Investigativo(a)', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_1o0oh11o0oh11o0o.png' },
    'viajante': { name: 'Viajante do Tempo', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_23uuf123uuf123uu.png' },
    'debate': { name: 'Guardião/Guardiã do Debate', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_3od0ct3od0ct3od0.png' },
    'conexoes': { name: 'Mestre das Conexões', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_7fue387fue387fue.png' },
    'leitor': { name: 'Leitor(a) Voraz', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_8rl7cd8rl7cd8rl7.png' },
    'critico': { name: 'Crítico(a) Literário(a)', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_dkxxrpdkxxrpdkxx.png' },
    'poeta': { name: 'Poeta Revelação', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_gu9j15gu9j15gu9j.png' },
    'arquiteto': { name: 'Arquiteto(a) de Mundos', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_iv4loriv4loriv4l.png' },
    'palavras': { name: 'Mestre das Palavras', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_oe7724oe7724oe77.png' },
    'revisor': { name: 'Revisor(a) Implacável', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_pal527pal527pal5.png' },
    'contador': { name: 'Contador(a) de Histórias', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_par0fppar0fppar0.png' },
    'argumento': { name: 'Poder do Argumento', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_rntrmmrntrmmrntr.png' },
    'colaborador': { name: 'Colaborador(a) Incrível', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_uo499wuo499wuo49.png' },
    'persistencia': { name: 'Mestre da Persistência', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_wts3jewts3jewts3.png' },
    'digital': { name: 'Entusiasta Digital', url: 'https://oda.nekoweb.org/badges/Gemini_Generated_Image_yg4ur4yg4ur4yg4u.png' },
};

const Badges = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'students'));
                setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchData();
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
                    <Trophy className="w-10 h-10 text-secondary" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold font-display text-gradient-gold">
                    Mural das Conquistas
                </h1>
                <p className="text-xl text-secondary/80">Um reconhecimento à evolução dos nossos cyber-estudantes</p>
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
                                <img src={badge.url} alt={badge.name} className="w-32 h-32 object-contain drop-shadow-2xl" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-100 mb-4 h-12 flex items-center justify-center relative z-10">
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
                                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 text-secondary text-xs px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                    {winner.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic py-2">Aguardando um herói...</p>
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
