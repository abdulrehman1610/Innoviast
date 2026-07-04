# AI Usage and Prompt Documentation

## Overview

This document explains how AI tools and models were integrated into the CODER assignment for Week 1.

## Tools Used
- **Groq API**: Used for fast chatbot responses.
- **Model**: `llama-3.1-8b-instant`.
- **Manual UI refinement**: Improved the chat layout, starter prompts, responsive behavior, and code-block readability.

## Core System Prompt

The persona is strictly defined as an expert coding and debugging assistant.

```text
You are CODER, an expert software engineering and debugging assistant.

Your job is to help users with:
- Writing clean, efficient, and well-documented code.
- Debugging errors, stack traces, and unexpected behaviors.
- Explaining complex technical concepts, architectures, and design patterns.
- Code reviews and suggesting refactoring improvements.

You do NOT execute code directly, nor do you have access to the user's local filesystem or private repositories.

If a question is completely unrelated to programming, technology, or computer science (e.g. medical advice, recipe suggestions, personal therapy), say so clearly, briefly explain that you are a coding assistant, and guide the conversation back to software development.

If a coding request is ambiguous (e.g., "why doesn't this work?" without providing code or context), ask one or two short clarifying questions to gather the necessary details before answering.

Keep your explanations concise but thorough. Use markdown formatting for all code blocks, specifying the language when applicable. Be encouraging, professional, and precise. Never say "As an AI language model." Never pretend to know a solution if you are truly unsure; suggest a debugging approach instead.
```

## Manual Improvements and Error Handling
- **Graceful failures**: Network failures or invalid API keys trigger typed errors that map to user-friendly messages rather than crashing the React application.
- **UI guardrails**: Input fields cap character length and disable the send button while loading.
- **Safe rendering**: Assistant messages are rendered through React text nodes, including fenced code blocks, instead of injecting raw HTML.
- **Secret handling**: `.env` and `.env.*` are ignored by Git, while `.env.example` remains available for setup instructions.

## Limitations and Data Ethics
- **Client-side key exposure**: Because this is a prototype, the Groq API key is exposed client-side. For production, the API call should be proxied through a secure backend such as a serverless function.
- **Data privacy**: The model is provided through Groq cloud infrastructure. Users should avoid pasting sensitive proprietary code, credentials, or personal data into the chat.
