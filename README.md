Sentiment Analysis
==================

To Set up
---------
You should have `Node.js`, `npm` and `MongoDB` installed.

First install dependencies:
```
npm install
```

Building the front-end is not necessary as built is already commited in 
the repo. If you still want to build:
```
npm run build
```

To Run and Test the Application
-------------------------------
Run `mongod` from the `bin` directory of your installation of MongoDB,
and set data store to point to the folder `sentimentdb`.  
On Widnows, the command might look like this:
```
"c:\program files\mongodb\server\3.4\bin\mongod.exe" --dbpath sentimentdb
```

Then populate database with example data (the script will delete old data, 
if any):
```
node src-back/db-load-data.js
```

Now, run local server:
```
node server.js
```

Open browser and navigate to `localhost:3000`.
