import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Award, Info, Mail, LogIn } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const MobileNav = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Início', path: '/', icon: Rocket },
        { name: 'Badges', path: '/badges', icon: Award },
        { name: 'Objetivos', path: '/objetivos', icon: Info },
        { name: 'Admin', path: '/admin', icon: LogIn },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-secondary/10 px-6 py-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <nav className="flex justify-between items-center">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    if (link.path === '/admin') {
                        return (
                            <Link
                                key={link.path}
                                to="/login"
                                className={clsx(
                                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300",
                                    isActive ? "text-primary -translate-y-2" : "text-secondary/60 hover:text-secondary"
                                )}
                            >
                                <div className="p-2 rounded-full transition-all bg-transparent">
                                    <link.icon className="w-5 h-5" />
                                </div>
                                <span className={clsx("text-[10px] font-medium transition-opacity", isActive ? "opacity-100 font-bold" : "opacity-0 h-0 w-0 overflow-hidden")}>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    }
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300",
                                isActive ? "text-primary -translate-y-2" : "text-secondary/60 hover:text-secondary"
                            )}
                        >
                            <div className={clsx(
                                "p-2 rounded-full transition-all",
                                isActive ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-transparent"
                            )}>
                                <link.icon className="w-5 h-5" />
                            </div>
                            <span className={clsx("text-[10px] font-medium transition-opacity", isActive ? "opacity-100 font-bold" : "opacity-0 h-0 w-0 overflow-hidden")}>
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default MobileNav;
