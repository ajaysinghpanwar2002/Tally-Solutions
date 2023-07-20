step 1: cloning repository
step 2: installing dependencies, npm install
step 3: Connecting to database via url, update (schema.prisma and .env) 
    login to mongodb atlas create a new cluster
    connect to mongodb compass, creating a database

step 4: initializing prisma database, every time you made changes to schema 
npx prisma generate
npx prisma format

step 5 : running server, npm run dev

read this: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference