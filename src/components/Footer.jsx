import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full pt-8 pb-48 md:py-8 mt-auto bg-surface/90/50 border-t border-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-6 text-center text-secondary/80">
                <p className="mb-2 text-sm text-secondary/70">&copy; {new Date().getFullYear()} Trilhas Digitais de História e LPT</p>
                <p className="text-xs opacity-60 hover:opacity-100 transition-opacity">Desenvolvido com ❤️ para a educação - Profª Regina Almada</p>
            </div>
        </footer>
    );
};
export default Footer;
