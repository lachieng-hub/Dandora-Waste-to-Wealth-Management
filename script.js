const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  });
});

const processSteps = {
  collect: {
    kicker: "Start with what is here",
    title: "Bring materials\nback into the loop.",
    description: "Build reliable ways to gather useful materials close to where they are discarded, making recovery easier to take part in.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1100&q=85",
    alt: "Discarded plastic and other waste collected on the ground",
  },
  sort: {
    kicker: "Give each material a way forward",
    title: "Sort for the next\nuse, not the bin.",
    description: "Separate materials at the source so plastics, organics and reusable items can follow the paths that suit them best.",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1100&q=85",
    alt: "Separate bins for compost, waste and recycling",
  },
  create: {
    kicker: "Put local ingenuity to work",
    title: "Turn recovered\nmaterials into value.",
    description: "Support practical ways to reuse, remake and process recovered resources, with local knowledge shaping what gets made.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1100&q=85",
    alt: "A craftsperson shaping a product with a hand tool",
  },
  return: {
    kicker: "Keep the value close",
    title: "Bring useful things\nback to the community.",
    description: "Connect new products and recovered resources to people who can use them, and keep more value circulating locally.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1100&q=85",
    alt: "Green hills and a valley beneath an open sky",
  },
};

const tabs = [...document.querySelectorAll(".process__tab")];
const panel = document.querySelector(".process-panel");
const panelKicker = document.querySelector("#process-kicker");
const panelTitle = document.querySelector("#process-title");
const panelDescription = document.querySelector("#process-description");
const panelImage = document.querySelector("#process-image");
const panelIndex = document.querySelector("#process-index");

function activateStep(tab, moveFocus = false) {
  const step = tab.dataset.step;
  const content = processSteps[step];
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", tab.id);
  panelKicker.textContent = content.kicker;
  panelTitle.textContent = content.title;
  panelDescription.textContent = content.description;
  panelImage.src = content.image;
  panelImage.alt = content.alt;
  panelIndex.innerHTML = `${String(tabs.indexOf(tab) + 1).padStart(2, "0")} <span>/</span> 04`;
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateStep(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    activateStep(tabs[nextIndex], true);
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".section-heading, .challenge__grid, .approach__top, .process, .process-panel, .possibility__intro, .possibility-card, .closing__content").forEach((element) => {
    element.setAttribute("data-reveal", "");
    revealObserver.observe(element);
  });
}