# service-users
Techbricks  users CRUD service 


## Version
`0.0.1`

## Demo

[Demo](https://packages-trotter-wmdfs7yiwa-lz.a.run.app/)

## Getting started

Clone the project:

```

```

Install dependencies:
```
cd service-users && yarn install
```

## Get it up and running

In production
```
yarn start
```

In development
```
yarn dev
```

The default port is 8004 so navigate to localhost:8004

## API

GET : Returns an array of all users
```
/v1/user
```
POST: Returns an array of object of the id of new user(s) added, accepts an array of
user(s) to be created
```
/v1/user
```
GET: Returns an array of object of the user requested
```
/v1/user/:id
```
PATCH: Returns an array of object of the id of the user updated, accepts an object of
user to be updated
```
/v1/user/:id
```
DELETE: Returns an array of object of the id of the user deleted
```
/v1/user/:id
```


## Testing


Latest coverage report. 03.02.2023
```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |   96.26 |       90 |     100 |      96 |                   
build/filereader |    87.5 |      100 |     100 |    87.5 |                   
index.js        |    87.5 |      100 |     100 |    87.5 | 16                
build/parser     |   97.87 |       90 |     100 |   97.82 |                   
index.js        |   97.87 |       90 |     100 |   97.82 | 18                
filereader       |   85.71 |      100 |     100 |   85.71 |                   
index.ts        |   85.71 |      100 |     100 |   85.71 | 15                
parser           |   97.77 |       90 |     100 |   97.43 |                   
index.ts        |   97.77 |       90 |     100 |   97.43 | 21                
------------------|---------|----------|---------|---------|-------------------`
```
## Design process
