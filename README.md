# Welcome to project

## Project Overview

Chat Bot AI is a full-stack AI-powered conversational chat application built with React 18, TypeScript, and Vite, designed to deliver a fast, responsive, and intelligent chat experience. The application features secure email-based authentication powered by Supabase, allowing users to sign up, log in, and maintain persistent sessions across the app. Users can create and manage multiple independent chat conversations, with each session maintaining its own message history and auto-generated title based on the first message sent.

At its core, the app integrates OpenAI via Supabase Edge Functions to generate AI responses in real time, with messages rendered using React Markdown for rich text formatting including code blocks, lists, and more. The user interface is built using Tailwind CSS and shadcn/ui components, offering a clean, modern design that works seamlessly across both desktop and mobile devices, complete with a collapsible sidebar for conversation navigation and a welcoming prompt screen for first-time users.

The codebase is written in 96.8% TypeScript, following strict type safety with React Context API for global auth state, TanStack Query for server-state management, React Hook Form with Zod for validated form handling, and React Router v6 for client-side navigation with protected routes. The project is deployed on Vercel and maintained under the MIT License.


**URL**: [chat-buddy-ai-261.vercel.app](https://chat-buddy-ai-261.vercel.app/)

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
