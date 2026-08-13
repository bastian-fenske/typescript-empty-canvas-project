
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

const apiKeyField = (document.getElementById('apiKey') as HTMLInputElement);
const storedApiKey = localStorage.getItem('apiKey');
if (storedApiKey !== null) {
    apiKeyField.value = storedApiKey;
}

document.getElementById('run')!.addEventListener('click', async () => {
    const apiKey = apiKeyField.value;
    if (!apiKey) {
        alert('Please enter your API key.');
        return;
    }
    localStorage.setItem('apiKey', apiKey);
    const prompt = (document.getElementById('prompt') as HTMLTextAreaElement).value;
    const result = await callApi(apiKey, prompt);
    (document.getElementById('game') as HTMLIFrameElement).srcdoc = result;
});