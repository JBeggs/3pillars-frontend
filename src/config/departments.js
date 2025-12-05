// Department Configuration - Three Pillars of Business

export const DEPARTMENTS = {
  management: {
    id: 'management',
    name: 'Operations & Management',
    shortName: 'Management',
    icon: '📋',
    color: 'management',
    description: 'Project and task management services to streamline your operations',
    services: [
      {
        id: 'project-planning',
        name: 'Project Planning & Scheduling',
        description: 'Comprehensive project planning and timeline development',
        category: 'planning',
      },
      {
        id: 'task-management',
        name: 'Task Assignment & Tracking',
        description: 'Efficient task allocation and progress monitoring',
        category: 'management',
      },
      {
        id: 'workflow-management',
        name: 'Workflow Management',
        description: 'Design and optimize business workflows',
        category: 'optimization',
      },
      {
        id: 'resource-allocation',
        name: 'Resource Allocation',
        description: 'Strategic resource planning and allocation',
        category: 'planning',
      },
      {
        id: 'progress-reporting',
        name: 'Progress Reporting',
        description: 'Regular status updates and progress tracking',
        category: 'reporting',
      },
      {
        id: 'team-coordination',
        name: 'Team Coordination',
        description: 'Facilitate team collaboration and communication',
        category: 'collaboration',
      },
    ],
  },
  'technical-sales': {
    id: 'technical-sales',
    name: 'Sales & Marketing',
    shortName: 'Sales',
    icon: '💼',
    color: 'sales',
    description: 'Sales consultation, technical support, and client relationship management',
    services: [
      {
        id: 'sales-consultation',
        name: 'Sales Consultation',
        description: 'Expert sales advice and strategy development',
        category: 'consultation',
      },
      {
        id: 'technical-support',
        name: 'Technical Support',
        description: 'Comprehensive technical assistance and troubleshooting',
        category: 'support',
      },
      {
        id: 'client-relations',
        name: 'Client Relationship Management',
        description: 'Build and maintain strong client relationships',
        category: 'relations',
      },
      {
        id: 'product-demos',
        name: 'Product Demonstrations',
        description: 'Live product demonstrations and walkthroughs',
        category: 'sales',
      },
      {
        id: 'quote-preparation',
        name: 'Quote Preparation',
        description: 'Detailed quotes and proposals',
        category: 'sales',
      },
      {
        id: 'contract-negotiation',
        name: 'Contract Negotiation',
        description: 'Professional contract negotiation services',
        category: 'sales',
      },
    ],
  },
  development: {
    id: 'development',
    name: 'Product & Development',
    shortName: 'Development',
    icon: '💻',
    color: 'development',
    description: 'Software development and technical solutions',
    services: [
      {
        id: 'custom-software',
        name: 'Custom Software Development',
        description: 'Tailored software solutions for your business',
        category: 'development',
      },
      {
        id: 'web-applications',
        name: 'Web Application Development',
        description: 'Modern web applications and platforms',
        category: 'development',
      },
      {
        id: 'api-integration',
        name: 'API Integration',
        description: 'Seamless integration with third-party services',
        category: 'integration',
      },
      {
        id: 'system-maintenance',
        name: 'System Maintenance',
        description: 'Ongoing system support and maintenance',
        category: 'support',
      },
      {
        id: 'code-review',
        name: 'Code Review & Optimization',
        description: 'Expert code review and performance optimization',
        category: 'optimization',
      },
      {
        id: 'technical-docs',
        name: 'Technical Documentation',
        description: 'Comprehensive technical documentation',
        category: 'documentation',
      },
    ],
  },
}

export const getDepartment = (id) => DEPARTMENTS[id] || null

export const getAllDepartments = () => Object.values(DEPARTMENTS)

