Well this was short lived, chat gpt just redid their whole ui and added some bot detection.  
Not sure if im ever going to update this but keeping it as an archive for now  

# Gpt Api

A pseudo API for GPT-3 created using typescript.  
Uses `playwright` to interact with the gpt and `express` to serve the api.  

<br>

## Install
```
pnpm install
```

<br>

## Setup
Rename `.env.example` to `.env` and fill out the appropriate fields

<br>

## Run the api
```
pnpm run dev
```

<br>

# Routes
Endpoints to interact with gpt
<br>
<br>
## Send a message to chat gpt

### Request
`GET /chat`
```
/chat?message="Hello World!"
```
### Reponse
```json
{
  "reponse": "message"
}
```

<br>

## Create a new conversation with gpt

### Request
`GET /newchat`
```
/newchat
```
### Reponse
```json
{
  "success": "true / false"
}
```
