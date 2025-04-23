"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMinimize2, FiFileText, FiUsers, FiUserCheck, FiFilter, FiMoreHorizontal, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navigation';

const HomePage = () => {
  const router = useRouter();

  const handlegotoRegister = () => {
    router.push("/signin");
  }

  const handleNavigateToFeatures = () => {
    router.push("#features");
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4">
        <section className="text-center py-20">
          <h1 className="text-6xl font-bold mb-4">TManage</h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your team's tasks and manage projects effortlessly.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={handlegotoRegister}>Get Started</Button>
            <Button size="lg" variant="outline" onClick={handleNavigateToFeatures}>Explore</Button>
          </div>
        </section>

        <section id="features" className="py-20">
          <h2 className="text-3xl font-bold mb-2">Features</h2>
          <p className="text-gray-600 mb-8">See what we have cooked till now for you.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiMinimize2 className="w-6 h-6" />}
              title="Minimalist Design"
              description="Clean and intuitive interface for effortless task management."
            />
            <FeatureCard
              icon={<FiFileText className="w-6 h-6" />}
              title="Markdown-based Editor"
              description="Write and format your tasks with ease using Markdown syntax."
            />
            <FeatureCard
              icon={<FiUserCheck className="w-6 h-6" />}
              title="Role based Control"
              description="Manage permissions and access levels for team members."
            />
            <FeatureCard
              icon={<FiUsers className="w-6 h-6" />}
              title="Work in Teams"
              description="Collaborate seamlessly with your team members on projects."
            />
            <FeatureCard
              icon={<FiFilter className="w-6 h-6" />}
              title="Filter by Tags"
              description="Organize and find tasks quickly with customizable tags."
            />
            <FeatureCard
              icon={<FiMoreHorizontal className="w-6 h-6" />}
              title="Many more are under development.."
              description="We're constantly improving and adding new features."
            />
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <h2 className="text-3xl font-bold mb-2">Testimonials</h2>
          <p className="text-gray-600 mb-8">See what our users said about us.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="A great tool for me to manage my day to day tasks."
              name="Sejal"
              role="Software Engineer"
              avatar="https://placehold.co/32x32"
            />
            <TestimonialCard
              quote="A must have tool for startups to streamline the work flow across teams."
              name="Arpit"
              role="Founder"
              avatar="https://placehold.co/32x32"
            />
            <TestimonialCard
              quote="A great tool to manage my team with a clean ui and rich in features."
              name="Archit"
              role="Manager"
              avatar="https://placehold.co/32x32"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactElement<IconType>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card>
    <CardContent className="p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role, avatar }) => (
  <Card>
    <CardContent className="p-6">
      <p className="text-gray-600 mb-4">"{quote}"</p>
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-8 h-8 rounded-full mr-2" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default HomePage;