AI Game Generator
=================

This project is an AI game generator that uses Google Gemini to produce simple browser games. It is implemented in 
TypeScript and runs in the browser.

---

Prerequisites
-------------

- Node.js and npm: https://nodejs.org/

---

Installation
------------

### Create a Gemini API key
- Go to https://aistudio.google.com/api-keys and sign in with your Google account.
- Click **Create API key** in the top right corner.
- Choose the option to create a new project.
- Copy the generated key.

---

### Store the key locally in this project
   - Create a file named api-key.ts in the projects root folder.
   - Add the following line and replace the placeholder with your key:

```ts
export const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
```

**Important: Do NOT commit api-key.ts to source control. Add it to .gitignore if it isn't already.**

---

### Install the dependencies

```bash
npm install
```

---

Running locally
---------------

**Development mode:**
```bash
npm run dev
```
