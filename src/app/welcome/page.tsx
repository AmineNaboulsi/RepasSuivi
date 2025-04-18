"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    setIsAnimated(true);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Email submitted:', email);
    alert('Merci ! Vous serez informé du lancement.');
    setEmail('');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col justify-center text-white overflow-hidden">
      <Head>
        <title>RepasSuivi - Bientôt disponible</title>
        <meta name="description" content="RepasSuivi - Votre solution de suivi nutritionnel personnalisé" />
      </Head>
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className={`absolute top-1/4 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-5 ${isAnimated ? 'animate-blob' : ''}`}></div>
        <div className={`absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-5 ${isAnimated ? 'animate-blob animation-delay-2000' : ''}`}></div>
        <div className={`absolute top-1/2 left-1/3 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl opacity-5 ${isAnimated ? 'animate-blob animation-delay-4000' : ''}`}></div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="w-64 h-64 mx-auto lg:mx-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F9FAFB" />
                        <stop offset="100%" stopColor="#F3F4F6" />
                      </linearGradient>
                    </defs>
                    
                    <circle cx="200" cy="200" r="190" fill="url(#bgGradient)" />
                    
                    <circle cx="200" cy="200" r="150" fill="url(#plateGradient)" stroke="#E5E7EB" strokeWidth="2" />
                    
                    <path d="M140 190 Q170 170, 200 190 Q230 210, 260 190" stroke="#4ADE80" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M150 180 Q185 160, 220 180 Q245 195, 270 180" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" fill="none" />
                    
                    <rect x="170" y="200" width="60" height="35" rx="5" ry="5" fill="#FB923C" />
                    
                    <circle cx="260" cy="230" r="25" fill="#FBBF24" />
                    
                    <path d="M100 280 L140 260 L180 270 L220 240 L260 250 L300 230" 
                          stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    
                    <circle cx="200" cy="200" r="165" stroke="#8B5CF6" strokeWidth="6" strokeDasharray="650 1036" strokeLinecap="round" fill="none" />
                    
                    <path d="M100 120 L100 190" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M120 120 L120 190" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M100 190 Q110 210, 120 190" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
                    
                    <path d="M290 120 L290 190" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M290 120 L310 150 L290 190" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                
              </div>
              
              <div className="bg-indigo-900/50 backdrop-blur-md w-fit mx-auto lg:mx-0 px-4 py-2 rounded-full border border-indigo-500/30 mb-8 mt-6">
                <span className="text-sm font-medium text-indigo-300">Bientôt disponible en 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                RepasSuivi
              </h1>
              
              <p className="text-lg text-indigo-100 mb-8 max-w-xl leading-relaxed">
                Suivez votre alimentation, analysez vos habitudes et recevez des recommandations personnalisées pour atteindre vos objectifs de santé.
              </p>
            </div>
            
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <h2 className="text-2xl font-semibold mb-2">Restez informé</h2>
                <p className="text-indigo-200 mb-6">
                  Soyez le premier à être informé du lancement de RepasSuivi et obtenez un accès anticipé.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
                      Adresse email
                    </label>
                    <input 
                      id="email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="votre@email.com" 
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg shadow-indigo-500/30"
                  >
                    Me notifier du lancement
                  </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-xs text-indigo-300">Sécurisé</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">+5K</div>
                    <div className="text-xs text-indigo-300">Utilisateurs intéressés</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-md rounded-xl p-1">
                <div className="flex flex-wrap items-center divide-x divide-white/10">
                  <div className="px-4 py-2 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Suivi intuitif</span>
                  </div>
                  <div className="px-4 py-2 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Analyses avancées</span>
                  </div>
                  <div className="px-4 py-2 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Conseils personnalisés</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`mt-16 lg:mt-24 transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-indigo-200">
                    Rejoignez plus de <span className="font-semibold text-white">5,000</span> personnes qui attendent déjà le lancement de RepasSuivi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-indigo-300/60 text-sm relative z-10">
        <div className="container mx-auto px-4">
          <p>© 2025 RepasSuivi. Tous droits réservés.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}