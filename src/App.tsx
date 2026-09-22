import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { FocusAreas } from './components/FocusAreas'
import { Experience } from './components/Experience'
import { FeaturedProject } from './components/FeaturedProject'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { OpenSource } from './components/OpenSource'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Philosophy } from './components/Philosophy'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <FocusAreas />
        <Experience />
        <section id="projects" className="scroll-mt-20">
          <FeaturedProject />
          <Projects />
        </section>
        <Research />
        <OpenSource />
        <Skills />
        <Education />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
