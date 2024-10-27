import { motion } from "framer-motion";
interface PulseProps {
  children: React.ReactNode;
  className?: string;
  pulseDuration?: number;
}

const Pulse = ({ children, className, pulseDuration = 1 }: PulseProps) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: pulseDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Pulse;
