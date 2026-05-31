// 🔤 英文 phonics
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

// 🌊 名字例外（重點🔥）
const nameMap = {
  "ADI": "a di",
  "Adi": "a di"
};

// 🧠 發音轉換
function convert(text){

  const upper = text.toUpperCase();

  // 👉 名字優先
  if (nameMap[text] || nameMap[upper]){
    return nameMap[text] || nameMap[upper];
  }

  return text
    .toUpperCase()
    .split("")
    .map(c => phonetic[c] || c)
    .join(" ");
}

// 🌴 島嶼語氣（慢速感）
function applyIslandStyle(u){
  u.rate = 0.85;
  u.pitch = 1.1;
  u.lang = "en-GB";
}
