export function checkMicrophonePermission() {
  navigator.permissions.query({ name: 'microphone' })
    .then(status => alert("Microphone permission: " + status.state))
    .catch(err => alert("Permission error: " + err.message));
}
