// =======================
// 🌊 phonetic（唯一來源）
// =======================

const phonetic = {
  A: "ei", B: "bi", C: "si", D: "di", E: "i",
  F: "ef", G: "ji", H: "eich", I: "ai", J: "jei",
  K: "kei", L: "el", M: "em", N: "en", O: "ou",
  P: "pi", Q: "kju", R: "ar", S: "es", T: "ti",
  U: "ju", V: "vi", W: "dʌbəlju", X: "eks",
  Y: "wai", Z: "zi"
};

// 👤 特殊名字
const nameMap = {
  "ADI": "a di",
  "Adi": "a di"
};

// =======================
// 🧠 轉換
// =======================
function convert(text){

  const upper = text.toUpperCase();

  if (nameMap[text] || nameMap[upper]){
    return nameMap[text] || nameMap[upper];
  }

  return text
    .toUpperCase()
    .split("")
    .map(c => phonetic[c] || c)
    .join(" ");
}

// =======================
// 🌴 語音風格
// =======================
function applyIslandStyle(u){
  u.lang = "en-GB";
  u.rate = 0.85;
  u.pitch = 1.1;
}
