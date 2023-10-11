This project is a GPT 3.5 turbo powered chat interface, designed with the intent to show capability in using a vareity of technologies, such as Next JS and Firebase. For the design I have been heavily inspired by ChatGPT's UI, and I have used Material UI to bring it to life.

Features:

- Add your own API key to use
- Registration and user authentication set up using firebase
- The chat window scrolls when a new message is recieved to ensure ease of use, unless user has scrolled far enough up (in which case user is likely reading prior messages)
- Can create seperate chats

The project has little utility in the real world, as it offers no new or novel features you would like for a "GPT wrapper" app to have to be considered useful. The project is intended as a demosntration in capability of familiarty with a multitude of technologies and libraries, as well as showing a basic understanding of design principles and user experience.

Loose ends:

I don't intend to work on this project any further, but if I were to continue I would implement solutions for the following:

- Token limit; there are no guards in place to prevent a chat from exceeding the token limit for the API if it gets too big. A simple fix would likely involve simply removing the least amount of characters or messages from the message hsitory array when such an error is encountered, and resending the request to the API endpoint
