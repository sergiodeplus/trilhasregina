import React from 'react';
import Header from './Header';
import Footer from './Footer';

import MobileNav from './MobileNav';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow pt-28 px-4 sm:px-6 relative z-10">
                {/* Background Effects */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                    {/* Top Left Gradient */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
                    {/* Bottom Right Gradient */}
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
                    {/* Middle Gradient */}
                    <div className="absolute top-[30%] left-[20%] w-[20%] h-[20%] bg-accent/10 rounded-full blur-[100px] opacity-10"></div>
                </div>
                <div className="container mx-auto pb-24 md:pb-12">
                    {children}
                </div>
            </main>
            <Footer />
            <MobileNav />
        </div>
    );
};

export default Layout;
