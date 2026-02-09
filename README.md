# catflapcam

Simple web UI for capturing a still image from the FireBeetle 2 ESP32-P4 MIPI CSI camera
and uploading it to a configurable HTTP endpoint.

## Usage

1. Serve the `web/` folder from the ESP32-P4 firmware (or any static file host on the
   device).
2. Ensure your firmware exposes a `/capture` endpoint that returns a JPEG image from the
   camera sensor.
3. Open the page, enter the upload endpoint URL, and click **Capture**.

The UI will:

- Fetch the latest image from `/capture`.
- Display the captured image.
- POST the JPEG as multipart form data (`image` field) to the configured endpoint.
