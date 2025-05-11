"use client"

import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black opacity-80" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col justify-center space-y-8 lg:w-1/2" variants={itemVariants}>
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center rounded-full border border-gray-800 bg-gray-950/50 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="relative mr-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Blockchain-powered uptime monitoring
              </motion.div>

              <motion.h1
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-white"
                variants={itemVariants}
              >
                Stay Online.
                <br />
                Stay Ahead.
              </motion.h1>

              <motion.p
                className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                variants={itemVariants}
              >
                Monitor your critical infrastructure with blockchain-verified uptime tracking. Get instant alerts,
                detailed analytics, and unmatched reliability for developers and teams.
              </motion.p>
            </div>

            <motion.div className="flex flex-col gap-4 sm:flex-row sm:gap-3" variants={itemVariants}>
              <Link href="/dashboard" passHref legacyBehavior>
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                >
                  <span>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </span>
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-blue-600/60 text-blue-400 hover:bg-blue-950/30 hover:text-blue-300 hover:border-blue-500 transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button> */}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full lg:w-1/2"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative mx-auto w-full max-w-[600px] overflow-hidden rounded-xl border border-gray-800 bg-gray-950/50 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10" />

              {/* Dashboard mockup */}
              <div className="p-4">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    <div className="text-sm font-medium text-gray-300">isAlive Dashboard</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-700"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-700"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-700"></div>
                  </div>
                </div>

                {/* Status overview */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Uptime", value: "99.998%", color: "bg-emerald-500" },
                    { label: "Response", value: "124ms", color: "bg-blue-500" },
                    { label: "Checks", value: "5,234", color: "bg-indigo-500" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                      <div className="text-xs text-gray-400">{stat.label}</div>
                      <div className="flex items-center">
                        <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${stat.color}`}></div>
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="mb-4 rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-medium text-gray-300">Performance Metrics</div>
                    <div className="flex space-x-2">
                      <div className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">24h</div>
                      <div className="rounded-full bg-blue-900/50 px-2 py-0.5 text-xs text-blue-400">7d</div>
                      <div className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">30d</div>
                    </div>
                  </div>
                  <div className="h-24 w-full">
                    <svg viewBox="0 0 300 100" className="h-full w-full">
                      <defs>
                        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,50 C20,40 40,30 60,35 C80,40 100,60 120,55 C140,50 160,30 180,25 C200,20 220,30 240,35 C260,40 280,45 300,40"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                      />
                      <path
                        d="M0,50 C20,40 40,30 60,35 C80,40 100,60 120,55 C140,50 160,30 180,25 C200,20 220,30 240,35 C260,40 280,45 300,40 L300,100 L0,100 Z"
                        fill="url(#chart-gradient)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Services list */}
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                  <div className="mb-2 text-xs font-medium text-gray-300">Monitored Services</div>
                  <div className="space-y-2">
                    {[
                      { name: "API Gateway", status: "Operational", color: "bg-emerald-500" },
                      { name: "Authentication Service", status: "Operational", color: "bg-emerald-500" },
                      { name: "Database Cluster", status: "Operational", color: "bg-emerald-500" },
                      { name: "Storage Service", status: "Degraded", color: "bg-yellow-500" },
                    ].map((service, i) => (
                      <div key={i} className="flex items-center justify-between rounded-md bg-gray-800/50 px-3 py-2">
                        <div className="text-xs text-gray-300">{service.name}</div>
                        <div className="flex items-center">
                          <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${service.color}`}></div>
                          <div className="text-xs text-gray-400">{service.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <motion.div
              className="absolute -right-4 -top-4 rounded-lg border border-gray-800 bg-gray-950/70 p-3 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <div className="text-xs text-gray-400">All Systems Operational</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-4 bottom-12 rounded-lg border border-gray-800 bg-gray-950/70 p-3 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="text-xs text-gray-400">Current Uptime</div>
              <div className="text-xl font-bold text-emerald-400">99.998%</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
