import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full pt-8 pb-48 md:py-8 mt-auto bg-surface/90/50 border-t border-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-6 text-center text-sm font-medium">
                <p className="mb-2 text-secondary/60 uppercase tracking-tighter">Trilhas Digitais de História & Ensino Religioso</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs text-secondary/40">
                    <p>&copy; {new Date().getFullYear()} - Escola Modelo de Conceição</p>
                    <span className="hidden md:inline">•</span>
                    <p>Profª Regina Almada</p>
                    <span className="hidden md:inline">•</span>
                    <p className="opacity-60 hover:opacity-100 transition-opacity">Vibe Coding Platform</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
