# Fall Detection from Webcam

This project captures webcam frames, processes every 10th frame, and detects falls using Groq's AI model. The results are saved in a report.

## Features:
- Captures every 10th frame from the webcam.
- Analyzes frames for fall detection using AI.
- Generates a report with fall detection results.

## Setup:
1. Set `GROQ_API_KEY` as an environment variable.
2. Install dependencies:
   ```bash
   pip install opencv-python groq
