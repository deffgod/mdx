import React from 'react';
import { Craft } from "@/components/craft";

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const MainHub: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Components',
      value: '10+',
      description: 'Ready-to-use UI components',
      icon: '🧩',
      color: 'blue'
    },
    {
      title: 'Examples',
      value: '15+',
      description: 'Interactive demos and previews',
      icon: '🎨',
      color: 'purple'
    },
    {
      title: 'Documentation',
      value: '25+',
      description: 'Comprehensive guides and docs',
      icon: '📚',
      color: 'green'
    },
    {
      title: 'Games',
      value: '5+',
      description: 'Interactive gaming components',
      icon: '🎮',
      color: 'orange'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'Browse Examples',
      description: 'Explore component gallery with live previews',
      icon: '🔍',
      href: '/examples',
      color: 'blue'
    },
    {
      title: 'Read Documentation',
      description: 'Access guides, API docs, and tutorials',
      icon: '📖',
      href: '/documentation',
      color: 'green'
    },
    {
      title: 'View Components',
      description: 'Browse all available UI components',
      icon: '⚡',
      href: '/components',
      color: 'purple'
    },
    {
      title: 'Developer Guide',
      description: 'Get started with development setup',
      icon: '🚀',
      href: '/docs/developer/developer-onboarding-guide.md',
      color: 'orange'
    }
  ];

  const recentUpdates = [
    {
      title: 'New Mobile Gaming Layout',
      description: 'Added integrated gaming app layout for mobile devices',
      date: '2 days ago',
      type: 'Component'
    },
    {
      title: 'Enhanced API Documentation',
      description: 'Updated comprehensive API documentation with new examples',
      date: '1 week ago',
      type: 'Documentation'
    },
    {
      title: 'CryptoSea Battle Components',
      description: 'New interactive battle game components with light/dark themes',
      date: '2 weeks ago',
      type: 'Game'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Craft.Header>
        <Craft.Container>
          <Craft.Logo>
            <Craft.Image src="/logo.png" alt="Prizm Hub" />
          </Craft.Logo>
        </Craft.Container>
      </Craft.Header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Paragame Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your central hub for exploring components, documentation, and examples. 
            Build amazing gaming and DeFi applications with our comprehensive UI library.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className={`p-6 rounded-lg border-2 ${getColorClasses(stat.color)}`}>
              <div className="flex items-center">
                <div className="text-3xl mr-4">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="font-medium">{stat.title}</div>
                  <div className="text-sm opacity-75 mt-1">{stat.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mr-4">{action.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600">→</div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Updates</h2>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{update.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500">{update.date}</div>
                      <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mt-1">
                        {update.type}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-xl mb-6 opacity-90">
            Start exploring our components and build your next gaming or DeFi application
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/examples"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Examples
            </a>
            <a
              href="/documentation"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Read Docs
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gaming Components</h3>
            <p className="text-gray-600 text-sm">
              Interactive gaming interfaces including casino, battle, and arcade-style components
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">DeFi Integration</h3>
            <p className="text-gray-600 text-sm">
              Blockchain-ready components with wallet integration and protocol interfaces
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile First</h3>
            <p className="text-gray-600 text-sm">
              Responsive layouts optimized for mobile gaming and touch interactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHub;