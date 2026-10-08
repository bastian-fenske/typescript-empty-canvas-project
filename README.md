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

### Store the key in the browser
- When you open the app, it will check whether an API key is already saved in the browser.
- If no key is stored yet, a prompt will ask you to enter it.
- The key is then saved in `localStorage` so you won't need to enter it again on the same browser.

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
