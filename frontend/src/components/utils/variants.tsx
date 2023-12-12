export const AnimationVariants = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  card: {
    initial: {
      opacity: 0,
      y: -20,
    },

    animate: {
      opacity: 1,
      y: 0,
    },
  },
};
