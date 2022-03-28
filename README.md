# Cannotion
A tool which automatically integrates the Canvas calander into Notion.

# Getting Started
## Initaliazing the notion database
Explains how to create the database id and token
https://developers.notion.com/docs/getting-started

In the src directory create a file called secrets.js, this is where you will store the database id and the integration token.
```
export const secret = '...';
export const database_id = '...';
```

## installing dependencies
```
npm install
```

## to run notion.js by itself
```
node ./src/notion.js
```