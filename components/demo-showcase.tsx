"use client"

import { useState } from 'react'
import AnimateText from '@/components/animations/animate-text'
import Counter from '@/components/animations/counter'
import Calendar from '@/components/cards/calendar'
import GoogleInput from '@/components/inputs/google'
import PasswordStrength from '@/components/inputs/password-strength'
import Sparkles from '@/components/buttons/sparkles'
import StatusButton from '@/components/buttons/status-button'
import ThemeSwitcher from '@/components/shared/mode-toggle'


interface DemoItem {
  id: string
  name: string
  category: string
  component: React.ReactNode
  description: string
}

export default function DemoShowcase() {
  const [activeDemo, setActiveDemo] = useState<string>('animate-text')
  
  const demos: DemoItem[] = [
    {
      id: 'animate-text',
      name: 'AnimateText',
      category: 'Animations',
      component: <AnimateText words={["Welcome", "to", "PROTOCOL", "UI"]} className="text-2xl font-bold" />,
      description: 'Dynamic text animation with cycling words'
    },
    {
      id: 'counter',
      name: 'Counter',
      category: 'Animations', 
      component: <Counter min={0} max={1000} initial={250} className="text-lg" />,
      description: 'Animated counter with increment/decrement controls'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      category: 'Cards',
      component: <Calendar />,
      description: 'Interactive calendar with smooth animations'
    },
    {
      id: 'google-input',
      name: 'GoogleInput',
      category: 'Inputs',
      component: <GoogleInput label="Email Address" type="email" className="max-w-sm" />,
      description: 'Google-style floating label input field'
    },
    {
      id: 'password-strength',
      name: 'PasswordStrength', 
      category: 'Inputs',
      component: <PasswordStrength className="max-w-sm" />,
      description: 'Password input with real-time strength visualization'
    },
    {
      id: 'sparkles',
      name: 'Sparkles',
      category: 'Buttons',
      component: <Sparkles>Click me!</Sparkles>,
      description: 'Button with animated particle effects'
    },
    {
      id: 'status-button',
      name: 'StatusButton',
      category: 'Buttons', 
      component: <StatusButton>Submit Form</StatusButton>,
      description: 'Button with loading and success states'
    },
    {
      id: 'theme-switcher',
      name: 'ThemeSwitcher',
      category: 'Shared',
      component: <ThemeSwitcher />,
      description: 'Animated theme toggle with system detection'
    }
  ]

  const categories = Array.from(new Set(demos.map(demo => demo.category)))
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Interactive Component Demo</h1>
        <p className="text-muted-foreground">
          Explore and interact with all components from the PROTOCOL UI Library
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h3 className="font-semibold mb-4">Categories</h3>
            {categories.map(category => (
              <div key={category} className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
                <div className="space-y-1">
                  {demos
                    .filter(demo => demo.category === category)
                    .map(demo => (
                      <button
                        type="button"
                        key={demo.id}
                        onClick={() => setActiveDemo(demo.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeDemo === demo.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {demo.name}
                      </button>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Display */}
        <div className="lg:col-span-3">
          {demos
            .filter(demo => demo.id === activeDemo)
            .map(demo => (
              <div key={demo.id} className="space-y-6">
                {/* Demo Header */}
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                      {demo.category}
                    </span>
                    <h2 className="text-2xl font-bold">{demo.name}</h2>
                  </div>
                  <p className="text-muted-foreground">{demo.description}</p>
                </div>

                {/* Demo Component */}
                <div className="min-h-[300px] border rounded-lg p-8 bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {demo.component}
                  </div>
                </div>

                {/* Code Example */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Usage Example</h3>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{getCodeExample(demo.id)}</pre>
                  </div>
                </div>

                {/* Component Props */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Props</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 font-medium">Prop</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Default</th>
                          <th className="text-left p-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPropsForComponent(demo.id).map((prop, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3 font-mono text-sm">{prop.name}</td>
                            <td className="p-3 font-mono text-sm text-muted-foreground">{prop.type}</td>
                            <td className="p-3 font-mono text-sm text-muted-foreground">{prop.default}</td>
                            <td className="p-3 text-sm">{prop.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

function getCodeExample(componentId: string): string {
  const examples: Record<string, string> = {
    'animate-text': `import AnimateText from '@/components/animations/animate-text'

export default function Example() {
  return (
    <AnimateText 
      words={["Welcome", "to", "PROTOCOL", "UI"]} 
      className="text-2xl font-bold"
    />
  )
}`,
    'counter': `import { Counter } from '@/components/animations'

export default function Example() {
  return (
    <Counter 
      min={0} 
      max={1000} 
      initial={250}
    />
  )
}`,
    'calendar': `import { Calendar } from '@/components/cards'

export default function Example() {
  return <Calendar />
}`,
    'google-input': `import { GoogleInput } from '@/components/inputs'

export default function Example() {
  return (
    <GoogleInput 
      label="Email Address" 
      type="email" 
    />
  )
}`,
    'password-strength': `import { PasswordStrength } from '@/components/inputs'

export default function Example() {
  return <PasswordStrength />
}`,
    'sparkles': `import { Sparkles } from '@/components/buttons'

export default function Example() {
  return (
    <Sparkles>
      Click me!
    </Sparkles>
  )
}`,
    'status-button': `import { StatusButton } from '@/components/buttons'

export default function Example() {
  return (
    <StatusButton>
      Submit Form
    </StatusButton>
  )
}`,
    'theme-switcher': `import { ThemeSwitcher } from '@/components/shared'

export default function Example() {
  return <ThemeSwitcher />
}`
  }
  
  return examples[componentId] || '// Example not available'
}

function getPropsForComponent(componentId: string) {
  const propData: Record<string, Array<{name: string, type: string, default: string, description: string}>> = {
    'animate-text': [
      { name: 'words', type: 'string[]', default: '-', description: 'Array of words to cycle through' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' },
      { name: 'duration', type: 'number', default: '2000', description: 'Duration for each word (ms)' }
    ],
    'counter': [
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'initial', type: 'number', default: '0', description: 'Initial value' },
      { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' }
    ],
    'calendar': [
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' },
      { name: 'onDateSelect', type: 'function', default: '-', description: 'Date selection callback' }
    ],
    'google-input': [
      { name: 'label', type: 'string', default: '-', description: 'Input label text' },
      { name: 'type', type: 'string', default: 'text', description: 'Input type' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' }
    ],
    'password-strength': [
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' },
      { name: 'onStrengthChange', type: 'function', default: '-', description: 'Strength change callback' }
    ],
    'sparkles': [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' }
    ],
    'status-button': [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' },
      { name: 'onClick', type: 'function', default: '-', description: 'Click handler' }
    ],
    'theme-switcher': [
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes' }
    ]
  }
  
  return propData[componentId] || []
}

