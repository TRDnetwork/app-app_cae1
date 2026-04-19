import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-text mb-4 leading-tight">
          Jane Doe
        </h1>
        <p className="text-xl md:text-2xl text-text-dim mb-8">
          Full-Stack Developer & Designer
        </p>
        <p className="max-w-2xl mx-auto text-text-dim text-lg">
          Crafting elegant digital experiences with a focus on performance, accessibility, and user-centered design.
        </p>
      </motion.div>
    </section>
  );
}