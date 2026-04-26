gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("hero-video");
const loading = document.getElementById("loading");
const closing = document.getElementById("closing-text");
const scrollHint = document.getElementById("scroll-hint");

// Fix for Safari / iOS scrubbing
const unlockVideo = () => {
  video.play().then(() => video.pause()).catch(() => {});
};
document.addEventListener("click", unlockVideo, { once: true });
document.addEventListener("touchstart", unlockVideo, { once: true });

// When video is ready
video.addEventListener("loadedmetadata", () => {
  const duration = video.duration || 6;

  video.classList.add("ready");
  loading.style.opacity = 0;

  // MAIN smooth scroll scrub
  gsap.to(video, {
    currentTime: duration,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6, // ⭐ smoothness
    }
  });

  // Cinematic zoom (subtle but powerful)
  gsap.to(video, {
    scale: 1.05,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    }
  });

  // Closing text fade
  gsap.to(closing, {
    opacity: 1,
    scrollTrigger: {
      trigger: ".hero",
      start: "75% top",
      end: "90% top",
      scrub: true
    }
  });
});

// Scroll hint fade
ScrollTrigger.create({
  start: "top -50",
  onUpdate: (self) => {
    if (self.scroll() > 80) {
      scrollHint.classList.add("faded");
    }
  }
});