import {
  Mail,
  MessageCircle,
  Smartphone,
  Users,
  BarChart3,
  Shield,
  Zap,
  Database,
  Globe,
  Key,
  CreditCard,
  Settings,
  CheckCircle,
  ArrowRight,
  Lock,
  Cloud,
  Bell,
  Target,
  TrendingUp,
  UserCheck,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function Features() {
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
              className="text-blue-600 font-semibold transition-colors"
            >
              Features
            </Link>
            <Link
              href="/learn-more"
              className="text-gray-600 hover:text-gray-900 transition-colors"
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
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Enterprise-Grade Features
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Modern Businesses
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover the comprehensive suite of AI-powered tools and
            enterprise-grade infrastructure that powers Whispley's communication
            platform.
          </p>
        </div>
      </section>

      {/* Core Communication Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Channel Communication
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reach your customers wherever they are with our unified
            communication platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Smart Email Campaigns
            </h3>
            <p className="text-gray-600 mb-4">
              AI-powered email automation with customizable templates, advanced
              analytics, and intelligent routing.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                HTML email templates
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                A/B testing capabilities
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Delivery optimization
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              SMS & WhatsApp Integration
            </h3>
            <p className="text-gray-600 mb-4">
              Seamless integration with popular messaging platforms for instant
              customer engagement.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Multi-platform support
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Intelligent routing
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Real-time delivery
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              AI-Powered Personalization
            </h3>
            <p className="text-gray-600 mb-4">
              Advanced AI algorithms that personalize every interaction based on
              customer behavior and preferences.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Behavioral targeting
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Dynamic content
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Predictive analytics
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Authentication & Security */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Security
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multi-layered security with advanced authentication and compliance
              standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Multi-Factor Authentication
              </h3>
              <p className="text-sm text-gray-600">
                JWT tokens, Google OAuth, TOTP/2FA with backup codes
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                API Key Management
              </h3>
              <p className="text-sm text-gray-600">
                Secure programmatic access with role-based permissions
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Data Encryption
              </h3>
              <p className="text-sm text-gray-600">
                End-to-end encryption with bcrypt password hashing
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <UserCheck className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Role-Based Access
              </h3>
              <p className="text-sm text-gray-600">
                Granular permissions with team-based access control
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Management & Billing */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Team-Based Billing System
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced team management with flexible billing and spending controls
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Smart Team Management
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Team Admin Controls
                  </h4>
                  <p className="text-gray-600">
                    Invite members, set spending limits, and manage team
                    resources
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CreditCard className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Flexible Billing
                  </h4>
                  <p className="text-gray-600">
                    Shared plans with individual balances and admin funding
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Settings className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Spending Controls
                  </h4>
                  <p className="text-gray-600">
                    Monthly spending limits with real-time usage monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Team Roles
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Admin</span>
                <span className="text-sm text-blue-600">Full team control</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-900">Member</span>
                <span className="text-sm text-green-600">
                  Shared plan benefits
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-purple-900">Super Admin</span>
                <span className="text-sm text-purple-600">
                  System administration
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Database Architecture */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Hybrid Database Architecture
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Best-in-class performance with PostgreSQL and MongoDB integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                PostgreSQL Core
              </h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  ACID compliance for financial data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  User management & authentication
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Team relationships & billing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Transactional integrity
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                MongoDB Analytics
              </h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  High-performance analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Template management
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Real-time event tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Flexible data structures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Monitoring */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Analytics & Monitoring
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive insights with real-time monitoring and health checks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Usage Analytics
            </h3>
            <p className="text-gray-600 mb-4">
              Real-time usage tracking with cost calculation and billing
              analytics.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Multi-tier tracking
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Cost optimization
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Team analytics
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Performance Metrics
            </h3>
            <p className="text-gray-600 mb-4">
              System health monitoring with performance optimization insights.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Database health
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Memory & CPU tracking
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Uptime monitoring
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Real-time Alerts
            </h3>
            <p className="text-gray-600 mb-4">
              Proactive monitoring with intelligent alerting and notification
              systems.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Service status alerts
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Usage limit warnings
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                System health reports
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Architecture */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              RESTful API Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Clean, versioned API with comprehensive documentation and testing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Layered Architecture
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Globe className="w-4 h-4 text-blue-500 mr-3" />
                  Controllers - HTTP handling
                </li>
                <li className="flex items-center">
                  <Settings className="w-4 h-4 text-green-500 mr-3" />
                  Services - Business logic
                </li>
                <li className="flex items-center">
                  <Database className="w-4 h-4 text-purple-500 mr-3" />
                  Middleware - Cross-cutting concerns
                </li>
                <li className="flex items-center">
                  <Key className="w-4 h-4 text-red-500 mr-3" />
                  Routes - API organization
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                API Standards
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  RESTful design principles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Consistent response format
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Comprehensive error handling
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Version control (/api/v1/)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our waitlist to be the first to access Whispley's powerful
            communication platform.
          </p>

          <Link
            href="/waitlist"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
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
