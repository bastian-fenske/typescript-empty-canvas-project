import { API_KEY } from '../api-key';

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

if (!API_KEY) {
    alert('Please create an API key file as described in the readme.');
}

const promptInput = document.getElementById('prompt') as HTMLTextAreaElement;
const runButton = document.getElementById('run') as HTMLButtonElement;
const gameIFrame = document.getElementById('game') as HTMLIFrameElement;

runButton.addEventListener('click', async () => {
    const prompt = promptInput.value;
    const result = await callApi(API_KEY, prompt);
    gameIFrame.srcdoc = result;
});
