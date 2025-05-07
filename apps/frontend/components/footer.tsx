"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "API", href: "#" },
        { name: "Documentation", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Community", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Status", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Security", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Github, href: "#" },
    { icon: Linkedin, href: "#" },
  ]

  return (
    <footer className="relative border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-emerald-500">
                  <div className="absolute inset-1 rounded-full bg-black" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500" />
                </div>
                <span className="text-xl font-bold">isAlive</span>
              </Link>

              <p className="max-w-xs text-sm text-gray-400">
                Blockchain-powered uptime monitoring for developers and teams who need reliability and transparency.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 bg-gray-950 text-gray-400 transition-colors hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">Social Link</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {footerLinks.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <h4 className="text-sm font-semibold">{group.title}</h4>
                <ul className="space-y-2">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-gray-800 pt-8 text-sm text-gray-400 md:flex-row md:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>© {new Date().getFullYear()} isAlive. All rights reserved.</p>
          <p>Blockchain-powered uptime monitoring you can trust.</p>
        </motion.div>
      </div>
    </footer>
  )
}
