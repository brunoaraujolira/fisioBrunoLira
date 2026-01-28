
/**
 * ============================================
 * BRUNO LIRA FISIOTERAPIA - SCRIPT (v4)
 * - Corrige carregamento do EmailJS (requer email.min.js no HTML)
 * - Envia formulário sem recarregar a página
 * - Mantém a mensagem de sucesso visível (sem "voltar pro topo")
 * - Mostra erro REAL quando falhar (status/text do EmailJS)
 * ============================================
 */

// ============================
// 1) CONFIG
// ============================
const CONFIG = {
  EMAIL_JS_PUBLIC_KEY: "FRPaB1VVIlfT9fn3N",
  EMAIL_JS_SERVICE_ID: "service_d2dnldc",
  EMAIL_JS_TEMPLATE_ID: "template_0mjvkwu",
  RECIPIENT_EMAIL: "brunolira@msn.com",
};

// ============================
// 2) SELECTORS
// ============================
const SELECTORS = {
  contactForm: "#contact-form",
  successMessage: "#success-message",
  submitBtn: 'button[type="submit"]',
  nameInput: "#name",
  phoneInput: "#phone",
  emailInput: "#email",
  serviceSelect: "#service",
  messageInput: "#message",
};

// ============================
// 3) HELPERS
// ============================
function setElementVisibility(el, isVisible) {
  if (!el) return;
  el.classList.toggle("hidden", !isVisible);
}

function getFormData() {
  return {
    name: document.querySelector(SELECTORS.nameInput)?.value?.trim() || "",
    phone: document.querySelector(SELECTORS.phoneInput)?.value?.trim() || "",
    email: document.querySelector(SELECTORS.emailInput)?.value?.trim() || "",
    service: document.querySelector(SELECTORS.serviceSelect)?.value || "",
    message: document.querySelector(SELECTORS.messageInput)?.value?.trim() || "",
  };
}

function setSubmitButtonState(btn, disabled, text) {
  if (!btn) return;
  btn.disabled = disabled;
  if (typeof text === "string") btn.textContent = text;
}

function formatEmailJsError(err) {
  // EmailJS costuma retornar { status, text } ou lançar Error()
  if (!err) return "Erro desconhecido.";
  const status = err.status ? ` (status ${err.status})` : "";
  const text = err.text ? `: ${err.text}` : (err.message ? `: ${err.message}` : "");
  return `Falha ao enviar${status}${text}`;
}

function ensureEmailJsAvailable() {
  // Se o CDN carregou certo, window.emailjs existe
  if (window.emailjs) return true;
  return false;
}

// ============================
// 4) EMAIL
// ============================
function initEmailJs() {
  if (!ensureEmailJsAvailable()) {
    throw new Error(
      "EmailJS não carregado. Confirme no HTML o script: " +
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    );
  }
  window.emailjs.init(CONFIG.EMAIL_JS_PUBLIC_KEY);
}

async function sendEmail(formData) {
  if (!ensureEmailJsAvailable()) {
    throw new Error(
      "EmailJS não carregado. Confirme no HTML o script: " +
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    );
  }

  return window.emailjs.send(
    CONFIG.EMAIL_JS_SERVICE_ID,
    CONFIG.EMAIL_JS_TEMPLATE_ID,
    {
      to_email: CONFIG.RECIPIENT_EMAIL,
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      subject: formData.service, // assunto = serviço de interesse
    }
  );
}

// ============================
// 5) INIT
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(SELECTORS.contactForm);
  const success = document.querySelector(SELECTORS.successMessage);
  const submitBtn = form?.querySelector(SELECTORS.submitBtn);

  if (!form) return;

  // Inicializa EmailJS (vai acusar erro claro se o script estiver errado)
  try {
    initEmailJs();
    console.log("✓ EmailJS inicializado");
  } catch (e) {
    console.error(e);
    // não trava a página; só avisa quando tentar enviar
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalText = submitBtn?.textContent || "Enviar mensagem";
    const data = getFormData();

    try {
      setSubmitButtonState(submitBtn, true, "Enviando...");
      await sendEmail(data);

      // UX: não mexe no layout (evita “voltar pro topo”).
      // Apenas mostra mensagem de sucesso e limpa o formulário.
      form.reset();
      setElementVisibility(success, true);

      // Se quiser, role suavemente até a mensagem (sem ir pro topo):
      success?.scrollIntoView({ behavior: "smooth", block: "center" });

      setSubmitButtonState(submitBtn, false, originalText);
      console.log("✓ Mensagem enviada com sucesso via EmailJS");
    } catch (err) {
      console.error("Erro EmailJS:", err);
      const msg = formatEmailJsError(err);
      alert(msg);
      setSubmitButtonState(submitBtn, false, originalText);
    }
  });
});

// Legal Modal (Política de Privacidade / Termos de Uso)
const legalModal = document.getElementById('legal-modal');
const legalOverlay = document.getElementById('legal-modal-overlay');
const legalCloseBtn = document.getElementById('legal-modal-close');
const openPrivacyBtn = document.getElementById('open-privacy');
const openTermsBtn = document.getElementById('open-terms');
const tabPrivacy = document.getElementById('tab-privacy');
const tabTerms = document.getElementById('tab-terms');
const contentPrivacy = document.getElementById('content-privacy');
const contentTerms = document.getElementById('content-terms');
const modalTitle = document.getElementById('legal-modal-title');

function setLegalTab(tab) {
  const isPrivacy = tab === 'privacy';

  if (isPrivacy) {
    contentPrivacy.classList.remove('hidden');
    contentTerms.classList.add('hidden');

    tabPrivacy.classList.add('bg-teal-600', 'text-white');
    tabPrivacy.classList.remove('bg-gray-100', 'text-gray-700');

    tabTerms.classList.add('bg-gray-100', 'text-gray-700');
    tabTerms.classList.remove('bg-teal-600', 'text-white');

    modalTitle.textContent = 'Política de Privacidade';
  } else {
    contentTerms.classList.remove('hidden');
    contentPrivacy.classList.add('hidden');

    tabTerms.classList.add('bg-teal-600', 'text-white');
    tabTerms.classList.remove('bg-gray-100', 'text-gray-700');

    tabPrivacy.classList.add('bg-gray-100', 'text-gray-700');
    tabPrivacy.classList.remove('bg-teal-600', 'text-white');

    modalTitle.textContent = 'Termos de Uso';
  }
}

function openLegalModal(tab) {
  if (!legalModal) return;
  setLegalTab(tab);
  legalModal.classList.remove('hidden');
  legalModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
  if (!legalModal) return;
  legalModal.classList.add('hidden');
  legalModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Bindings (only if elements exist)
if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openLegalModal('privacy'));
if (openTermsBtn) openTermsBtn.addEventListener('click', () => openLegalModal('terms'));
if (tabPrivacy) tabPrivacy.addEventListener('click', () => setLegalTab('privacy'));
if (tabTerms) tabTerms.addEventListener('click', () => setLegalTab('terms'));
if (legalCloseBtn) legalCloseBtn.addEventListener('click', closeLegalModal);
if (legalOverlay) legalOverlay.addEventListener('click', closeLegalModal);

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && legalModal && !legalModal.classList.contains('hidden')) {
    closeLegalModal();
  }
});