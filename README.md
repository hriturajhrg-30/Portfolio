# Hritu Raj - Portfolio

A responsive personal portfolio for Hritu Raj, a Computer Science Engineering student. The site presents five learning projects, supports project search and light/dark themes, and includes an API-backed portfolio assistant.

## Features

- About, skills, projects, contact, and chatbot sections
- Search project titles, descriptions, and technologies
- Light/dark theme toggle that remembers the visitor's choice
- Responsive layout and keyboard-friendly controls
- Five project cards with repository links and available live application links
- Portfolio assistant powered by the OpenAI Responses API through a Vercel serverless function
- API credentials read only on the server through environment variables

## Projects

| Project | GitHub repository | Live application |
| --- | --- | --- |
| Python Programs Collection | [python_basics_25bcon2111](https://github.com/hriturajhrg-30/python_basics_25bcon2111) | — |
| Messy Code, Clearer Logic | [Messy-Code](https://github.com/hriturajhrg-30/Messy-Code) | — |
| Bug Fixing with Cursor AI | [Buggy-Code](https://github.com/hriturajhrg-30/Buggy-Code) | — |
| Interactive Quiz Application | [QUIZ](https://github.com/hriturajhrg-30/QUIZ) | [quizproject4.vercel.app](https://quizproject4.vercel.app/) |
| Book Reading List | [readinglistapp](https://github.com/hriturajhrg-30/readinglistapp) | [readinglistapp-gamma.vercel.app](https://readinglistapp-gamma.vercel.app/) |

## Technologies

- HTML, CSS, and vanilla JavaScript
- Vercel Node.js Functions
- OpenAI Responses API
- Git and GitHub

## Run locally

The portfolio assistant needs a serverless runtime and an OpenAI API key. Do not put the key in client-side JavaScript or commit it to GitHub.

1. Install Node.js and the Vercel CLI.
2. From the project directory, create a local `.env.local` file:
   ```text
   OPENAI_API_KEY=your_api_key_here
   ```
3. Start the local Vercel environment:
   ```sh
   vercel dev
   ```

The API key can be created and managed through your OpenAI API account. Add it to the Vercel project's Environment Variables as `OPENAI_API_KEY` for Production and Preview before deployment. Set `OPENAI_MODEL` only if you want to override the default `gpt-5-mini` model. Redeploy after changing environment variables.

## Deploy on Vercel

1. Push this project to a GitHub repository.
2. Import that repository into Vercel.
3. Add `OPENAI_API_KEY` to the Vercel project's Environment Variables. Keep it server-side; do not use a `NEXT_PUBLIC_` prefix.
4. Deploy the project and open the deployed URL.
5. Ask the portfolio assistant a question to confirm the API key and function are configured.

## Notes

- The chatbot answers only from the portfolio facts embedded in `api/chat.js`. Update that context when project or profile details change.
- The assistant returns a helpful unavailable message when its API is unconfigured or the provider request fails.
- The avatar is a CSS initials graphic, not a personal photograph. Replace it with a personal image if desired.

