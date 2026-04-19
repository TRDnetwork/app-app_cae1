import { motion } from 'framer-motion';

export function About() {
  return (
    <section className="py-16">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-text">About Me</h2>
        <p className="text-lg text-text-dim leading-relaxed">
          I'm a passionate developer with over 5 years of experience building web applications
          that balance beautiful design with robust functionality. My approach combines technical
          excellence with a deep understanding of user needs, resulting in products that are both
          delightful to use and reliable under the hood.
        </p>
        <p className="text-lg text-text-dim leading-relaxed mt-4">
          When I'm not coding, you'll find me exploring new coffee shops, practicing calligraphy,
          or hiking in the mountains. These experiences inspire my design sensibility and remind
          me of the importance of creating digital spaces that feel human and authentic.
        </p>
      </motion.div>
    </section>
  );
}