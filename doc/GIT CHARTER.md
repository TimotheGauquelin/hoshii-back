## GIT CHARTER

The command line to commit with git is : ***git commit -m ""***

Inside quotation marks, the commit message must respect specific syntax

### ID OF THE CARD

To find the ID of the card, read the card URL and take the number after the last slash.
In the example below, the ID of the card is 16

Ex: https://trello.com/c/hcInQjUE/16-back-permettre-%C3%A0-un-admin-de-lister-les-%C3%A9preuves-faites-par-une-%C3%A9quipe

### TYPE OF THE COMMIT

To specify the type of commit. It may be one of these four code.

- <u>Feature</u> : [FEAT]

- <u>Bug fix</u> : [FIX]

- <u>Code refactoring</u> : [REFACTO]

- <u>Charter update</u> : [DOC]

### YOUR INITIAL

After the type of commit, you have to add the initials (in capital letters) of your firstname and lastname

### DESCRIPTION OF THE COMMIT

Detailed description of the commit, what was done

### Exemple

***git commit -m "[AH-01][FEAT][TG] - Create generic submit button"***