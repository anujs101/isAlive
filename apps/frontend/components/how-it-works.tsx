"use client"

import { motion } from "framer-motion"
import { Check, Code, LineChart, Zap } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Code,
      title: "1. No Setup Needed",
      description: "Visit our dashboard, add your site, and we’ll handle the rest.",
    },
    {
      icon: Zap,
      title: "2. Configure Monitors",
      description: "Set up monitoring for your endpoints, APIs, or services with customizable check intervals.",
    },
    {
      icon: LineChart,
      title: "3. Real-time Insights",
      description: "Access your dashboard to view real-time performance metrics and historical data.",
    },
    {
      icon: Check,
      title: "4. Automated Alerts",
      description: "Receive instant notifications through multiple channels when issues are detected.",
    },
  ]

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative py-20 md:py-32 bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-gray-800 bg-gray-950/50 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm">
            Simple Setup
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Get up and running in minutes with our straightforward setup process.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connecting line */}
          <div className="absolute left-[50%] top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-600/70 via-blue-600/30 to-transparent md:left-[15%]" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative grid items-start gap-8 md:grid-cols-5"
                variants={itemVariants}
              >
                <motion.div
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-black text-blue-500 shadow-lg md:col-span-1"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.3 }}
                >
                  <step.icon className="h-6 w-6" />
                  <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-md" />
                </motion.div>

                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
