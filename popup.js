function playVoice(){

  const text = document.getElementById("text").value;
  const sound = convert(text);

  const u = new SpeechSynthesisUtterance(sound);

  applyIslandStyle(u);

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function stopVoice(){
  speechSynthesis.cancel();
}

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

  recorder.ondataavailable = e => chunks.push(e.data);

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

  setTimeout(() => recorder.stop(), 3000);
}
