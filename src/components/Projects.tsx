import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with inventory management, payment processing, and analytics dashboard.",
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative productivity tool with real-time updates, file sharing, and team workspaces.",
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Intuitive weather application with location-based forecasts, severe weather alerts, and historical data.",
      link: "#"
    }
  ];

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-12 text-center text-text">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}