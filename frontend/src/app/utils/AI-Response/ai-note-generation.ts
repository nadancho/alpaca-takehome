'use server';

export async function generateInitialNote(userInput: string) {
    try {
        const response = await fetch('http://127.0.0.1:8000/generate/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log(responseData);

        return responseData;
    } catch (error) {
        console.error('Error generating initial note:', error);
        throw error;
    }
}

export async function generateRedoNote() {}
