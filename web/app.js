const captureButton = document.getElementById('capture');
const endpointInput = document.getElementById('endpoint');
const previewImage = document.getElementById('preview');
const statusLine = document.getElementById('status');

const captureImage = async () => {
  const endpoint = endpointInput.value.trim();

  if (!endpoint) {
    statusLine.textContent = 'Please enter an upload endpoint URL.';
    statusLine.dataset.state = 'error';
    return;
  }

  statusLine.textContent = 'Capturing image...';
  statusLine.dataset.state = 'working';

  try {
    const captureResponse = await fetch('/capture');
    if (!captureResponse.ok) {
      throw new Error(`Capture failed with status ${captureResponse.status}`);
    }

    const imageBlob = await captureResponse.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    previewImage.src = imageUrl;
    previewImage.classList.add('visible');

    statusLine.textContent = 'Uploading image...';

    const formData = new FormData();
    formData.append('image', imageBlob, 'capture.jpg');

    const uploadResponse = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed with status ${uploadResponse.status}`);
    }

    statusLine.textContent = 'Capture uploaded successfully.';
    statusLine.dataset.state = 'success';
  } catch (error) {
    statusLine.textContent = error.message;
    statusLine.dataset.state = 'error';
  }
};

captureButton.addEventListener('click', captureImage);
