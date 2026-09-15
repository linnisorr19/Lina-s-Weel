const supabase = window.supabase.createClient(
  "https://bvfodovckettkyymnvia.supabase.co",
  "sb_publishable_WMsP5hZc79npsTypDUt-wg_00PoNgwD"
);
const wheel = document.getElementById("wheel");
const spin = document.getElementById("spin");
const spinSound = document.getElementById("spinSound");

let rotation = 0;

const premii = [
  { text: "🐱 2 pics", unghi: 0, sansa: 25 },
  { text: "🍒 2 pics", unghi: 45, sansa: 25 },
  { text: "🍆 Rate + Sexting", unghi: 90, sansa: 20 },
  { text: "Sexting 10 minute", unghi: 135, sansa: 15 },
  { text: "Custom pic", unghi: 180, sansa: 6 },
  { text: "Custom video", unghi: 225, sansa: 5 },
  { text: "Video 2 min", unghi: 270, sansa: 3 },
  { text: "Web 5 min", unghi: 315, sansa: 1 }
];

function alegePremiu() {
  const total = premii.reduce((s, p) => s + p.sansa, 0);
  let r = Math.random() * total;

  for (const p of premii) {
    if (r < p.sansa) return p;
    r -= p.sansa;
  }

  return premii[0];
}

spin.addEventListener("click", () => {

  const premiu = alegePremiu();

  if (spinSound) {
    spinSound.pause();
    spinSound.currentTime = 0;
    spinSound.loop = true;
    spinSound.play().catch(() => {});
  }

  rotation += 2160 + premiu.unghi;

  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {

    if (spinSound) {
      spinSound.pause();
      spinSound.currentTime = 0;
    }

    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 }
    });

    alert("🎉 Ai câștigat:\n\n" + premiu.text);

  }, 5000);

});
