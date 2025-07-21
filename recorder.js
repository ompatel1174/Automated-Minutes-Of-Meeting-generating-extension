let mediaRecorder, recordedChunks = [];
let recognition;
let transcript = "";

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
    mediaRecorder.start();

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + " ";
        }
      }
    };

    recognition.start();
    alert("Recording started.");
  } catch (err) {
    alert("Error starting recording: " + err.message);
  }
}

export function stopRecording() {
  if (mediaRecorder?.state !== "inactive") {
    mediaRecorder.stop();
    recognition?.stop();
    alert("Recording stopped.");

    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = audioURL;
    a.download = 'recording.webm';
    a.click();

    const textBlob = new Blob([
      `Minutes of Meeting:\n\n${transcript.trim() || "No speech recognized."}`
    ], { type: 'text/plain' });

    const textURL = URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textURL;
    textLink.download = 'minutes_of_meeting.txt';
    textLink.click();
  }
}
