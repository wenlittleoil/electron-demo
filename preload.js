window.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.querySelector('video');
  if (videoElement) {
    videoElement.play();
  }
  const versionsElement = document.getElementById('versions');
  if (versionsElement) {
    versionsElement.innerText = 
      `应用平台及版本：${process.platform}, ${JSON.stringify(process.versions)}`;
  }
});