# Gpt Api

A free psuedo wrapper for the chat gpt api
Created with playwright and express

## GET Routes

### /chat
**Send a message to chat gpt**

Query
```
/chat?message="Hello World!"
```
Reponse
```json
{
  "reponse": "message"
}
```


### /newchat
**Creates a new conversation with gpt**

Query
```
/newchat
```
Reponse
```json
{
  "success": boolean
}
