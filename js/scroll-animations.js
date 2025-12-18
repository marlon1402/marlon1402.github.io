// Animação de Fade In para seções
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

// Animação de Fade In para a TimeLine
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

const timeline = document.querySelector('.timeline-line');

if (timeline) {
  const timelineObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        timeline.classList.add('grow');
        timelineObserver.disconnect();
      }
    },
    {
      threshold: 0.3
    }
  );

  timelineObserver.observe(timeline.parentElement);
}
