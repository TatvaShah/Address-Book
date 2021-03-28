# Address Book #

This application displays the list of persons from the address book. The user would be able to select a person from the list and check out the details such as phone number and the email. There will be a back button from where a user can go back to the listing.

### Given more time it could have following features: ###
 * Feature from where a user can dial the phone number or email the person by clicking on the respective icons/details on the user detail screen. 
 * Feature from where a user can edit the name/phone number/email from the detail screen.
 * Feature to Add more persons to the list on the listing screen.
 * Feature to Delete one or more persons from the list on the listing screen.

### Given more time I could have included following this to make it robust: ###
 * I would have used styled components.
 * Could have converted it to Progressive Web Application.

### Prerequisites ###

```
- Requires node version 12.8.1 or greater
- Requires npm version: 6.10.3 or greater
```

### Installing ###

``` bash
# clone


# install dependencies
$ npm install

# copy .env.example and put your server api in it (API_URL=https://randomuser.me/api/)
cp .env.example .env

# serve with hot reload at localhost:3000
$ npm run start

# build for production: produces static assets
$ npm run build

```

### Running the tests ###

``` bash

# run the tests: produces test coverage reports under the test-coverage folder
$ npm run test

```
### Deployment ###


``` bash

# run deployment on netlify server
Add project repo using bitbucket, github or gitlab 

Set environment variables from .env file

or
# run build in your local machine with command
$ npm run build

Drag your build folder to the netlify sites and it will start deploying

```