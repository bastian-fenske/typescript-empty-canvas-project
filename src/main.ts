const API_KEY_STORAGE_KEY = 'gemini-api-key';

function getStoredApiKey(): string | null {
    try {
        return localStorage.getItem(API_KEY_STORAGE_KEY);
    } catch (error) {
        console.error('Could not read the API key from localStorage.', error);
        return null;
    }
}

function saveApiKey(apiKey: string): void {
    const trimmedApiKey = apiKey.trim();
    if (!trimmedApiKey) {
        return;
    }

    try {
        localStorage.setItem(API_KEY_STORAGE_KEY, trimmedApiKey);
    } catch (error) {
        console.error('Could not save the API key to localStorage.', error);
    }
}

function ensureApiKey(): string | null {
    const storedApiKey = getStoredApiKey();
    if (storedApiKey) {
        return storedApiKey;
    }

    const enteredApiKey = window.prompt('Enter your Gemini API key. It will be saved in your browser for future use.');
    if (!enteredApiKey) {
        return null;
    }

    const trimmedApiKey = enteredApiKey.trim();
    if (!trimmedApiKey) {
        alert('Please enter a valid API key.');
        return null;
    }

    saveApiKey(trimmedApiKey);
    return trimmedApiKey;
}

async function callApi(apiKey: string, prompt: string): Promise<string> {

    const promptPrefix = `
    You are a game developer. You will be given a prompt and you will generate a complete HTML5 game based on that prompt. 
    The game should be fully functional and playable in a web browser.
    The game should be written in HTML, CSS, and JavaScript. 
    The game should be self-contained and not rely on any external libraries or frameworks.
    The window size is 800px width and 600px height.
    Return only the source code. No additional text. Not only parts of the game or code. No Markdown to wrap the source code.
    
    Here is the game idea:
    
    `

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: promptPrefix + prompt
                            }
                        ]
                    }
                ]
            })
        });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

const promptInput = document.getElementById('prompt') as HTMLTextAreaElement;
const runButton = document.getElementById('run') as HTMLButtonElement;
const gameIFrame = document.getElementById('game') as HTMLIFrameElement;

const apiKey = ensureApiKey();
if (!apiKey) {
    runButton.disabled = true;
    promptInput.disabled = true;
    alert('Please enter an API key to generate a game.');
}

runButton.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
        alert('Please enter a prompt before running the generator.');
        return;
    }

    const activeApiKey = ensureApiKey();
    if (!activeApiKey) {
        return;
    }

    const result = await callApi(activeApiKey, prompt);
    gameIFrame.srcdoc = result;
});
