import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Award, Info, Mail, LogIn } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Início', path: '/', icon: Rocket },
        { name: 'Mural das Conquistas', path: '/badges', icon: Award },
        { name: 'Objetivos', path: '/objetivos', icon: Info },
    ];

    return (
        <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                        <Rocket className="text-primary w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary uppercase tracking-tight">Trilhas Digitais</h1>
                        <p className="text-[10px] text-secondary/60 leading-none">Escola Modelo de Conceição</p>
                        <p className="text-[11px] text-secondary font-bold mt-0.5">Profª: Regina Almada</p>
                        <p className="text-[10px] text-secondary/70 italic leading-none">História & Ensino Religioso</p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 relative group",
                                location.pathname === link.path ? "text-primary" : "text-secondary/70"
                            )}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div layoutId="underline" className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-primary" />
                            )}
                        </Link>
                    ))}
                    <Link to="/login" className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 text-sm font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        Acesso Restrito
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
