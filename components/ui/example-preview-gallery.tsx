"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ExampleItem {
  id: string;
  title: string;
  description: string;
  category: 'Layout' | 'Page' | 'Game' | 'App';
  previewImage?: string;
  componentPath: string;
  features: string[];
}

const ExamplePreviewGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedExample, setSelectedExample] = useState<ExampleItem | null>(null);

  const examples: ExampleItem[] = [
    {
      id: 'paragame-desktop-layout',
      title: 'Paragame Desktop Layout',
      description: 'Full-featured desktop layout with sidebar navigation and responsive design',
      category: 'Layout',
      previewImage: '/static/preview/pzm-ui-templates-1.png',
      componentPath: '/components/layouts/paragame-desktop-layout.tsx',
      features: ['Responsive Design', 'Sidebar Navigation', 'Desktop Optimized', 'Theme Support']
    },
    {
      id: 'paragame-mobile-layout',
      title: 'Paragame Mobile Layout',
      description: 'Mobile-first layout optimized for touch interactions',
      category: 'Layout',
      previewImage: '/static/preview/pzm-ui-templates-2.png',
      componentPath: '/components/layouts/paragame-mobile-layout.tsx',
      features: ['Mobile Optimized', 'Touch Friendly', 'Bottom Navigation', 'Swipe Gestures']
    },
    {
      id: 'integrated-gaming-app-mobile',
      title: 'Integrated Gaming App Mobile',
      description: 'Complete mobile gaming app layout with game integration',
      category: 'Layout',
      previewImage: '/static/preview/pzm-ui-templates-3.png',
      componentPath: '/components/layouts/integrated-gaming-app-mobile.tsx',
      features: ['Gaming Focus', 'Mobile Native', 'Game Integration', 'Performance Optimized']
    },
    {
      id: 'paragame-dashboard-layout',
      title: 'Paragame Dashboard Layout',
      description: 'Analytics and dashboard layout for admin and user management',
      category: 'Layout',
      previewImage: '/static/preview/pzm-ui-templates-4.png',
      componentPath: '/components/layouts/paragame-dashboard-layout.tsx',
      features: ['Analytics Dashboard', 'Data Visualization', 'Admin Tools', 'User Management']
    },
    {
      id: 'paragame-casino-desktop',
      title: 'Paragame Casino Desktop',
      description: 'Desktop casino interface with game selection and betting features',
      category: 'Page',
      previewImage: '/static/preview/pzm-ui-templates-5.png',
      componentPath: '/components/pages/paragame-casino-desktop.tsx',
      features: ['Casino Games', 'Betting Interface', 'Game Selection', 'Desktop UI']
    },
    {
      id: 'paragame-casino-mobile-gamelist',
      title: 'Casino Mobile Game List',
      description: 'Mobile casino game selection with touch-friendly interface',
      category: 'Page',
      previewImage: '/static/preview/pzm-ui-templates-6.png',
      componentPath: '/components/pages/paragame-casino-mobile-gamelist.tsx',
      features: ['Mobile Casino', 'Game Grid', 'Touch Interface', 'Filter Options']
    },
    {
      id: 'cryptosea-battle',
      title: 'CryptoSea Battle',
      description: 'Interactive battle game interface with dark theme',
      category: 'Game',
      previewImage: '/static/preview/pzm-ui-templates-7.png',
      componentPath: '/components/pages/cryptosea-battle.tsx',
      features: ['Battle Game', 'Dark Theme', 'Interactive UI', 'Real-time Updates']
    },
    {
      id: 'cryptosea-battle-white',
      title: 'CryptoSea Battle (Light)',
      description: 'Interactive battle game interface with light theme',
      category: 'Game',
      previewImage: '/static/preview/pzm-ui-templates-8.png',
      componentPath: '/components/pages/cryptosea-battle-white.tsx',
      features: ['Battle Game', 'Light Theme', 'Interactive UI', 'Clean Design']
    },
    {
      id: 'paragame-protocol-app',
      title: 'Paragame Protocol App',
      description: 'Protocol interface for blockchain interactions and DeFi features',
      category: 'App',
      previewImage: '/static/preview/pzm-ui-templates-9.png',
      componentPath: '/components/pages/paragame-protocol-app.tsx',
      features: ['Blockchain Integration', 'DeFi Features', 'Protocol Interface', 'Wallet Connect']
    }
  ];

  const categories = ['All', 'Layout', 'Page', 'Game', 'App'];

  const filteredExamples = selectedCategory === 'All' 
    ? examples 
    : examples.filter(example => example.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Example Preview Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of UI components, layouts, and interactive examples. 
            Each example showcases different features and design patterns.
          </p>
        </header>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <div key={example.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                {example.previewImage ? (
                  <img 
                    src={example.previewImage} 
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎮</div>
                      <div>Preview Coming Soon</div>
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    example.category === 'Layout' ? 'bg-blue-100 text-blue-800' :
                    example.category === 'Page' ? 'bg-green-100 text-green-800' :
                    example.category === 'Game' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {example.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {example.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {example.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                    {example.features.length > 3 && (
                      <span className="text-gray-500 text-xs px-2 py-1">
                        +{example.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => setSelectedExample(example)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Details
                  </Button>
                  <a 
                    href={example.componentPath}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedExample && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedExample.title}
                  </h2>
                  <Button
                    onClick={() => setSelectedExample(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="mb-4">
                  {selectedExample.previewImage && (
                    <img 
                      src={selectedExample.previewImage} 
                      alt={selectedExample.title}
                      className="w-full rounded-lg"
                    />
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">
                  {selectedExample.description}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedExample.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={selectedExample.componentPath}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source Code
                  </a>
                  <Button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    Live Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamplePreviewGallery;