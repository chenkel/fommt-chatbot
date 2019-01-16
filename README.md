# FoMMT Chatbot
## Overview
- Preparations
- GitHub 
- Client / Server communication
- Familiarize yourself with the code
- Pattern Matching
- Natural Language Processing (optional)
- Git basics
- What will be expected next semester
- Next week (Scrum exercise)


### Preparations
1. Install Node.js on your computer: https://nodejs.org/en/download/ 
2. Install Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
3. Sign up here to receive access to the free IDEs: https://www.jetbrains.com/student/
4. Install and activate WebStorm: https://www.jetbrains.com/webstorm/download/
5. Read the following blog post. Don’t get scared by all the code snippets: https://eloquentjavascript.net/09_regexp.html

### Github
1. Go to today's repsistory: https://github.com/chenkel/chatbot-mmt
2. [Clone the repository via WebStorm](https://www.jetbrains.com/help/webstorm/set-up-a-git-repository.html)
3. Open the project in WebStorm 

### Familiarize yourself with the code
index.html
- Only two relevant elements: ul#messages and the form in the footer
- socket.io client for sending and receiving messages to server
- Bootstrap for simple and responsive design
- Custom style (style.css) and custom javascript code (chatbot.js)

style.css
- styling for the HTML tags
- mainly custom colors and positions of elements

chatbot.js
- First section is the heart of the ChatBot where rules are defined
- Second section contains the simple core functionalities of setting a username, receiving and sending messages as 
well as updating the user interface

### Client / Server communication
Short intro on the socket paradigm (server/chat-server.js and chatbot.js)


### First steps
1. Change the username in chatbot.js in line 1. No duplicate usernames are allowed.
2. Change the simple greeting
3. Let's run it 
4. What is the problem of that simple matching?

### More advanced reactions with pattern matching (1/4)
Adapt your greeting to account for caps or lowercase greeting messages from other bots or humans

```javascript
let n // n is used to keep track of regular expressions
  // this is the basic syntax for a regular expression search
  n = lastUserMessage.search('cat') // regular
  // n = lastUserMessage.search(/cat/i);  //caps or lowercase
  // n = lastUserMessage.search(/\bcat\b/i);  //searches for cat as only a word
  // n = lastUserMessage.search(/\b(cat|cats|kitten|feline)\b/) // several different words
  if (n !== -1) {
    botMessage = 'I hate cats!'
  }
```

### Pattern Matching (2/4)
Now we want to include parts of the message from other users in our response. 
See the following code snippet and adapt it in the way you like.

```javascript
// this snippet will repeat back the results of the search
  const pattern = /\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b/
  const result = pattern.exec(lastUserMessage)
  if (result) {
    botMessage = 'I love ' + result[0]
  }
```

### Pattern Matching (3/4)
As another extension add some rules that include two or more words to be matched.
See the following code snippet and adapt it in the way you like :)

```javascript
// this will check for both dog and cat
  n = lastUserMessage.search(/(?=.*\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b).*\b(cat|cats|kitten|feline)\b/i)
  if (n !== -1) {
    botMessage = 'I like dogs, but I do not like cats'
  }
```

### Pattern Matching (4/4)
In a more concise way, we define our regular expression and give multiple possible answers that the bot can choose from.
Go wild!
```javascript
regExp(/\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b/i,
    ['Dogs are the best pets!', 'I eat hot dogs'])

  regExp(/\b(jacket|coat|cape|sweater|hoody)\b/i,
    ['Are you cold?', 'Do you want my jacket?'])

  regExp(/(?=.*\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b).*\b(cat|cats|kitten|feline)\b/i,
    ['I like dogs, but I do not like cats', '<img src="https://media.giphy.com/media/GSsTZNQjPvl1m/giphy.gif" alt="gif">'])

  // this function simplifies some of the syntax for a regular expression word search
  function regExp (input, output) {
    const result = input.exec(lastUserMessage)
    if (result) {
      // picks a random output from the array
      botMessage = output[Math.floor(Math.random() * output.length)]
    }
  }
```

### Next step (optional) 
Regular Expressions are a good first start. To reach a next level, more advanced approaches are needed. NLP (Natural 
language processing) is the logical next step.

Only for post-beginner programmers  (=^ ◡ ^=)
- [Library: compromise - Natural language processing](http://compromise.cool/)
- [Tutorial: Making a bot with compromise](https://beta.observablehq.com/@spencermountain/compromise-making-a-bot)

### Git basics
[Getting a GIT Repository](https://git-scm.com/book/en/v1/Git-Basics-Getting-a-Git-Repository), to create a new 
repository on the command line
```git
echo "# fommt-chatbot" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:chenkel/fommt-chatbot.git
git push -u origin master
```
[Recording Changes to the Repository](https://git-scm.com/book/en/v1/Git-Basics-Recording-Changes-to-the-Repository)
```git
git add .
git commit -m "my second commit"
```

[Working with Remotes](https://git-scm.com/book/en/v1/Git-Basics-Working-with-Remotes)

- Clone a repo
```
git clone git://github.com/...
```
OR 
- Add a remote if you started locally 
```
git remote add origin git@github.com:chenkel/fommt-chatbot.git
git push -u origin master
```
- Get the changes from others before starting to work:
```
git pull
```
- Always upload and merge your changes after committing:
```
git push
```
