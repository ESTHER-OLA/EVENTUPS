"use client";

// import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-chart-4 to-chart-5/30 text-white">
      <div className="absolute inset-0 z-[-10] bg-red-700">
        <Image
          src="/tech-background.jpg"
          alt="Tech Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Animated Background Text */}
      <motion.h2
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-0 left-0 text-[15vw] font-extrabold opacity-50 whitespace-nowrap pointer-events-none select-none"
        style={{ transform: "translateY(-50%)" }}
      >
        TECH CONNECT • TECH CONNECT • TECH CONNECT •
      </motion.h2>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Foreground Content */}
      <div className="container absolute bottom-0 z-10 text-center px-4 bg-chart-5/30 rounded-lg shadow-lg w-160 py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-xl md:text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="block pt-5">Discover Amazing</span>
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Tech Connect
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl w-130 mx-auto text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Connect with the tech community at conferences, 
            workshops, hackathons, and webinars around the world.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="#events">
              <Button
                size="lg"
                className="bg-gradient-to-r from-chart-5 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                Find Events
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-orange-600 hover:bg-white/10"
              >
                Create Account
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
