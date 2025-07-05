import {
  MessageCircle,
  ArrowRight,
  Database,
  Shield,
  Users,
  Zap,
  Globe,
  CheckCircle,
  Code,
  Server,
  Layers,
  TrendingUp,
  Target,
  Lightbulb,
  Heart,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Whispley</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/learn-more"
              className="text-blue-600 font-semibold transition-colors"
            >
              About
            </Link>
            <Link
              href="/waitlist"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              Get Notified
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 text-sm font-medium mb-8">
            <Lightbulb className="w-4 h-4 mr-2" />
            The Future of Communication
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Redefining How
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Businesses Connect
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Whispley is more than just a communication platform—it's a
            comprehensive ecosystem designed to transform how businesses engage
            with their customers through intelligent automation and cutting-edge
            technology.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We envision a world where every business interaction is
              meaningful, personalized, and efficient. Whispley bridges the gap
              between advanced AI technology and human-centered communication.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Intelligent Automation
                  </h3>
                  <p className="text-gray-600">
                    AI-powered systems that learn and adapt to your business
                    needs
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Human-Centered Design
                  </h3>
                  <p className="text-gray-600">
                    Technology that enhances rather than replaces human
                    connection
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Scalable Growth
                  </h3>
                  <p className="text-gray-600">
                    Solutions that grow with your business, from startup to
                    enterprise
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Built for the Future</h3>
            <p className="text-blue-100 mb-6">
              Our platform is designed with tomorrow's challenges in mind,
              incorporating the latest advances in AI, cloud computing, and
              enterprise architecture.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-blue-100">Uptime SLA</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">10x</div>
                <div className="text-sm text-blue-100">Faster Setup</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">AI Support</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">SOC 2</div>
                <div className="text-sm text-blue-100">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technical Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on a foundation of modern, scalable architecture with
              enterprise-grade security and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Layered Architecture
              </h3>
              <p className="text-gray-600 mb-4">
                Clean separation of concerns with controllers, services, and
                middleware layers for maintainable, scalable code.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Express.js + TypeScript
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  RESTful API design
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Comprehensive testing
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Hybrid Database System
              </h3>
              <p className="text-gray-600 mb-4">
                PostgreSQL for transactional integrity and MongoDB for
                high-performance analytics and flexible data structures.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  ACID compliance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Real-time analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Seamless migration
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-600 mb-4">
                Multi-factor authentication, role-based access control, and
                comprehensive security monitoring.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  JWT + OAuth 2.0
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  TOTP/2FA support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  End-to-end encryption
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team-Based Innovation */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionary Team Management
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our innovative team-based billing system redefines how organizations
            manage communication resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Smart Billing Architecture
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">Admin Controls</h4>
                <p className="text-gray-600">
                  Team administrators can invite members, set spending limits,
                  and fund accounts with granular control.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">
                  Shared Plan Benefits
                </h4>
                <p className="text-gray-600">
                  Team members inherit admin plan benefits while maintaining
                  individual usage tracking and balances.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900">
                  Spending Controls
                </h4>
                <p className="text-gray-600">
                  Monthly spending limits with real-time monitoring prevent
                  budget overruns and ensure cost predictability.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why This Matters
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Traditional communication platforms treat every user as an
              individual entity. Whispley recognizes that modern businesses
              operate as teams, requiring sophisticated resource management and
              collaborative features.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900">
                  Team Collaboration
                </h4>
                <p className="text-sm text-gray-600">
                  Built for how teams actually work
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-semibold text-gray-900">Cost Efficiency</h4>
                <p className="text-sm text-gray-600">
                  Optimize spending across teams
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <Shield className="w-8 h-8 text-purple-600 mb-2" />
                <h4 className="font-semibold text-gray-900">Access Control</h4>
                <p className="text-sm text-gray-600">
                  Granular permissions management
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <Award className="w-8 h-8 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900">Accountability</h4>
                <p className="text-sm text-gray-600">Complete audit trails</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Development Philosophy
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Every line of code is written with purpose, scalability, and user
              experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Clean Architecture
              </h3>
              <p className="text-blue-100">
                Following SOLID principles and clean code practices for
                maintainable, testable, and scalable software.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Performance First
              </h3>
              <p className="text-blue-100">
                Optimized for speed and efficiency with hybrid database
                architecture and intelligent caching strategies.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Global Scale
              </h3>
              <p className="text-blue-100">
                Built to handle millions of messages across multiple channels
                with enterprise-grade reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Behind the Scenes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A glimpse into the technical innovations that power Whispley's
            communication platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Multi-Channel Integration
            </h3>
            <p className="text-gray-600 mb-4">
              Seamlessly integrate with email, SMS, and WhatsApp through unified
              APIs with intelligent routing and failover mechanisms.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Email Delivery</span>
                <span className="text-sm text-green-600">
                  99.5% Success Rate
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">SMS Delivery</span>
                <span className="text-sm text-green-600">
                  98.9% Success Rate
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">WhatsApp</span>
                <span className="text-sm text-green-600">
                  99.2% Success Rate
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Real-Time Analytics
            </h3>
            <p className="text-gray-600 mb-4">
              Advanced analytics engine powered by MongoDB for real-time
              insights and predictive analytics.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Data Processing</span>
                <span className="text-sm text-blue-600">&lt;100ms Latency</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Report Generation</span>
                <span className="text-sm text-blue-600">Real-time Updates</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Predictive Analysis</span>
                <span className="text-sm text-blue-600">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Meet the Creator
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">PN</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Philip Nwabuwa
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Full-stack developer and entrepreneur passionate about creating
                technology that empowers businesses to build meaningful
                connections with their customers.
              </p>
              <p className="text-gray-600">
                "Whispley represents my vision of how communication technology
                should work—intelligent, intuitive, and built for the way modern
                businesses actually operate. Every feature is designed with
                real-world use cases in mind, backed by enterprise-grade
                architecture that scales with your success."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of forward-thinking businesses waiting to experience
            the future of customer engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/waitlist"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all flex items-center"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/features"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Whispley</span>
            </Link>

            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                © 2024 Whispley. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">Created by Philip Nwabuwa</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
