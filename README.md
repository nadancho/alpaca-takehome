# Alpaca Health Software Engineering Take-Home Project

### Project Description

Visit this link for details:
[https://harviio.notion.site/Alpaca-Health-Eng-Take-home-Project-1411bfc50b90803382d4cae01f9bcf18?pvs=4](https://www.notion.so/harviio/ABA-Session-Note-Generator-Take-Home-Project-1411bfc50b90803382d4cae01f9bcf18?pvs=4)

## Setup Instructions

### Backend Setup (Python 3.11+ required)

```bash
# Create and activate virtual environment
python -m venv alpaca_venv
source alpaca_venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
fastapi dev main.py
```

### Frontend Setup (Node.js 18+ required)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at:

-   Frontend: http://localhost:3000
-   Backend API: http://localhost:8000
-   API Documentation: http://localhost:8000/docs

## Default Project Structure

-   `frontend/`: Next.js application
    -   `src/components/`: Reusable React components
    -   `src/app/`: Next.js app router pages
-   `backend/`: FastAPI application
    -   `app/main.py`: API endpoints

## Development

-   Frontend runs on port 3000 with hot reload enabled
-   Backend runs on port 8000 with auto-reload enabled
-   API documentation available at http://localhost:8000/docs

## Submission

1. Create a private GitHub repository
2. Implement your solution
3. Document any assumptions or trade-offs
4. Include instructions for running your solution
5. Send us the repository link

## Time Expectation

-   Expected time: 3-4 hours
-   Please don't spend more than 6 hours

## Evaluation Criteria

| Category                  | Details                                                                                                                                                                                     | Weight |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Product sense and scoping | - Final product decisions alignment with requirements<br>- Appropriate deprioritization of non-crucial parts                                                                                | 10%    |
| Technology selection      | - Right tools chosen for the job                                                                                                                                                            | 10%    |
| Technical Level           | - Well-organized and intuitive code structure<br>- Modular code (e.g., React components used)<br>- Proper use of React hooks<br>- Good state management<br>- Correct use of useEffect hooks | 40%    |
| Craft and Quality         | - Usable and intuitive UI/UX<br>- Presence and severity of bugs                                                                                                                             | 20%    |
| Documentation             | - Clear communication of logic and technical decisions in README                                                                                                                            | 10%    |
| Testing                   | - Presence of tests<br>- Quality and robustness of tests                                                                                                                                    | 10%    |

# Nathan Cho Documentation:

## Approach & Challenge:

The task broken down into different sections:

1. Interface
   a. Session Parameters
   b. Generate Note Section
   c. Edit / Refine Generated Notes Buttons
   d. Save button

2. AI Back-End service
   a. POST) /generate/new
   b. POST) /generate/redo

Approach:
I will break down the task at whole and create the minimum viable product to begin the note taking process and organize the other things as additional features to approach completion of the overall objective.

**_PLEASE NOTE: If the text field is invisible / does not show text, please use the application in Light-Mode not Dark-Mode_**

Features:

-
-   Primary (MVP)
    -   Users are able to input text in any format and obtain an AI translation of the input text into organized, documentation that is legible.
    -   There is prompt engineering for a clinical writing style & Applied Behavioral Analysis (complete)
-   Secondary (In order of work)
    -   Users are able to regenerate or refine specific sections
        -   Regenerate (unfinished)
        -   Revise with prompting (unfinished)
    -   control AI formatting / style (unfinished)

Key Files:

-
-   frontend/src/app/components/input-area/InputAreaMain.tsx
    -   This file contains the bulk of the front-end code that does the functions of the application.
        -   Comments are made within the file to explain the decisions I made.

Front End Plan:

-
-   I will be using a UI component library that simplifies some of the larger processes so that I can focus on making sure that all of the pieces are there.
-   2 Sections:
    -   Note input (Left Pane)
    -   AI generated content output (Right Pane)
    -   Controls Bar at the top which has some controls for the AI on the top right.
        -   Potential to add typography styling on the left hand side.

Note:

-   For my front-end, once the AI generated response is received, it is parsed and separated into an array of strings that represent _sections_ this was done with a plan intended to
-   I have created a button that inserts pre-written note information for the sake of demonstration. The AI response data is not altered or hard-coded, it will still make an API call with the text that is automatically inserted.

Back End Plan:

-
-   Have 2 endpoints minimum:
    a. POST) /generate/new
    b. POST) /generate/revision (unfinished)

Create a connection to OpenAI and pass the data into Open AI to get a response back.

Notes:

-   Within the back-end I wrote 2 api endpoints inside of the main.py
-   I am not familiar working on back-ends written in python in regard to the standards for file hierarchy and conventions at the moment. In the interest of time I have kept them in main.py however I do want to note the importance I hold in organization.
-   That being said, a test_main.py file was made with the help of AI to create back-end unit tests for the two endpoints.

## E2E:

The response from the Back-End should be sent back to the front-end and read/parsed in the server-side and passed to the client to display to the user.

## Notes:

While doing this assessment I wanted to show that I primarily have the capabilities to create the end to end minimum product for this exercise to be done.

There are design elements that are not deeply thought out, but I am anticipating that in a real work environment, we would have design direction on the front-end which would help serve to guide the different features in the application. For the UI/UX I kept it intuitive and basic - placeholder values in a text field along-side buttons with text to indicate their purpose.

### Future Improvements:

If I were to continue working on this project over a longer time period with more planning, I think I would separate it into different areas:

UI/UX: Changing the way that the textual data is presented.

-   Potentially using a library to display the data with styling and typography that the user is able to add: underline, bold, italics, url's, etc
-   Options / Filters menu that allows the user to change settings such that those settings are applied to the AI. I would pass the information in the request as a part of the jsonBody payload and then access those and implement their effects within the back-end.

Generation

-   Adding more potential prompting options that allow for different styles to be generated.
-   Adding more constraints to the generated formats to increase predictability so that the parsed text received can be read and formatted for the user reliably.

Revision

-   I would want to allow the user to revise / regenerate specific portions of the response to maximize the usability of the responses. I would also want the user to be able to add their own custom prompting. This would require extra work in prompting the revision API to try and balance the weight of the user input as well as keeping the structure of the response.
