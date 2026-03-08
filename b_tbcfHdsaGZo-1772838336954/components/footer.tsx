"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { KeyboardButton } from "./keyboard-button"

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "mailto:hello@ria.dev", icon: Mail, label: "Email" },
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/lab-notes", label: "Lab Notes" },
  { href: "/about", label: "Life" },
  { href: "/resume", label: "Resume" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          className="grid gap-12 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              {/* Peanut icon - small and subtle */}
              <svg
                width="16"
                height="22"
                viewBox="0 0 50 80"
                className="text-primary/60"
              >
                <path
                  d="M45 20 C45 8 35 2 25 2 C15 2 8 10 8 22 C8 34 12 38 12 40 C12 42 8 46 8 58 C8 70 15 78 25 78 C35 78 45 72 45 60 C45 48 40 44 40 40 C40 36 45 32 45 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <span className="font-heading text-lg font-bold text-foreground">
                Ria
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Penn CompE + Finance. Building at the intersection of hardware, AI, and financial systems.
            </p>
            
            {/* Technical annotation */}
            <div className="mt-6 font-mono text-[10px] text-muted-foreground/30">
              v2.4.0 // last updated 2026
            </div>
          </div>

          {/* Navigation - keyboard buttons */}
          <nav className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <KeyboardButton
                key={link.href}
                href={link.href}
                variant="ghost"
                size="sm"
              >
                {link.label}
              </KeyboardButton>
            ))}
          </nav>

          {/* Social + Contact */}
          <div className="flex flex-col items-start gap-6 md:items-end">
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-card/50 text-muted-foreground shadow-[0_2px_0_0] shadow-border/30 transition-all hover:translate-y-[1px] hover:border-primary/30 hover:text-primary hover:shadow-[0_1px_0_0]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            
            <a
              href="mailto:hello@ria.dev"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              hello@ria.dev
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-mono text-[10px] text-muted-foreground/50">
            © 2026 Ria. All systems operational.
          </p>
          
          {/* Tiny peanut easter egg */}
          <div className="group flex items-center gap-2 font-mono text-[10px] text-muted-foreground/30 transition-colors hover:text-muted-foreground/50">
            <span>crafted with</span>
            <svg
              width="10"
              height="14"
              viewBox="0 0 50 80"
              className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            >
              <path
                d="M45 20 C45 8 35 2 25 2 C15 2 8 10 8 22 C8 34 12 38 12 40 C12 42 8 46 8 58 C8 70 15 78 25 78 C35 78 45 72 45 60 C45 48 40 44 40 40 C40 36 45 32 45 20"
                fill="currentColor"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
