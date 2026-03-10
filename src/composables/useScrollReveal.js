import { onMounted, onUnmounted } from 'vue';

export function useScrollReveal(elementRef, { threshold = 0.15 } = {}) {
  let observer = null;

  onMounted(() => {
    const el = elementRef.value;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}
