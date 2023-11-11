# Gpt Api

A pseudo API for GPT-3 created using typescript.  
Uses `playwright` to interact with the gpt and `express` to serve the api.  

## Install
```
pnpm install
```


## Setup
Rename `.env.example` to `.env` and fill out the appropriate fields

## Run the api
```
pnpm run dev
```


# Routes
Endpoints to interact with gpt

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
