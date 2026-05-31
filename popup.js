function playVoice(){

  const text = document.getElementById("text").value;
  const sound = convert(text);

  const u = new SpeechSynthesisUtterance(sound);

  applyIslandStyle(u);

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
