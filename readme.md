## Prisma Client
1. Prisma client by default is generated into node_modules/.prisma/client, may run into compatibility issues over other machines as node_modules is not synced. Either change location of output folder, or regenerate with every new machine installation.
2. Setup:
   1. Ensure prisma-cli is installed
   2. Ensure generatore code is in schema.prisma file
   ```
    generator client {
      provider = "prisma-client-js"
    }
   ```
  3. Install Prisma client
   ```
   npm install @prisma/client
   ``` 
  4. Generate Prisma Client
   ```
   npx prisma generate
   ```
3. Will re-use single prisma client instance for now.
## Database Migration
1. Once models are in place within prisma.schema, perform database schema migration
```
npx prisma migrate dev --name init
```
1. To reset migrations
```
npx prisma migrate reset
```
## Database Seeding
1. Include 'seed' KVP in package.json
```{
  "name": "my-project",
  "version": "1.0.0",
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "devDependencies": {
    "@types/node": "^14.14.21",
    "ts-node": "^9.1.1",
    "typescript": "^4.1.3"
  }
}
```
1. Run Seed function from terminal
```
npx prisma db seed
```
1. If using JSON files for seeding, need to enable 'resolveJsonModle: true' in tsconfig.json
## Typescript testing
```
npm i -D jest @types/jest
```
1. in package.json, change 'test' script to 'jest'
2. init configuration for jest
```
npx jest --init
```
1. Via 
   1. Babel
  ```
  npm install -D babel-jest @babel/core @babel/preset-env @babel/preset-typescript
  ```
  1. Create babel.config.js in root of directory
  ```
  module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
  };
  ```
 1. ts-jest
  ```
  npm install -D ts-jest
  ```
1. Type Definitions
  ```
  npm install -D @jest/globals
  ```

## Setup BE
1. Setup Express
```
npm i express express-async-handler @types/express
```
2. Setup dotenv
```
npm i dotenv
```
3. index.ts / app.ts of root folder:
Order here matters, initialise components which are depended on first.
```
require('dotenv').config
require('./models)
require(./routers)
```

## TODO 
[] Implement seperate prisma service client for self updating functions

## P-GA
- Arrays
- 2-3 Sorting Algos
- Binary Search
- Big O Notation


## Resources
- Namaste JS
- Udemy JS DSA MasterClass by Colt Steele
- YT Mock Interviewing.io

## Job Application prep
- ** Self Introduction
- ** Ask qns
  - Interview process
    - How many rounds of interview
    - live coding?
  - Interviewer
  - Scope of Job, team
- ** Salary Range
  - Substantiate with skillsets required by Job and team fitting
  - Try to fit current pay if enquired to target pay
  - Not legally obligated to reveal salary, can redirect to know more about scope of job and team fitting
- Never disclose competing offer from competing companies
- Try to perform negotiations in order of priority:
  - F2F
  - Phone call
  - ** Should not be conducted through email or text
- Find out why they are contacting you ( to see what they want so can sell yourself better )
- Interviews should be a conversation
- Things not to ask
  - If have WLB in first meeting (Shows lack of drive, could ask about company culture)
- Technical Qns
  - Process of arriving at answer is a big part of the conversation, not just getting the answer
- Things to ask interviewer
  - How does the team approach and solve problems
  - Can ask for feedback
  - What are the key factors for someone to succeed in this role?
  - How would my role contribute to the progress / success of the team?
  - If no qns
    - can pay a compliment (Explained well & clear)
    - Particulars to drop email (Can drop email for qns in the future)
- How to make a good impression
  - Have good research into related matters , be prepared
- STAR method
  - Situation, Task, Action, 