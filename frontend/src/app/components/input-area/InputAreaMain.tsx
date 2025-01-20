'use client';

import { generateInitialNote } from '@/app/utils/AI-Response/ai-note-generation';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function InputAreaMain() {
    //Define States here:
    const [userInput, setUserInput] = useState<string>(''); //input written by user
    const [aiResponseSections, setAiResponseSections] = useState<string[]>([]); //sections to render for AI response
    const [isEditing, setIsEditing] = useState(false); //boolean for editing AI response

    //function to change the input. Used in Text Field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            //Make a server call to generate the initial note data, parse & read
            const response = await generateInitialNote(userInput);
            console.log('Obtained Response: ', response);

            const formattedSections = formatGeneratedNote(
                response.generated_note
            );
            setAiResponseSections(formattedSections);
        } catch (error) {
            console.error('Error submitting input:', error);
        }
    };

    const formatGeneratedNote = (note: string): string[] => {
        const paragraphs = note.split('\n\n'); // Split into paragraphs
        const formattedParagraphs: string[] = [];

        paragraphs.forEach((paragraph) => {
            const lines = paragraph.split('\n');
            const formattedLines: string[] = [];

            lines.forEach((line) => {
                // Check if the entire line is bold
                if (/^\*\*.*\*\*$/.test(line)) {
                    formattedLines.push(
                        `<strong>${line.slice(2, -2)}</strong>`
                    ); // Remove outer ** and wrap in <strong>
                } else {
                    // Process individual words for bold formatting
                    formattedLines.push(
                        line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    );
                }
            });

            // Join the formatted lines back into a paragraph
            formattedParagraphs.push(formattedLines.join('<br />')); // Use <br /> for line breaks within paragraphs
        });

        return formattedParagraphs;
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    const handleSectionChange = (newContent: string, index: number) => {
        const updatedSections = [...aiResponseSections];
        updatedSections[index] = newContent;
        setAiResponseSections(updatedSections);
    };

    const htmlToPlainText = (htmlString: string): string => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlString;
        return tempElement.textContent || '';
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
            </div>
            <div className='flex flex-col w-full gap-2'>
                <Typography>AI Response:</Typography>
                {aiResponseSections.map((section, index) => (
                    <div key={index} className='mb-2'>
                        {isEditing ? (
                            <TextField
                                multiline
                                fullWidth
                                rows={4}
                                defaultValue={htmlToPlainText(section)}
                                onChange={(e) =>
                                    handleSectionChange(e.target.value, index)
                                }
                            />
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{ __html: section }}
                            ></div>
                        )}
                    </div>
                ))}

                {aiResponseSections.length > 0 &&
                    (isEditing ? (
                        <Button variant='contained' onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    ) : (
                        <Button variant='outlined' onClick={handleEditClick}>
                            Edit
                        </Button>
                    ))}
            </div>
        </div>
    );
}
