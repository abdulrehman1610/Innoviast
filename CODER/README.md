# CODER Dev Assistant

CODER is a focused developer assistant that helps users write, debug, review, and understand code. It was built for the InnoViast Week 1 AI Solutions Engineering assignment.

## Features
- **Focused coding persona**: Answers programming, debugging, architecture, refactoring, and technical explanation questions.
- **Scope guardrails**: Redirects non-programming requests back to software development.
- **Fallback and error handling**: Handles empty input, loading state, missing API keys, authentication errors, and network failures.
- **Clean chat UI**: Responsive message thread, starter prompts, readable code blocks, character limit, and keyboard-friendly input.

## Tech Stack
- **Frontend**: React with Vite
- **Styling**: Pure CSS
- **AI Integration**: Groq API using `llama-3.1-8b-instant`

## Setup Instructions

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd SupportPilot-InnoViast
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create an `.env` file based on `.env.example` and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=gsk_your_api_key_here
   VITE_GROQ_MODEL=llama-3.1-8b-instant
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

Deploy on Vercel or Netlify by linking the repository and setting the environment variables in the hosting dashboard.

## Security Notes
- `.env` files are ignored by Git. Do not commit real API keys.
- This prototype calls Groq from the browser, so any `VITE_` key can be visible to users of a deployed frontend.
- For production, move the Groq request to a backend or serverless API route and keep the secret key server-side only.

## Submission Checklist
- Working chatbot prototype: complete.
- `README.md` and `AI_USAGE.md`: complete.
- Prompt documentation: complete in `AI_USAGE.md`.
- Screenshots: still need to be added before submission.
- Live deployment link: still need to be added after deploying.
- Demo video: still need to be recorded.
