import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import ProjectGallery from '@/components/sections/ProjectGallery';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllProjects } from '@/lib/content';

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className="app-shell min-h-screen">
      <Header />
      <main className="pt-[84px] sm:pt-24 lg:pt-28">
        <Hero />
        <Experience />
        <ProjectGallery projects={projects} />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
