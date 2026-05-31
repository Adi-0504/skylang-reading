
// =======================
// 🌊 空語 → 發音轉換
// =======================

// 英文 phonics
const phonetic = {
  A: "ei",
  B: "bi",
  C: "si",
  D: "di",
  E: "i",
  F: "ef",
  G: "ji",
  H: "eich",
  I: "ai",
  J: "jei",
  K: "kei",
  L: "el",
  M: "em",
  N: "en",
  O: "ou",
  P: "pi",
  Q: "kju",
  R: "ar",
  S: "es",
  T: "ti",
  U: "ju",
  V: "vi",
  W: "dʌbəlju",
  X: "eks",
  Y: "wai",
  Z: "zi"
};

// 👤 名字例外（你說的「ADI = a di」）
const nameMap = {
  "ADI": "a di",
  "Adi": "a di"
};

// =======================
// 🧠 轉換核心
// =======================
function convert(text){

  const upper = text.toUpperCase();

  // 👉 名字優先處理
  if (nameMap[text] || nameMap[upper]){
    return nameMap[text] || nameMap[upper];
  }

  // 👉 字母 phonics
  return text
    .toUpperCase()
    .split("")
    .map(c => phonetic[c] || c)
    .join(" ");
}

// =======================
// 🌴 島嶼語音風格
// =======================
function applyIslandStyle(u){
  u.lang = "en-GB";   // 英文基底（比較自然）
  u.rate = 0.85;      // 慢一點＝海島感
  u.pitch = 1.1;      // 微音樂感
}

// =======================
// 🔊 播放
// =======================
function playVoice(){

  const text = document.getElementById("text").value;
  const sound = convert(text);

  const u = new SpeechSynthesisUtterance(sound);

  applyIslandStyle(u);

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// =======================
// ⏹ 停止
// =======================
function stopVoice(){
  speechSynthesis.cancel();
}

// =======================
// 🎤 錄音下載（webm）
// =======================
let recorder;
let chunks = [];

async function recordVoice(){

  const text = document.getElementById("text").value;
  const sound = convert(text);

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  recorder = new MediaRecorder(stream);
  chunks = [];

  recorder.ondataavailable = e => {
    chunks.push(e.data);
  };

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sky_voice.webm";
    a.click();
  };

  recorder.start();

  const u = new SpeechSynthesisUtterance(sound);
  applyIslandStyle(u);

  speechSynthesis.speak(u);

  setTimeout(() => {
    recorder.stop();
  }, 3000);
}
