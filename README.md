## Learning Languages: a full stack project
### the context here is for an user to guess the corresponding word in another language.

### Frontend (Ui):
##### React APP that guides the user. User can start taking the challenge, or can access the admin page to modify the challenge; user can log in or sign up to have its score save to database.

### Backend (Server):
##### The application is connected to a Sql online database, it can create, insert and read data from the database table, for example if the user is logging in or wants signing up, if the user is searching for a specific subject's words-pairs or creating new subject or adding more word-pairs etc.

### Database:
##### it stores the necessary informations for the applications: word-pairs, user informations. Served from backend.
***

> RELEASE 1.0.0
## How to Use:

#### The application is quite straightforward to use. Just a few notes here:
### Child Button
#### When clicking on "Child" the user will see some subjects appearing from the left. Those are the subjects available for learning. Clicking on a subject will start the challenge and the user will then have to write the corresponding  Finnish language word and press ok for the next question. If the user is logged in and the challenge is finished the user score will automatically be saved into the user records.
### Admin Button
#### When Clicking on admin, the subject table will again appear from the left. Now the User Admin can choose to delete the subjects, or, if clicking on that subject, create or delete the related word-pairs.
***
### That is all about the first release, soon to come more advanced css development, better styling, and possibly adding more languages to use for the final user (and/or switching languages)