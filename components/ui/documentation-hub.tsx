import React from 'react';

interface DocumentationSection {
  title: string;
  description: string;
  items: Array<{
    name: string;
    path: string;
    description: string;
  }>;
}

const DocumentationHub: React.FC = () => {
  const documentationSections: DocumentationSection[] = [
    {
      title: "Developer Resources",
      description: "Technical documentation and guides for developers",
      items: [
        {
          name: "Developer Onboarding Guide",
          path: "/docs/developer/developer-onboarding-guide.md",
          description: "Get started with Paragame development"
        },
        {
          name: "React Code Style Guide",
          path: "/docs/developer/Paragame_react_code_style.md",
          description: "Coding standards and best practices"
        },
        {
          name: "Data Enhancement Recommendations",
          path: "/docs/developer/data-enhancement-recommendations.md",
          description: "Guidelines for data optimization"
        }
      ]
    },
    {
      title: "Technical Documentation",
      description: "In-depth technical specifications and API documentation",
      items: [
        {
          name: "Comprehensive API Documentation",
          path: "/docs/technical/comprehensive-api-docs.md",
          description: "Complete API reference and examples"
        },
        {
          name: "Enhanced Project Overview",
          path: "/docs/technical/enhanced-project-overview.md",
          description: "Project architecture and structure"
        },
        {
          name: "Prizm Paragame Analysis",
          path: "/docs/technical/prizm-paragame-analysis.md",
          description: "Technical analysis and implementation details"
        },
        {
          name: "Enhanced Technical Documentation",
          path: "/docs/technical/enhanced-technical-docs.md",
          description: "Advanced technical specifications"
        }
      ]
    },
    {
      title: "Whitepaper & Research",
      description: "Academic and research documentation",
      items: [
        {
          name: "Executive Summary",
          path: "/docs/whitepaper/01_executive_summary.md",
          description: "High-level project overview"
        },
        {
          name: "Technical Architecture",
          path: "/docs/whitepaper/03_technical_architecture.md",
          description: "System design and architecture"
        },
        {
          name: "Paragame Protocol",
          path: "/docs/whitepaper/06_paragame_protocol.md",
          description: "Core protocol specification"
        },
        {
          name: "Security and Safety",
          path: "/docs/whitepaper/07_security_and_safety.md",
          description: "Security measures and safety protocols"
        }
      ]
    },
    {
      title: "Business & Legal",
      description: "Business documentation and legal compliance",
      items: [
        {
          name: "Marketing Business Toolkit",
          path: "/docs/business/marketing-business-toolkit.md",
          description: "Marketing resources and strategies"
        },
        {
          name: "Enhanced Legal Compliance",
          path: "/docs/business/enhanced-legal-compliance.md",
          description: "Legal compliance guidelines"
        },
        {
          name: "Terms and Conditions",
          path: "/docs/legal/prizm_paragame_terms.md",
          description: "Legal terms and conditions"
        },
        {
          name: "Disclaimer",
          path: "/docs/legal/prizm_paragame_disclaimer.md",
          description: "Legal disclaimers and notices"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paragame Documentation Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation for the Paragame ecosystem, including developer guides, 
            technical specifications, and business resources.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {documentationSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600">{section.description}</p>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-medium text-gray-900 mb-1">
                      <a 
                        href={item.path} 
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.name}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#examples" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-blue-600 font-medium">Examples</div>
              <div className="text-sm text-gray-500">Component Gallery</div>
            </a>
            <a href="#api" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-green-600 font-medium">API Docs</div>
              <div className="text-sm text-gray-500">Technical Reference</div>
            </a>
            <a href="#guides" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-purple-600 font-medium">Guides</div>
              <div className="text-sm text-gray-500">Step-by-step</div>
            </a>
            <a href="#legal" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-red-600 font-medium">Legal</div>
              <div className="text-sm text-gray-500">Terms & Compliance</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationHub;