"use client";

import {
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Gift,
  Star,
  Bell,
  Mail,
  Smartphone,
  BarChart3,
  Shield,
  Crown,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Waitlist() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    interests: [] as string[],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with actual backend
    console.log("Waitlist submission:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You're In!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for joining the Whispley waitlist. We'll keep you updated
            on our progress and notify you as soon as we're ready to launch.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/features"
              className="block border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/waitlist"
              className="text-blue-600 font-semibold transition-colors"
            >
              Waitlist
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-8">
            <Crown className="w-4 h-4 mr-2" />
            Join the Exclusive Waitlist
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Be the First to Experience
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              The Future
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of forward-thinking businesses waiting to transform
            their customer communication with Whispley's AI-powered platform.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Early Access Benefits
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get exclusive perks and priority access when you join our waitlist
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Priority Access
            </h3>
            <p className="text-gray-600">
              Be among the first to access Whispley when we launch
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Exclusive Discounts
            </h3>
            <p className="text-gray-600">
              Special launch pricing and extended free trials
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Beta Testing
            </h3>
            <p className="text-gray-600">
              Help shape the product with early feedback and testing
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              VIP Support
            </h3>
            <p className="text-gray-600">
              Direct access to our team for onboarding and support
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Tell us about yourself and your communication needs to help us
              prioritize features
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="founder">Founder/CEO</option>
                    <option value="marketing">Marketing Manager</option>
                    <option value="sales">Sales Manager</option>
                    <option value="developer">Developer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="teamSize"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Team Size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select team size</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-20">6-20 people</option>
                  <option value="21-50">21-50 people</option>
                  <option value="51-100">51-100 people</option>
                  <option value="100+">100+ people</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Which features interest you most? (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: "email", label: "Email Campaigns", icon: Mail },
                    { id: "sms", label: "SMS Marketing", icon: Smartphone },
                    {
                      id: "whatsapp",
                      label: "WhatsApp Integration",
                      icon: MessageCircle,
                    },
                    {
                      id: "analytics",
                      label: "Advanced Analytics",
                      icon: BarChart3,
                    },
                    { id: "automation", label: "AI Automation", icon: Zap },
                    {
                      id: "security",
                      label: "Enterprise Security",
                      icon: Shield,
                    },
                  ].map((interest) => (
                    <label
                      key={interest.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest.id)}
                        onChange={() => handleInterestChange(interest.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <interest.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{interest.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              By joining our waitlist, you agree to receive updates about
              Whispley. We respect your privacy and won't spam you.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join the Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of businesses are already waiting for Whispley
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                2,500+
              </div>
              <div className="text-gray-600">Companies on Waitlist</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Represented</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Community Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When will Whispley launch?
              </h3>
              <p className="text-gray-600">
                We're currently in active development with a planned launch in
                Q2 2024. Waitlist members will be notified first and get
                priority access.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Will there be a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! All waitlist members will receive an extended free trial
                period to explore all features and see how Whispley can
                transform their communication.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What makes Whispley different?
              </h3>
              <p className="text-gray-600">
                Whispley is built with a team-first approach, featuring advanced
                AI automation, hybrid database architecture, and
                enterprise-grade security from day one.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I provide feedback during development?
              </h3>
              <p className="text-gray-600">
                Absolutely! Waitlist members will have opportunities to
                participate in beta testing and provide feedback that directly
                influences our product development.
              </p>
            </div>
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
