"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>RepasSuivi - Suivez vos repas intelligemment</title>
        <meta name="description" content="RepasSuivi - Votre solution de suivi nutritionnel personnalisé avec suggestions IA" />
      </Head>
      
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <circle cx="200" cy="200" r="190" fill="url(#logoGradient)" />
                  <circle cx="200" cy="200" r="150" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
                  <path d="M140 190 Q170 170, 200 190 Q230 210, 260 190" stroke="#4ADE80" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M100 280 L140 260 L180 270 L220 240 L260 250 L300 230" 
                        stroke="#4F46E5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-indigo-600">
                RepasSuivi
              </h1>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Fonctionnalités</a>
              <a href="#comment-ca-marche" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Comment ça marche</a>
              <a href="#objectifs" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Objectifs</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Se connecter
              </Link>
              <Link href="/auth/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md">
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <section className="pt-12 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Suivez vos repas, <span className="text-indigo-600">atteignez vos objectifs</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                RepasSuivi utilise l&apos;intelligence artificielle pour analyser vos habitudes alimentaires et vous proposer des suggestions personnalisées adaptées à vos objectifs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg text-lg">
                  Commencer gratuitement
                </button>
                <button className="bg-white text-indigo-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors border border-indigo-200 text-lg">
                  En savoir plus
                </button>
              </div>
            </div>
            
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                {/* App Preview - Modern UI mockup */}
                <div className="bg-gray-50 rounded-2xl shadow-xl p-3 max-w-md mx-auto">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                    <div className="h-12 bg-indigo-600 flex items-center justify-between px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="w-40 h-5 bg-indigo-500 rounded-full"></div>
                      <div className="w-5 h-5"></div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <div className="w-32 h-6 bg-gray-200 rounded-md"></div>
                          <div className="w-24 h-4 bg-gray-100 rounded-md mt-2"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Meal Card */}
                        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                          <div className="flex justify-between mb-2">
                            <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
                            <div className="w-16 h-5 bg-indigo-100 rounded-md text-indigo-600 text-xs flex items-center justify-center font-medium">Déjeuner</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
                            <div className="ml-3">
                              <div className="w-32 h-5 bg-gray-200 rounded-md"></div>
                              <div className="w-24 h-4 bg-gray-100 rounded-md mt-2"></div>
                              <div className="w-28 h-3 bg-indigo-100 rounded-md mt-2"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Meal Card */}
                        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                          <div className="flex justify-between mb-2">
                            <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
                            <div className="w-16 h-5 bg-green-100 rounded-md text-green-600 text-xs flex items-center justify-center font-medium">Dîner</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
                            <div className="ml-3">
                              <div className="w-32 h-5 bg-gray-200 rounded-md"></div>
                              <div className="w-24 h-4 bg-gray-100 rounded-md mt-2"></div>
                              <div className="w-28 h-3 bg-green-100 rounded-md mt-2"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Section */}
                        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Objectifs nutritionnels</div>
                            <div className="text-xs text-gray-500">Jour 12</div>
                          </div>
                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Protéines</span>
                              <span className="text-indigo-600 font-medium">72%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full w-3/4"></div>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Glucides</span>
                              <span className="text-green-600 font-medium">65%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full w-2/3"></div>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Lipides</span>
                              <span className="text-blue-600 font-medium">40%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full w-2/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating element 1 */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 border border-gray-200 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Objectif du jour</div>
                      <div className="text-xs text-gray-500">Protéines: 80% atteint</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating element 2 */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 border border-gray-200 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Suggestion IA</div>
                      <div className="text-xs text-gray-500">+2 légumes verts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-indigo-50 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-1">5K+</div>
              <div className="text-gray-500">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-1">98%</div>
              <div className="text-gray-500">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-1">15M+</div>
              <div className="text-gray-500">Repas analysés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-1">87%</div>
              <div className="text-gray-500">Objectifs atteints</div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="fonctionnalites" className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold">FONCTIONNALITÉS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
              Tout ce dont vous avez besoin pour atteindre vos objectifs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RepasSuivi offre une solution complète pour suivre votre alimentation et atteindre vos objectifs de santé.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Suivi des 3 repas principaux</h3>
              <p className="text-gray-600">
                Enregistrez facilement vos petits déjeuners, déjeuners et dîners. L&apos;application calcule automatiquement les valeurs nutritionnelles.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Suggestions IA personnalisées</h3>
              <p className="text-gray-600">
                Recevez des recommandations alimentaires basées sur vos habitudes et objectifs grâce à notre intelligence artificielle avancée.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Suivi des collations</h3>
              <p className="text-gray-600">
                Gardez une trace de toutes vos collations pour avoir une vision complète de votre alimentation au cours de la journée.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Estimation de poids</h3>
              <p className="text-gray-600">
                L&apos;application calcule automatiquement l&apos;impact de votre alimentation sur votre poids en fonction de vos objectifs définis.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Objectifs personnalisés</h3>
              <p className="text-gray-600">
                Définissez vos propres objectifs de santé, que ce soit pour perdre du poids, gagner en masse musculaire ou simplement manger plus équilibré.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Analyse nutritionnelle</h3>
              <p className="text-gray-600">
                Obtenez des analyses détaillées de votre consommation de protéines, glucides, lipides et micronutriments essentiels.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="comment-ca-marche" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold">COMMENT ÇA MARCHE</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
              Suivez vos repas en 3 étapes simples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RepasSuivi simplifie le suivi de votre alimentation en seulement quelques étapes simples.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md h-full relative z-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6">1</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Enregistrez vos repas</h3>
                <p className="text-gray-600">
                  Prenez une photo de votre repas ou sélectionnez les aliments dans notre base de données. RepasSuivi identifie automatiquement les ingrédients.
                </p>
              </div>
              
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md h-full relative z-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6">2</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Suivez vos progrès</h3>
                <p className="text-gray-600">
                  Visualisez votre consommation journalière et hebdomadaire. Obtenez des insights sur vos habitudes alimentaires et votre progression.
                </p>
              </div>
              
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Step 3 */}
            <div>
              <div className="bg-white rounded-xl p-8 shadow-md h-full">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6">3</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Recevez des suggestions</h3>
                <p className="text-gray-600">
                  L&apos;IA analyse vos habitudes et vous propose des ajustements personnalisés pour atteindre vos objectifs de santé plus efficacement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="objectifs" className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold">OBJECTIFS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
              Atteignez vos objectifs de santé
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quelle que soit votre ambition, RepasSuivi vous aide à rester sur la bonne voie.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Goal 1 */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M20 12a8 8 0 01-8 8m8-8a8 8 0 00-8-8m8 8h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Perte ou maintien du poids</h3>
                <p className="text-gray-600 mb-6">
                  Atteignez votre poids idéal grâce à un suivi précis des calories et des conseils nutritionnels adaptés. L&apos;application calcule automatiquement vos besoins quotidiens.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Calcul de déficit calorique optimal</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Suggestion d&apos;alternatives moins caloriques</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Prévisions basées sur vos habitudes</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Goal 2 */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
              <div className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Nutrition équilibrée</h3>
                <p className="text-gray-600 mb-6">
                  Optimisez votre alimentation pour obtenir tous les nutriments essentiels. Découvrez des suggestions personnalisées pour une alimentation plus saine.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Analyse des profils nutritionnels</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Détection des carences nutritionnelles</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Recommandations d&apos;aliments complémentaires</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Goal 3 */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
              <div className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Performance sportive</h3>
                <p className="text-gray-600 mb-6">
                  Optimisez votre alimentation pour améliorer vos performances physiques. Adaptez votre nutrition en fonction de vos activités sportives.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Calcul des besoins protéiques</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Timing optimal des repas pré/post entraînement</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Hydratation et récupération</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Goal 4 */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
              <div className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Habitudes alimentaires saines</h3>
                <p className="text-gray-600 mb-6">
                  Développez des routines alimentaires plus saines et durables. Apprenez à mieux comprendre votre rapport à la nourriture.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Détection des comportements alimentaires</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Suggestions d&apos;équilibre alimentaire</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Aide à la planification des repas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
)
};        