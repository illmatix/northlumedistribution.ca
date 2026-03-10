// Vitest global setup

// Mock IntersectionObserver (not available in jsdom)
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.elements = [];
  }
  observe(el) {
    this.elements.push(el);
  }
  unobserve(el) {
    this.elements = this.elements.filter((e) => e !== el);
  }
  disconnect() {
    this.elements = [];
  }
}

globalThis.IntersectionObserver = IntersectionObserverMock;
