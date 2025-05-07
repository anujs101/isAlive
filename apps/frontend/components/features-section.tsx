"use client"

import { motion } from "framer-motion"
import { Activity, Clock, Globe, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track your services with millisecond precision and get instant notifications when issues arise.",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Clock,
      title: "Historical Uptime Analytics",
      description: "Access immutable blockchain-verified historical data to analyze performance trends over time.",
      color: "from-emerald-600 to-emerald-400",
    },
    {
      icon: Globe,
      title: "Multi-Region Testing",
      description: "Test your applications from multiple geographic locations to ensure global availability.",
      color: "from-indigo-600 to-indigo-400",
    },
    {
      icon: Shield,
      title: "Tamper-Proof Reporting",
      description: "Leverage blockchain technology for verifiable, tamper-proof uptime reporting and SLA verification.",
      color: "from-violet-600 to-violet-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="relative py-20 md:py-32 bg-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111_0%,#000_100%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-gray-800 bg-gray-950/50 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm">
            Powerful Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything you need to stay online
          </h2>
          <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            isAlive combines cutting-edge monitoring with blockchain verification for unmatched reliability and
            transparency.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-950/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/60"
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-radial from-gray-800/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color}`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
