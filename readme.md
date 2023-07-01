# Dare Drop Streaming Backend

This backend servise is intended to work with the front-end part of the Dare Drop Streaming web-app, created on terms of the Dare Drop test task.

### Base URL

The backend part of this web-app is located at render.com web service.
The base URL is indicated below:

```javascript
BASE_URL = "https://daredrop-streaming-backend.onrender.com";
```

### Endpoints

The endpoints avaliable are listed below:

The **streamers endpoint** is avaliable at the route

```javascript
"/api/auth";
```

Endpoints avaliable:  
**"/"** - POST endpoint to receive new streamer submissions from the frontend and store them in a database;  
**"/"** - GET endpoint to return all the stored streamer submissions in response to a request from the frontend;  
**"/streamerId"** - GET endpoint to return data about a specific streamer;  
**"/streamerId/vote"** - PUT endpoint to receive an upvote for a specific streamer and update their current upvote/downvote count;

### Swagger Docs

Detailed API documentation is avaliable at [this endpoint](https://daredrop-streaming-backend.onrender.com/api-docs)

```javascript
"https://daredrop-streaming-backend.onrender.com/api-docs";
```

![Swagger photo](./public/assets/readme_swagger.png)

### Technology stack

Backend part of the web-app was created using indicated tech stack:

<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="Visual Studio Code" title="Visual Studio Code" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="nodejs" title="NodeJS" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="express" title="Express" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB" /></code>
<code><img height="50" src="https://socket.io/images/logo.svg" alt="SocketIO" title="SocketIO" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="swagger" title="Swagger" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="postman" title="Postman" /></code>
