import { ref } from 'vue';

const STORAGE_KEY = 'cookie_consent';
const GA4_ID = 'G-HX3R7GECKL';

const consent = ref(localStorage.getItem(STORAGE_KEY)); // 'accepted' | 'declined' | null
let ga4Loaded = false;

function loadGA4() {
  if (ga4Loaded) return;
  ga4Loaded = true;

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, { send_page_view: false });

  // Inject the gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);
}

// If user previously accepted, load GA4 immediately
if (consent.value === 'accepted') {
  loadGA4();
}

export function useConsent() {
  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    consent.value = 'accepted';
    loadGA4();
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    consent.value = 'declined';
  }

  return { consent, accept, decline };
}
