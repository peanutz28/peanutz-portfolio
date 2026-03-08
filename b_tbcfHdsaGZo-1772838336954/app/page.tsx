"use client"

import { useState } from "react"
import { PeanutLoader } from "@/components/peanut-loader"
import { BlueprintGrid } from "@/components/blueprint-grid"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { WhatIBuild } from "@/components/what-i-build"
import { FeaturedProjects } from "@/components/featured-projects"
import { LabNotesPreview } from "@/components/lab-notes-preview"
import { Footer } from "@/components/footer"
import { CrochetDivider } from "@/components/crochet-divider"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <PeanutLoader onComplete={() => setIsLoading(false)} />}
      
      <main className="relative min-h-screen bg-background">
        {/* Blueprint grid background */}
        <BlueprintGrid />
        
        <Navigation />
        <HeroSection />
        <CrochetDivider className="px-6 crochet-sage" height={28} />
        <WhatIBuild />
        <CrochetDivider className="px-6 crochet-sage" height={28} />
        <FeaturedProjects />
        <CrochetDivider className="px-6 crochet-sage" height={28} />
        <LabNotesPreview />
        <Footer />
      </main>
    </>
  )
}
