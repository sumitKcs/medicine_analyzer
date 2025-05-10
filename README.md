# AI Medicine Analyzer

AI Medicine Analyzer is a modern web application that allows users to analyze and understand medicines using AI-powered insights. The app provides a sleek, animated chat interface where users can input medicine names and receive detailed information about them.

## Features

- **Two-Phase Interface**:
  - **Phase 1**: Initial landing page with a centered prompt and a capsule icon.
  - **Phase 2**: Fullscreen chat interface with scrollable messages and a sticky input box.
- **AI-Powered Responses**:
  - Uses Google GenAI SDK to fetch structured responses for medicine analysis.
  - Streaming responses are not supported yet but may be added in future updates.
- **Modern Design**:
  - Dark theme with elegant gradients and animations using Framer Motion.
  - Responsive layout for both desktop and mobile devices.
- **Customizable**:
  - Built with Tailwind CSS for easy styling and customization.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd medicine_analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:3000`.

## Configuration

- **Environment Variables**:
  - `VITE_GEMINI_API_KEY`: Your API key for Google GenAI.
  - `VITE_GEMINI_MODEL`: The model to use (e.g., `gemini-2.0-flash`).

## Project Structure

```
medicine_analyzer/
├── public/
│   ├── drugs.png
│   ├── vite.svg
├── src/
│   ├── App.jsx
│   ├── styles.css
│   ├── utils/
│   │   └── analyzeMedicine.js
│   ├── components/
│   └── assets/
├── tailwind.config.js
├── tsconfig.json
├── vite.config.js
├── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React, Tailwind CSS, Framer Motion
- **AI Integration**: Google GenAI SDK
- **Build Tool**: Vite

## Development Tools

- This project was built using the **Amazon Q Developer CLI + VS CODE Extension**, which streamlines the development and deployment of modern web applications.

## Usage

1. Enter the name of a medicine in the input box on the landing page.
2. Click "Analyze" to transition to the chat interface.
3. View detailed AI-generated insights about the medicine.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

## Future Updates

- **Streaming Responses**: Currently, streaming responses are not supported but may be added in future updates to enhance real-time interaction.
