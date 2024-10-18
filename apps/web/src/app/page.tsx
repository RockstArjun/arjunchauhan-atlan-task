import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Package, Clock, Globe, BarChart } from "lucide-react";
import Link from "next/link";

export default function LogisticsLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-[#1A3A3A] text-white">
        <Link href="/" className="flex items-center justify-center">
          <Truck className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">LogiTech</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-[#4ECDC4]" href="/">
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#4ECDC4]"
            href="/about"
          >
            About Us
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#4ECDC4]"
            href="/services"
          >
            Services
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#4ECDC4]"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#1A3A3A] text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  On-Demand Logistics Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-[#4ECDC4] md:text-xl">
                  Streamline your goods transportation with our efficient and
                  reliable on-demand logistics solution.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-[#4ECDC4] text-[#1A3A3A] hover:bg-[#45B7AA]">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="text-[#4ECDC4] border-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-[#1A3A3A]"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F0F4F8]">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-[#1A3A3A]">
              Key Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Package,
                  title: "Real-time Tracking",
                  description:
                    "Track your shipments in real-time with our advanced GPS technology.",
                },
                {
                  icon: Clock,
                  title: "On-Demand Booking",
                  description:
                    "Book transportation services instantly, whenever you need them.",
                },
                {
                  icon: Globe,
                  title: "Nationwide Coverage",
                  description:
                    "Enjoy seamless logistics services across the entire country.",
                },
                {
                  icon: BarChart,
                  title: "Analytics Dashboard",
                  description:
                    "Gain insights into your logistics operations with our powerful analytics tools.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white shadow-lg"
                >
                  <feature.icon className="h-12 w-12 mb-4 text-[#4ECDC4]" />
                  <h3 className="text-xl font-bold text-[#1A3A3A] text-center">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#45565E] text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#4ECDC4]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1A3A3A]">
                  Ready to Revolutionize Your Logistics?
                </h2>
                <p className="mx-auto max-w-[600px] text-[#1A3A3A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses that have streamlined their
                  transportation processes with our platform.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    className="flex-1 bg-white text-[#1A3A3A]"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-[#1A3A3A] text-white hover:bg-[#2C5454]"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-[#1A3A3A]">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-[#1A3A3A] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm">© 2024 LogiTech. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm hover:text-[#4ECDC4]" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:text-[#4ECDC4]" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
