## Learning Languages: a full stack project
### the context here is for an user to guess the corresponding word in another language.

### Frontend (Ui):
##### React APP that guides the user. User can start taking the challenge, or can access the admin page to modify the challenge; user can log in or sign up to have its score save to database.

### Backend (Server):
##### The application is connected to a Sql online database, it can create, insert and read data from the database table, for example if the user is logging in or wants signing up, if the user is searching for a specific subject's words-pairs or creating new subject or adding more word-pairs etc.

### Database:
##### it stores the necessary informations for the applications: word-pairs, user informations. Served from backend.
***

### <a href=https://youtu.be/ThX6wDfCDHo>view the User experience of the app on YouTube</a>
### <a href="https://learning-language-app.herokuapp.com/">view Learning-language app in Heroku</a>
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
## Instructions when cloning
<pre><code>
npm install
npm start    port 3000
cd frontend
npm install
npm start    port 3006</code></pre>

# Important note for release 1.0.0
#### In order to work the database structure will be such that:

<pre><code>

CREATE TABLE User(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    user VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    score int
);

CREATE TABLE Subjects(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    subject_name VARCHAR(255) NOT NULL
);

CREATE Table Subjects_pairs(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    subject_id int NOT NULL,
   
    english VARCHAR(255) NOT NULL,
    finnish VARCHAR(255) NOT NULL
   
);

ALTER TABLE Subjects_pairs
ADD FOREIGN KEY (subject_id) REFERENCES Subjects(id);

ALTER TABLE `Subjects`
ADD UNIQUE(subject_name);
</code></pre>

>Release 2.0.0

## What is new:

### Advanced "cool" CSS Styling properties
### The application has a different logic because it can now use as many languages as there are relative tables set in the database. 
#### at the time being there are 3 languages in use (Finnish, English and Italian) just to show the logic and for testing purposes, but languages can be add following a certain syntax to create that particular table in DB and just adding the language inside Switch.js on line 10 
> let languages = ['english', 'finnish', 'italian', '/newlanguage/'];
#### another new feature is the ability to patch a word if it exists in another language, for example if a pair of words are firstly created in Finnish-Italian that word will appear in admin so it can be "patched" to the relative language chosen if it does not already exist.
#### in this sense we will have the same word in different languages being linked to a same foreign key (read further to see the SQL script to create the database for release 2.0.0)
#### but the same features are kept from the previous version evenn this change reflected a lot of transformation in the creation of the database and logic inside the app.
## How to Use:

#### same use a previously, only an extra feature to change an existing word into the language chosen in admin view
## <b>extra note for the final user: </b>
####  in Child view the challenge will only start if there is more than one Word-pairs available on the selected languages.
***

## Instructions when cloning 
<pre><code>
npm install
npm start    
cd frontend
npm install
npm start</code></pre>

## SQL scripts for release 2.0.0 and newest
<pre><code>
CREATE TABLE `Subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_name` (`subject_name`)
);

CREATE TABLE `Word_Pairs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `Word_Pairs_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `Subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `english` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `english` varchar(255) NOT NULL,
  `word_pairs_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `english` (`english`),
  UNIQUE KEY `word_pairs_fk` (`word_pairs_fk`),
  CONSTRAINT `english_ibfk_1` FOREIGN KEY (`word_pairs_fk`) REFERENCES `Word_Pairs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `finnish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `finnish` varchar(255) NOT NULL,
  `word_pairs_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `finnish` (`finnish`),
  UNIQUE KEY `word_pairs_fk` (`word_pairs_fk`),
  CONSTRAINT `finnish_ibfk_1` FOREIGN KEY (`word_pairs_fk`) REFERENCES `Word_Pairs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `italian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `italian` varchar(255) NOT NULL,
  `word_pairs_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `italian` (`italian`),
  UNIQUE KEY `word_pairs_fk` (`word_pairs_fk`),
  CONSTRAINT `italian_ibfk_1` FOREIGN KEY (`word_pairs_fk`) REFERENCES `Word_Pairs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
);
</code></pre>
***
# Instructions to add a new language
<code><pre>
CREATE TABLE `language_you_want_here` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language_you_want_here` varchar(255) NOT NULL,
  `word_pairs_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `language_you_want_here` (`language_you_want_here`),
  UNIQUE KEY `word_pairs_fk` (`word_pairs_fk`),
  CONSTRAINT `language_you_want_here_ibfk_1` FOREIGN KEY (`word_pairs_fk`) REFERENCES `Word_Pairs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
</pre></code>
### simple :)

# Unhandled bugs
#### The program does not have yet a log out option and does not have a way to store the user for a new session in browser.
#### The program might present some bugs in UI when patching a word (i.e: the UI is not rerendered immediately with the new content when the word is "patched").
#### The program is not well under security especially for sql queries.

##### Those above will need to be implemented in some future release; if you notice some more bugs or wants to contribute on the implementation of the app please contact me.

***
