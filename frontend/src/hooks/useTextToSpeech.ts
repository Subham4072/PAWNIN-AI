// export const useTextToSpeech = () => {
//   const speak = (text: string) => {
//     if (!window.speechSynthesis) {
//       alert("Text to speech not supported");
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     utterance.rate = 1;
//     utterance.pitch = 1;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utterance);
//   };

//   return { speak };
// };
export const useTextToSpeech = () => {
  const speak = (text: string) => {
    const synth = window.speechSynthesis;

    if (!synth) {
      alert("Text to Speech not supported");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // 🔹 Get all available voices
    const voices = synth.getVoices();

    // 🔹 Pick a clear voice (change name if needed)
    const preferredVoice =
      voices.find(v => v.name.includes("Google")) ||
      voices.find(v => v.name.includes("Microsoft")) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.lang = "en-US";
    utterance.rate = 0.95;   // slower = clearer
    utterance.pitch = 1;

    synth.cancel();
    synth.speak(utterance);
  };

  return { speak };
};
