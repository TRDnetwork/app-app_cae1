import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ContactForm } from './components/ContactForm';

export function App() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4">
        <Hero />
        <About />
        <Projects />
        <section className="py-16">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}