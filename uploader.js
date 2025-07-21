export function uploadRecording() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'audio/*';
  input.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    alert("File uploaded: " + file.name);

    const simulatedTranscript = `
Minutes of Meeting:

- Project status reviewed.
- Blockers discussed.
- New sprint deadlines.
- Client demo scheduled.
- Action items documented.

(This is a simulated transcript.)
    `;

    const textBlob = new Blob([simulatedTranscript], { type: 'text/plain' });
    const textURL = URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textURL;
    textLink.download = 'minutes_of_meeting.txt';
    textLink.click();
  };
  input.click();
}
