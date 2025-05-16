"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  ArrowRight,
  Star,
  Users,
  Calendar,
  Mail,
  Lock,
  Shield,
  Flame,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ImageOptimization from "./image-optimization";
import { motion, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// Import components
import { BreathingBox } from "@/components/breathing-box";
import { ReflectionModal } from "@/components/reflection-modal";
import { PowerWordDetector } from "@/components/power-word-detector";
import { FlameCursor } from "@/components/flame-cursor";
import { ProgressTracker } from "@/components/progress-tracker";
import { DailyQuiz } from "@/components/daily-quiz";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { MasculineSoundboard } from "@/components/masculine-soundboard";
import { EnergyGrowthChart } from "@/components/energy-growth-chart";
import { VideoBackground } from "@/components/video-background";
import { JoinCounter } from "@/components/join-counter";
import { MasculineQuiz } from "@/components/masculine-quiz";
import { useTheme } from "@/components/theme-context";

// Custom hook for scroll animations
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

// Custom hook for progress bar
function useProgressBar(sectionRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate how far we've scrolled into the section
      let scrollProgress = 0;
      if (rect.top <= 0) {
        // We've scrolled past the top
        scrollProgress = Math.min(
          Math.abs(rect.top) / (sectionHeight - windowHeight),
          1
        );
      }

      setProgress(scrollProgress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef]);

  return progress;
}

// CSS for pulsating text
const pulsateStyle = {
  animation: "pulsate 5s infinite",
  textShadow:
    "0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)",
};

export default function Home() {
  const rotatingPhrases = [
    "MASCULINE ENERGY",
    "UNBREAKABLE FOCUS",
    "TOTAL CONTROL",
    "RAW POWER",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex(
        (prevIndex) => (prevIndex + 1) % rotatingPhrases.length
      );
    }, 2500); // מחליף כל 2.5 שניות
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const scrollY = useScrollAnimation();
  const protocolRef = useRef(null);
  const progressBarValue = useProgressBar(protocolRef);
  const { fireMode } = useTheme();

  // Refs for scroll animations
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 });

  const testimonialRef = useRef(null);
  const isTestimonialInView = useInView(testimonialRef, {
    once: true,
    amount: 0.3,
  });

  const articlesRef = useRef(null);
  const isArticlesInView = useInView(articlesRef, { once: true, amount: 0.3 });

  const brotherhoodRef = useRef(null);
  const isBrotherhoodInView = useInView(brotherhoodRef, {
    once: true,
    amount: 0.3,
  });

  // Add pulsate animation style
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes pulsate {
        0% { text-shadow: 0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3); }
        50% { text-shadow: 0 0 15px rgba(239, 68, 68, 0.9), 0 0 25px rgba(239, 68, 68, 0.7), 0 0 35px rgba(239, 68, 68, 0.5); }
        100% { text-shadow: 0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3); }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your server
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset form submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <ImageOptimization />
      <ProgressTracker />
      <ReflectionModal />
      <PowerWordDetector />
      <FlameCursor />

      {/* Navigation */}
      <header className="sticky top-1 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame
              className={`h-6 w-6 ${
                fireMode ? "text-orange-500" : "text-red-700"
              }`}
            />
            <span
              className={`text-xl font-bold tracking-tight ${
                fireMode ? "fire-text" : ""
              }`}
            >
              MASCULINE ENERGY
              <h2 className="text-2xl font-bold glow-text">
                🔥 Limited-Time Offer!
              </h2>
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#about"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              About
            </a>
            <a
              href="#protocol"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Protocol
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#articles"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Articles
            </a>
            <a
              href="#brotherhood"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Brotherhood
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Contact
            </a>
          </nav>
          <Button className="button-glow">Buy Now – $99</Button>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-zinc-800"
              onClick={() => {
                const mobileMenu = document.getElementById("mobile-menu");
                if (mobileMenu) {
                  mobileMenu.classList.toggle("hidden");
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <div
        id="mobile-menu"
        className="hidden md:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur z-40 border-b border-zinc-800"
      >
        <div className="container py-4">
          <nav className="flex flex-col space-y-4">
            <a
              href="#hero"
              className="text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              About
            </a>
            <a
              href="#protocol"
              className="text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Protocol
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Testimonials
            </a>
            <a
              href="#articles"
              className="text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Articles
            </a>
            <a
              href="#brotherhood"
              className="text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Brotherhood
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      <main className="flex-1">
        <div className="bg-red-700 text-white text-sm text-center py-2 animate-pulse">
          🚨 Only 3 spots left for this month! Join now.
        </div>

        {/* Hero Section with Video Background */}
        <section id="hero" className="relative overflow-hidden">
          <VideoBackground />
          <div className="container relative z-10 py-24 md:py-32 lg:py-40">
            <div className="max-w-3xl space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Are you really{" "}
                <span
                  className={`text-red-600 ${fireMode ? "fire-text" : ""}`}
                  style={!fireMode ? pulsateStyle : {}}
                >
                  <Typewriter
                    words={[
                      "in control?",
                      "in command?",
                      "awake?",
                      "disciplined?",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl font-medium text-zinc-300"
              >
                Discover the 30-Day Protocol to Master Your Sexual Energy,
                Overcome Premature Ejaculation, and Awaken Your True Masculine{" "}
                <span className="font-bold">POWER</span>.
              </motion.p>

              {/* Join Counter */}
              <JoinCounter />

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                action="https://www.paypal.com/cgi-bin/webscr"
                method="post"
                target="_blank"
                className="mt-6"
              >
                <input type="hidden" name="cmd" value="_xclick" />
                <input
                  type="hidden"
                  name="business"
                  value="youremail@example.com"
                />
                <input
                  type="hidden"
                  name="item_name"
                  value="Masculine Energy Academy – 30-Day Protocol"
                />
                <input type="hidden" name="amount" value="99.00" />

                <input type="hidden" name="currency_code" value="USD" />
                <button
                  type="submit"
                  className={`inline-flex items-center px-6 py-3 text-base font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md transition-all duration-300 ${
                    fireMode
                      ? "fire-button"
                      : "bg-red-700 hover:bg-red-800 hover:shadow-red-600/50 hover:ring hover:ring-red-500 hover:ring-offset-2"
                  }`}
                >
                  Buy Now – $99
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* About the Program */}
        <section id="about" className="bg-zinc-900 py-20" ref={aboutRef}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5 }}
                  className={`text-3xl font-bold tracking-tight mb-6 ${
                    fireMode ? "fire-text" : ""
                  }`}
                >
                  About the <span className="text-red-600">Program</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-zinc-300 mb-6"
                >
                  Masculine Energy Academy is built on ancient wisdom that has
                  been forgotten in our modern world. We believe that a man's
                  sexual energy is his most powerful creative force—when
                  properly harnessed and redirected.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-zinc-300 mb-6"
                >
                  Through disciplined breathwork, pelvic floor training, and
                  conscious energy management, men can transform frustration
                  into focus, anxiety into{" "}
                  <span className="font-bold">POWER</span>, and weakness into
                  strength.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-zinc-300"
                >
                  Our 30-day protocol combines Eastern practices of energy
                  cultivation with modern neuroscience to help you break free
                  from the cycle of energy depletion and reclaim your masculine
                  essence.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isAboutInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative h-[400px] rounded-lg overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
                  alt="Calm man meditating at sunrise on a cliff, peaceful and focused, energy mastery vibe"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`mt-16 p-8 rounded-lg border ${
                fireMode ? "fire-card" : "bg-zinc-800 border-zinc-700"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">What's Included:</h3>
              <ul className="grid md:grid-cols-2 gap-6">
                <li className="flex items-start">
                  <div
                    className={`mr-4 mt-1 p-1 rounded ${
                      fireMode ? "bg-red-700/30" : "bg-red-700/20"
                    }`}
                  >
                    <Flame
                      className={`h-5 w-5 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="font-bold block">
                      Breathwork & body awareness
                    </span>
                    <span className="text-zinc-400 text-sm">
                      Ancient breathing techniques that instantly shift your
                      energy state and build control over your arousal response.
                      These practices alone have helped thousands of men
                      overcome premature ejaculation.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div
                    className={`mr-4 mt-1 p-1 rounded ${
                      fireMode ? "bg-red-700/30" : "bg-red-700/20"
                    }`}
                  >
                    <Shield
                      className={`h-5 w-5 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="font-bold block">
                      Semen retention training
                    </span>
                    <span className="text-zinc-400 text-sm">
                      Learn the practice that high-performers throughout history
                      have used to fuel their greatest achievements. Harness
                      your vital energy for greater purpose instead of wasting
                      it.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div
                    className={`mr-4 mt-1 p-1 rounded ${
                      fireMode ? "bg-red-700/30" : "bg-red-700/20"
                    }`}
                  >
                    <Lock
                      className={`h-5 w-5 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="font-bold block">
                      Pelvic floor strength exercises
                    </span>
                    <span className="text-zinc-400 text-sm">
                      Develop the physical foundation of sexual control through
                      targeted exercises that strengthen the muscles responsible
                      for ejaculatory control and sexual stamina.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div
                    className={`mr-4 mt-1 p-1 rounded ${
                      fireMode ? "bg-red-700/30" : "bg-red-700/20"
                    }`}
                  >
                    <ArrowRight
                      className={`h-5 w-5 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="font-bold block">
                      Energy redirection into confidence and purpose
                    </span>
                    <span className="text-zinc-400 text-sm">
                      Specific techniques to transmute sexual energy into
                      confidence, focus, and drive. This is where the real
                      transformation happens—turning frustration into fuel for
                      your life's purpose.
                    </span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* 30-Day Protocol Overview */}
        <section id="protocol" className="bg-black py-20" ref={protocolRef}>
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className={`text-3xl font-bold tracking-tight mb-6 text-center ${
                fireMode ? "fire-text" : ""
              }`}
            >
              The 30-Day <span className="text-red-600">Protocol</span>
            </motion.h2>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-800 rounded h-2 mb-12 overflow-hidden">
              <div
                className={`h-2 transition-all duration-300 ease-out ${
                  fireMode
                    ? "bg-gradient-to-r from-red-600 to-orange-500"
                    : "bg-red-600"
                }`}
                style={{ width: `${progressBarValue}%` }}
              ></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`p-6 rounded-lg border transition-colors group ${
                  fireMode
                    ? "fire-card hover:border-orange-500"
                    : "bg-zinc-900 border-zinc-800 hover:border-red-700"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    fireMode
                      ? "bg-red-700/30 group-hover:bg-red-700/40"
                      : "bg-red-700/20 group-hover:bg-red-700/30"
                  } transition-colors`}
                >
                  <span
                    className={`font-bold ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  >
                    01
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Week 1: Awareness & Reset
                </h3>
                <div className="relative h-40 mb-4 rounded overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1508672019048-805c876b67e2"
                    alt="Focused man sitting cross-legged meditating indoors with warm lighting, peaceful vibe"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-zinc-400">
                  The journey begins with awareness. You'll identify the habits
                  and patterns that drain your masculine energy and learn the
                  foundational breathwork techniques that will become your daily
                  practice. This week focuses on:
                </p>
                <ul className="mt-3 space-y-1 text-zinc-400">
                  <li>• Daily energy awareness meditation</li>
                  <li>• Breaking the cycle of energy depletion</li>
                  <li>• Introduction to pelvic floor control</li>
                  <li>• Setting your masculine intention</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`p-6 rounded-lg border transition-colors group ${
                  fireMode
                    ? "fire-card hover:border-orange-500"
                    : "bg-zinc-900 border-zinc-800 hover:border-red-700"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    fireMode
                      ? "bg-red-700/30 group-hover:bg-red-700/40"
                      : "bg-red-700/20 group-hover:bg-red-700/30"
                  } transition-colors`}
                >
                  <span
                    className={`font-bold ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  >
                    02
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Week 2: Control & Practice
                </h3>
                <div className="relative h-40 mb-4 rounded overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1920&q=80"
                    alt="Man practicing breathing control"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-zinc-400">
                  Now that you've established awareness, you'll develop the
                  physical and mental control necessary for mastery. This week's
                  practices include:
                </p>
                <ul className="mt-3 space-y-1 text-zinc-400">
                  <li>• Advanced pelvic floor strengthening</li>
                  <li>• Breathwork for immediate arousal control</li>
                  <li>• Mind-body connection exercises</li>
                  <li>• Retention techniques and practice</li>
                </ul>

                {/* Breathing Box Animation */}
                <BreathingBox />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`p-6 rounded-lg border transition-colors group ${
                  fireMode
                    ? "fire-card hover:border-orange-500"
                    : "bg-zinc-900 border-zinc-800 hover:border-red-700"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    fireMode
                      ? "bg-red-700/30 group-hover:bg-red-700/40"
                      : "bg-red-700/20 group-hover:bg-red-700/30"
                  } transition-colors`}
                >
                  <span
                    className={`font-bold ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  >
                    03
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Week 3: Energy Redirection
                </h3>
                <div className="relative h-40 mb-4 rounded overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
                    alt="Man in a dark room working on laptop with intense focus, energetic glow"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-zinc-400">
                  This is where transformation accelerates. You'll learn to
                  redirect your sexual energy into productive channels that fuel
                  your purpose and passion:
                </p>
                <ul className="mt-3 space-y-1 text-zinc-400">
                  <li>• Energy circulation techniques</li>
                  <li>• Transmutation practices for creativity</li>
                  <li>• Focus and productivity enhancement</li>
                  <li>• Building magnetic presence</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`p-6 rounded-lg border transition-colors group ${
                  fireMode
                    ? "fire-card hover:border-orange-500"
                    : "bg-zinc-900 border-zinc-800 hover:border-red-700"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    fireMode
                      ? "bg-red-700/30 group-hover:bg-red-700/40"
                      : "bg-red-700/20 group-hover:bg-red-700/30"
                  } transition-colors`}
                >
                  <span
                    className={`font-bold ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  >
                    04
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Week 4: Masculine Mastery
                </h3>
                <div className="relative h-40 mb-4 rounded overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
                    alt="Confident man standing on mountain top with open arms, sunrise, victorious energy"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-zinc-400">
                  The final week integrates everything you've learned into a
                  sustainable lifestyle of masculine{" "}
                  <span className="font-bold">POWER</span> and presence:
                </p>
                <ul className="mt-3 space-y-1 text-zinc-400">
                  <li>• Embodying masculine presence</li>
                  <li>• Integrating practices into daily life</li>
                  <li>• Maintaining energy during intimacy</li>
                  <li>• Creating your ongoing masculine practice</li>
                </ul>
              </motion.div>
            </div>

            {/* Masculine Archetype Quiz */}
            <MasculineQuiz />

            {/* Daily Energy Quiz */}
            <DailyQuiz />

            {/* Energy Growth Chart */}
            <EnergyGrowthChart />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`mt-12 p-6 rounded-lg max-w-2xl mx-auto text-center ${
                fireMode ? "fire-card" : "bg-zinc-900/50 border border-zinc-800"
              }`}
            >
              <p className="text-zinc-300">
                <span
                  className={`font-semibold ${
                    fireMode ? "text-orange-500" : "text-red-600"
                  }`}
                >
                  Note:
                </span>{" "}
                Course sent via email upon purchase as a full private PDF guide.
                Begin your journey immediately with no waiting.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="bg-zinc-900 py-20"
          ref={testimonialRef}
        >
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isTestimonialInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
              className={`text-3xl font-bold tracking-tight mb-12 text-center ${
                fireMode ? "fire-text" : ""
              }`}
            >
              Real <span className="text-red-600">Results</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isTestimonialInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 ${
                  fireMode
                    ? "fire-card hover:border-orange-500"
                    : "bg-zinc-800 border-zinc-700 hover:border-red-600"
                }`}
              >
                <div className="flex text-yellow-500 mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-zinc-300 mb-4">
                  "After struggling with premature ejaculation for years, I was
                  skeptical that a program could help. By week 2, I noticed a
                  massive difference in my control. The breathwork techniques
                  alone were worth the investment. Now I last as long as I want,
                  and the confidence has spilled over into every area of my
                  life."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                      alt="Daniel"
                      width={48}
                      height={48}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Daniel</p>
                    <p className="text-sm text-zinc-500">Age 28</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isTestimonialInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 ${
                  fireMode
                    ? "fire-card hover:border-orange-500"
                    : "bg-zinc-800 border-zinc-700 hover:border-red-600"
                }`}
              >
                <div className="flex text-yellow-500 mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-zinc-300 mb-4">
                  "The protocol rewired my brain. It's not just about sex – it's
                  about <span className="font-bold">POWER</span>. I've been
                  practicing semen retention for 45 days now, and my energy,
                  focus, and drive are through the roof. My business is
                  thriving, my workouts are more intense, and women respond to
                  me differently. This is the real deal."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                      alt="Amir"
                      width={48}
                      height={48}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Amir</p>
                    <p className="text-sm text-zinc-500">Age 34</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isTestimonialInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 ${
                  fireMode
                    ? "fire-card hover:border-orange-500"
                    : "bg-zinc-800 border-zinc-700 hover:border-red-600"
                }`}
              >
                <div className="flex text-yellow-500 mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5" />
                </div>
                <p className="text-zinc-300 mb-4">
                  "She noticed the change before I did. Three weeks into the
                  protocol, my girlfriend commented on how much more present and
                  confident I seemed. The bedroom performance has improved
                  dramatically, but what surprised me most was how this practice
                  affected my overall energy and motivation. I'm more focused at
                  work and have started pursuing goals I'd put off for years."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                      alt="Jack"
                      width={48}
                      height={48}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Jack</p>
                    <p className="text-sm text-zinc-500">Age 25</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Animated Testimonials Carousel */}
            <TestimonialCarousel />

            {/* Masculine Soundboard */}
            <MasculineSoundboard />
          </div>
        </section>

        {/* Weekly Articles Section */}
        <section id="articles" className="bg-black py-20" ref={articlesRef}>
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isArticlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
              className={`text-3xl font-bold tracking-tight mb-12 text-center ${
                fireMode ? "fire-text" : ""
              }`}
            >
              Weekly <span className="text-red-600">Articles</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isArticlesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`rounded-lg overflow-hidden group ${
                  fireMode ? "fire-card" : "bg-zinc-900"
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
                    alt="Man doing breathing meditation with energy particles around his body, symbolic of control"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      fireMode ? "fire-text" : ""
                    }`}
                  >
                    Why Semen Retention is the Key to Your Masculine{" "}
                    <span className="font-bold">POWER</span>
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Throughout history, warriors, artists, and leaders have
                    practiced semen retention to fuel their greatest
                    achievements. From ancient Taoist masters to modern
                    athletes, the practice of conserving sexual energy has been
                    a closely guarded secret of high performers.
                  </p>
                  <p className="text-zinc-400 mb-4">
                    This article explores the science behind semen retention,
                    including the neurochemical changes that occur when you
                    retain your vital essence. We'll examine how testosterone
                    levels, dopamine sensitivity, and focus are all affected by
                    this practice.
                  </p>
                  <Link
                    href="#"
                    className={`inline-flex items-center font-medium hover:text-red-500 transition-colors ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isArticlesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`rounded-lg overflow-hidden group ${
                  fireMode ? "fire-card" : "bg-zinc-900"
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1618085220188-b4f210d22703"
                    alt="Man with serious expression looking in the mirror, personal transformation theme"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      fireMode ? "fire-text" : ""
                    }`}
                  >
                    From Frustration to Focus: The Sexual Shift That Changed My
                    Life
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    "Six months ago, I was trapped in a cycle of sexual
                    frustration, low energy, and diminished confidence. My
                    relationships suffered, my work performance declined, and I
                    felt like a shadow of the man I wanted to be. Then I
                    discovered the ancient practice of sexual energy
                    transmutation."
                  </p>
                  <p className="text-zinc-400 mb-4">
                    This personal account details one man's journey from sexual
                    frustration to mastery, and how redirecting his sexual
                    energy transformed every aspect of his existence—from his
                    career to his relationships to his sense of purpose.
                  </p>
                  <Link
                    href="#"
                    className={`inline-flex items-center font-medium hover:text-red-500 transition-colors ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isArticlesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`rounded-lg overflow-hidden group ${
                  fireMode ? "fire-card" : "bg-zinc-900"
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1519058082700-08a0b56da9b4"
                    alt="Man walking confidently in urban setting wearing dark clothes, masculine energy"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      fireMode ? "fire-text" : ""
                    }`}
                  >
                    Reclaiming Your Edge in the Modern World
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    The modern world is designed to drain your masculine energy.
                    From constant digital stimulation to environmental factors
                    that lower testosterone, today's man faces unprecedented
                    challenges to his vitality and focus.
                  </p>
                  <p className="text-zinc-400 mb-4">
                    This article provides practical strategies for maintaining
                    your masculine edge in a society that seems designed to
                    blunt it. Learn how to create energetic boundaries, optimize
                    your environment, and develop daily practices that protect
                    and enhance your masculine{" "}
                    <span className="font-bold">POWER</span>.
                  </p>
                  <Link
                    href="#"
                    className={`inline-flex items-center font-medium hover:text-red-500 transition-colors ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Anonymous Brotherhood Section */}
        <section
          id="brotherhood"
          className="bg-zinc-900 py-20"
          ref={brotherhoodRef}
        >
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isBrotherhoodInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5 }}
                  className={`text-3xl font-bold tracking-tight mb-6 ${
                    fireMode ? "fire-text" : ""
                  }`}
                >
                  The <span className="text-red-600">Brotherhood</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isBrotherhoodInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-zinc-300 mb-6"
                >
                  Join our anonymous brotherhood – a private space to share
                  struggles, wins, and daily reflections. No names. No ego. Just
                  men growing together.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isBrotherhoodInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-zinc-300 mb-6"
                >
                  The journey of masculine energy mastery can be challenging.
                  Having a community of like-minded men to share experiences
                  with makes all the difference. Our private forum allows you to
                  connect anonymously with others on the same path.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isBrotherhoodInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center space-x-4 mb-6"
                >
                  <div
                    className={`p-2 rounded ${
                      fireMode ? "bg-red-700/30" : "bg-red-700/20"
                    }`}
                  >
                    <Users
                      className={`h-6 w-6 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                  </div>
                  <div className="text-zinc-300">
                    <span className="font-bold block">500+ Active Members</span>
                    <span className="text-sm text-zinc-400">
                      Men from 32 countries
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isBrotherhoodInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    className={
                      fireMode
                        ? "fire-button"
                        : "bg-red-700 hover:bg-red-800 text-white shadow-md hover:shadow-red-600 transition-all duration-300 hover:ring hover:ring-red-500 hover:ring-offset-2"
                    }
                  >
                    Join the Brotherhood
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={
                    isBrotherhoodInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.95 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6 relative h-[200px] rounded-lg overflow-hidden"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18"
                    alt="Group of men in a circle supporting each other outdoors, brotherhood and strength theme"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isBrotherhoodInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`rounded-lg p-6 border ${
                  fireMode ? "fire-card" : "bg-zinc-800 border-zinc-700"
                }`}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Lock
                    className={`h-5 w-5 mr-2 ${
                      fireMode ? "text-orange-500" : "text-red-600"
                    }`}
                  />
                  Anonymous Posts
                </h3>
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg transition-colors ${
                      fireMode
                        ? "bg-zinc-900/70 hover:bg-zinc-900/90"
                        : "bg-zinc-900 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Warrior_547</span>
                      <span className="text-xs text-zinc-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Day 14
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      "I felt like giving up today. The urges were intense, and
                      I almost broke my streak. Used the 4-7-8 breathing
                      technique from Week 2 and it pulled me through. Anyone
                      else feel stuck in the middle of their journey? How do you
                      push through?"
                    </p>
                    <div className="mt-2 text-xs text-zinc-500">8 replies</div>
                  </div>
                  <div
                    className={`p-4 rounded-lg transition-colors ${
                      fireMode
                        ? "bg-zinc-900/70 hover:bg-zinc-900/90"
                        : "bg-zinc-900 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Phoenix_Rising</span>
                      <span className="text-xs text-zinc-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Day 7
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      "My breathing routine saved me today. Had a stressful
                      meeting at work and could feel my energy draining. Stepped
                      away for 5 minutes of breathwork and came back centered
                      and powerful. Already seeing benefits in unexpected areas
                      of life."
                    </p>
                    <div className="mt-2 text-xs text-zinc-500">12 replies</div>
                  </div>
                  <div
                    className={`p-4 rounded-lg transition-colors ${
                      fireMode
                        ? "bg-zinc-900/70 hover:bg-zinc-900/90"
                        : "bg-zinc-900 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Iron_Will</span>
                      <span className="text-xs text-zinc-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Day 21
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      "Week 3 energy redirection exercises are game-changing.
                      I've never felt this level of drive and focus before.
                      Channeled my energy into a project I've been putting off
                      for months and finished it in two days. This isn't just
                      about sex—it's about becoming the man you're meant to be."
                    </p>
                    <div className="mt-2 text-xs text-zinc-500">5 replies</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Purchase Section */}
        <section className="bg-black py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className={`text-3xl font-bold tracking-tight mb-6 ${
                  fireMode ? "fire-text" : ""
                }`}
              >
                Ready to <span className="text-red-600">Reclaim</span> Your{" "}
                <span className="font-bold">POWER</span>?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-zinc-300 mb-12 max-w-xl mx-auto"
              >
                Join thousands of men who have transformed their lives through
                the Masculine Energy Academy protocol.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`p-8 rounded-lg border mb-8 ${
                  fireMode
                    ? "fire-card border-red-600"
                    : "bg-gradient-to-b from-zinc-900 to-zinc-800 border-zinc-700"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    fireMode ? "fire-text" : ""
                  }`}
                >
                  Masculine Energy Academy
                </h3>
                <p className="text-zinc-400 mb-6">30-Day Protocol</p>
                <div
                  className={`text-4xl font-bold mb-6 ${
                    fireMode ? "fire-text" : ""
                  }`}
                >
                  $99
                </div>
                <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
                  <li className="flex items-center">
                    <ChevronRight
                      className={`h-5 w-5 mr-2 flex-shrink-0 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                    <span>Complete 30-day protocol PDF guide</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight
                      className={`h-5 w-5 mr-2 flex-shrink-0 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                    <span>Daily practices and exercises</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight
                      className={`h-5 w-5 mr-2 flex-shrink-0 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                    <span>Access to the Brotherhood community</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight
                      className={`h-5 w-5 mr-2 flex-shrink-0 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                    <span>Lifetime access to all updates</span>
                  </li>
                </ul>
                <form
                  action="https://www.paypal.com/cgi-bin/webscr"
                  method="post"
                  target="_blank"
                >
                  <input type="hidden" name="cmd" value="_xclick" />
                  <input
                    type="hidden"
                    name="business"
                    value="youremail@example.com"
                  />
                  <input
                    type="hidden"
                    name="item_name"
                    value="Masculine Energy Academy – 30-Day Protocol"
                  />
                  <input type="hidden" name="amount" value="100.00" />
                  <input type="hidden" name="currency_code" value="USD" />
                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md transition-all duration-300 ${
                      fireMode
                        ? "fire-button"
                        : "bg-red-700 hover:bg-red-800 hover:shadow-red-600/50 hover:ring hover:ring-red-500 hover:ring-offset-2"
                    }`}
                  >
                    Buy Now – $99
                  </button>
                </form>
                <p className="text-sm text-zinc-500 mt-4">
                  Course will be delivered via email immediately after purchase.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact/Support */}
        <section id="contact" className="bg-zinc-900 py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className={`text-3xl font-bold tracking-tight mb-12 text-center ${
                  fireMode ? "fire-text" : ""
                }`}
              >
                Contact <span className="text-red-600">Support</span>
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                  <p className="text-zinc-300 mb-6">
                    Have questions about the protocol or need support on your
                    journey? Our team is here to help.
                  </p>
                  <div className="flex items-center mb-4">
                    <Mail
                      className={`h-5 w-5 mr-3 ${
                        fireMode ? "text-orange-500" : "text-red-600"
                      }`}
                    />
                    <span>support@masculineenergy.com</span>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    We typically respond within 24 hours.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {formSubmitted ? (
                    <div className="bg-green-900/20 border border-green-700 p-6 rounded-lg text-center">
                      <h4 className="text-lg font-bold text-green-500 mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-zinc-300">
                        Thank you for reaching out. We'll get back to you within
                        24 hours.
                      </p>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          className={`border-zinc-700 focus:border-red-600 ${
                            fireMode ? "bg-zinc-900/70" : "bg-zinc-800"
                          }`}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className={`border-zinc-700 focus:border-red-600 ${
                            fireMode ? "bg-zinc-900/70" : "bg-zinc-800"
                          }`}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          name="message"
                          placeholder="Your Message"
                          className={`border-zinc-700 focus:border-red-600 min-h-[120px] ${
                            fireMode ? "bg-zinc-900/70" : "bg-zinc-800"
                          }`}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className={`w-full shadow-md transition-all duration-300 ${
                          fireMode
                            ? "fire-button"
                            : "bg-red-700 hover:bg-red-800 text-white hover:shadow-red-600/50 hover:ring hover:ring-red-500 hover:ring-offset-2"
                        }`}
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Flame
                className={`h-5 w-5 ${
                  fireMode ? "text-orange-500" : "text-red-700"
                }`}
              />
              <span className={`font-bold ${fireMode ? "fire-text" : ""}`}>
                MASCULINE ENERGY
              </span>
            </div>
            <nav className="flex flex-wrap gap-4 md:gap-6 justify-center mb-4 md:mb-0">
              <a
                href="#"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#articles"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Articles
              </a>
              <a
                href="#brotherhood"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Brotherhood
              </a>
              <a
                href="#protocol"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Protocol
              </a>
              <a
                href="#contact"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Masculine Energy Academy
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
  <a
    href="#hero"
    className="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 md:hidden"
  >
    ↑
  </a>;
}
<a
  href="https://wa.me/972504448105"
  className="fixed bottom-6 right-4 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg md:hidden"
  target="_blank"
>
  Chat with us 💬
</a>;
<div className="text-center text-red-500 font-bold text-xl">
  Offer ends in: <span id="countdown"></span>
</div>;
useEffect(() => {
  const countdown = document.getElementById("countdown");
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 3); // 3 שעות קדימה

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (countdown) {
      countdown.innerText = `${hours}h ${minutes}m ${seconds}s`;
    }
    if (distance < 0) clearInterval(interval);
  }, 1000);
}, []);
