# Playwright Spellcheck

Creation of a spell check class using playwright to check the spelling of visual text on a page.

# Modules required to install

- npm install hunspell-spellchecker
- npm install dictionary-en-gb
- npx playwright install
- Or simply run an npm i (to install all dependencies)

# Running the spellcheck

This can be run in the command line via:

- npm run test

Or we can run in playwright ui using:

- npm run test:ui

# Notes about this repo:

- It can struggle to show certain visible text on some pages, utilised the document.body.innerText to do this but some text appears to be hidden and not picked up using this method. I found using the document.body.textContent method instead, grabbed a lot of unneccesary text including certain scripts which always fail spellchecks as code doesn't always follow traditional English.
- The dictionary library used is dictionary-en-gb is limited in terms of its vocabulary, therefore I have added an option to create a file and send in an array which can also be checked against to eliminate false negatives. This happens where names of businesses, people, acronyms are not considered in this dictionary library, along with some more common words. This can also be done by actively changing the dictionary file itself and adding these words to the file, but I felt it made more sense to include a separate file so that the library is not altered. As if node modules are deleted or update, this could affect any additions which were made to the dictionary file
- The spell check, eliminates punctuations (exception -> when we have apostrophes to determine possession or elimination of letters, these remain as the inclusion of this punctuation results in a valid word) and numbers from the string it takes from the body of the webpage, splits these and pushes them into a string array, which is then checked for by the hunspell-spellchecker against our given dictionary file.
