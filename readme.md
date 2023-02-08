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
2. Run Seed function from terminal
```
npx prisma db seed
```
## Typescript testing
```
npm i --include=dev jest @types/jest
```
1. in package.json, change 'test' script to 'jest'
2. init configuration for jest
```
npx jest --init
```
3. 