import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
}

export function ProjectCard({ title, description, link }: ProjectCardProps) {
  const content = (
    <div className="bg-surface p-6 rounded-lg hover-lift transition-all duration-300 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-2 text-text">{title}</h3>
      <p className="text-text-dim flex-grow">{description}</p>
      {link && (
        <p className="text-accent text-sm mt-4 font-medium">
          View Project →
        </p>
      )}
    </div>
  );

  return link ? (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      whileHover={{ y: -4 }}
      whileFocus={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {content}
    </motion.a>
  ) : (
    <motion.div
      className="block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.div>
  );
}