'use client';

import { generateInitialNote } from '@/app/utils/AI-Response/ai-note-generation';
import {
    Button,
    CircularProgress,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export default function InputAreaMain() {
    //Define States here:
    const [userInput, setUserInput] = useState<string>(''); //input written by user
    const [aiResponseSections, setAiResponseSections] = useState<string[]>([]); //sections to render for AI response
    const [isEditing, setIsEditing] = useState(false); //boolean for editing AI response
    const [isLoading, setIsLoading] = useState(false); //loading state for AI during await

    //function to change the input. Used in Text Field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    //Sumit taken notes to open AI through server-side function
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await generateInitialNote(userInput);
            // console.log('Obtained Response: ', response);
            //formatting the response before displaying to user.
            const formattedSections = formatGeneratedNote(
                response.generated_note
            );
            setAiResponseSections(formattedSections);
        } catch (error) {
            console.error('Error submitting input:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    //The AI response is separated into sections of an array. This is the helper to change those sections.
    const handleSectionChange = (newContent: string, index: number) => {
        const updatedSections = [...aiResponseSections];
        updatedSections[index] = newContent;
        setAiResponseSections(updatedSections);
    };

    const loadDemoData = () => {
        setUserInput(demoData);
    };

    return (
        <div className='flex flex-row w-full gap-2'>
            <div className='flex flex-col gap-2 w-full'>
                <Typography>Write Notes Here:</Typography>
                <TextField
                    multiline
                    minRows={6}
                    maxRows={18}
                    fullWidth
                    placeholder='Enter your text here...'
                    value={userInput}
                    onChange={handleInputChange}
                />
                <Button variant='contained' onClick={handleSubmit}>
                    Submit
                </Button>

                <div>
                    <Tooltip
                        title={
                            'For the sake of demonstration, this button will load pre-written notes into the input.'
                        }
                    >
                        <Button variant='outlined' onClick={loadDemoData}>
                            Load Demo Data
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className='flex flex-col w-full gap-2'>
                <Typography>AI Response:</Typography>

                {isLoading ? (
                    <div className='flex justify-center'>
                        <CircularProgress />
                    </div>
                ) : aiResponseSections.length === 0 ? (
                    <Typography>No AI response yet.</Typography>
                ) : (
                    <>
                        {aiResponseSections.map((section, index) => (
                            <div key={index} className='mb-2'>
                                {isEditing ? (
                                    <TextField
                                        multiline
                                        fullWidth
                                        rows={4}
                                        defaultValue={htmlToPlainText(section)}
                                        onChange={(e) =>
                                            handleSectionChange(
                                                e.target.value,
                                                index
                                            )
                                        }
                                    />
                                ) : (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: section,
                                        }}
                                    ></div>
                                )}
                            </div>
                        ))}

                        {aiResponseSections.length > 0 &&
                            (isEditing ? (
                                <Button
                                    variant='contained'
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </Button>
                            ) : (
                                <Button
                                    variant='outlined'
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </Button>
                            ))}
                    </>
                )}
            </div>
        </div>
    );
}

const demoData =
    'pt John Chapman\npt is upset and angry often times when interacting socially\nmonitor\nmedicate daily\nfollow ups weekly\nreports daily';

//A helper function to format the text to plain for rendering during editing.
const htmlToPlainText = (htmlString: string): string => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || '';
};

const formatGeneratedNote = (note: string): string[] => {
    const paragraphs = note.split('\n\n'); // Split into paragraphs
    const formattedParagraphs: string[] = [];

    /**
     * Iterate through the paragraphcs written out by ChatGPT and separat them with formatting for view.
     */
    paragraphs.forEach((paragraph) => {
        const lines = paragraph.split('\n');
        const formattedLines: string[] = [];

        lines.forEach((line) => {
            if (/^\*\*.*\*\*$/.test(line)) {
                formattedLines.push(`<strong>${line.slice(2, -2)}</strong>`);
            } else {
                formattedLines.push(
                    line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                );
            }
        });

        // Using <br /> for line breaks within paragraphs as HTML
        formattedParagraphs.push(formattedLines.join('<br />'));
    });

    return formattedParagraphs;
};
