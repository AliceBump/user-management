# User Management Application

This is a Single Page Web Application to manage a list of users with their associated application tokens. 
Each user should contain ID, username, password, created timestamp, and last updated timestamp. Each user 
may also contain zero or more tokens.

### Requirements
- ID should be at least 20 characters and unique
- Username should be an email and unique
- Password should be at least 8 characters long and contain at least one numeric character
- Token string should be at least 20 characters and unique

### Functionality
- Data can be stored via browser’s local storage
- User can be created, updated, and deleted
- Full user list is displayed (pagination is optional)
- Auto-generated token can be added to a user. It can also be removed. List of tokens for each user is revealed upon clicking a user’s list.

## Prerequisites

### Git

- Git [home][git-home] (download, documentation).
- Clone the repository

### Bower

- Get [Bower.io][bower-download].
- Install the tool dependencies (`bower install`).

## Steps

1. Use Git to clone the repository
2. Install the tool dependencies by running `bower install`
3. To run a local HTTP server, choose one of the following options:
    a) If you already have Python, run `python -m SimpleHTTPServer` in the app folder
    b) Run `npm install http-server -g` to install the http-server module, then run `http-server -p 8000` in the app folder
4. Open a browser and view the application at http://localhost:8000

## Contact

Irene Fung irene.ifung@gmail.com

[bower-download]: http://bower.io/
[git-home]: http://git-scm.com
[python-download]: https://www.python.org/downloads/