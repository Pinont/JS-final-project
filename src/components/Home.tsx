import type { View } from "../types"
import HeroSection from "./HeroSection"
import AboutSection from "./AboutSection"
import AchievementsSection from "./AchievementsSection"
import TestimonialsSection from "./TestimonialsSection"
import Footer from "./Footer"

// ─── Home (composed) ────────────────────────────────────────────────────────

export default function Home({ setView }: { setView: (v: View) => void }) {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <TestimonialsSection />
      <Footer view="home" setView={setView} />
    </>
  )
}
