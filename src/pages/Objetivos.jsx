import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Brain, Layers, LineChart, CheckCircle } from 'lucide-react';

const Objetivos = () => {
    const goals = [
        { title: 'Autonomia no Aprendizado', icon: Target, desc: 'Desenvolver a capacidade de auto-gestão do conhecimento, permitindo avanços no próprio ritmo.', color: 'text-blue-400' },
        { title: 'Aprendizagem em Camadas', icon: Layers, desc: 'Conteúdos históricos estratificados, partindo do concreto para o abstrato.', color: 'text-green-400' },
        { title: 'Gamificação Educacional', icon: Zap, desc: 'Elementos lúdicos como conquistas e níveis para aumentar o engajamento.', color: 'text-purple-400' },
        { title: 'Pensamento Histórico', icon: Brain, desc: 'Análise crítica, temporalidade e contextualização de fenômenos.', color: 'text-yellow-400' },
        { title: 'Aprendizagem Colaborativa', icon: Users, desc: 'Incentivo à troca de conhecimentos e construção coletiva do saber.', color: 'text-red-400' },
        { title: 'Acompanhamento', icon: LineChart, desc: 'Dados precisos sobre o progresso dos alunos para intervenções direcionadas.', color: 'text-indigo-400' },
    ];

    const competencies = [
        'Utilizar tecnologias digitais de forma crítica, ética e criativa.',
        'Compreender o impacto das tecnologias na sociedade.',
        'Produzir e compartilhar conhecimento em ambientes digitais.',
        'Expressar-se em diferentes linguagens (textual, visual, sonora).',
        'Saber utilizar diferentes plataformas digitais para comunicação.'
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-16"
        >
            <div className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                    Objetivos Pedagógicos
                </h1>
                <p className="text-xl text-secondary/80">
                    Nossa missão é transformar o ensino de História através de trilhas digitais interativas e personalizadas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group"
                    >
                        <div className={`p-3 rounded-lg bg-surface/90 w-fit mb-4 ${goal.color}`}>
                            <goal.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">{goal.title}</h3>
                        <p className="text-secondary/80 text-sm leading-relaxed">{goal.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center bg-surface/90/30 p-8 rounded-3xl border border-white/5">
                <div>
                    <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                        <Zap className="text-yellow-400" />
                        Competência Geral BNCC
                    </h2>
                    <p className="text-secondary/80 mb-6">Foco na Cultura Digital para preparar o estudante para o século XXI.</p>
                    <ul className="space-y-4">
                        {competencies.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-secondary/70">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                    <div className="relative z-10 text-center">
                        <h3 className="text-xl font-bold text-secondary mb-4">O que são as Trilhas?</h3>
                        <p className="text-secondary/70">
                            São percursos educacionais estruturados que funcionam como mapas de aprendizagem interativos.
                            Cada trilha é uma jornada autoguiada por temas históricos, combinando diferentes mídias e desafios.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Objetivos;
