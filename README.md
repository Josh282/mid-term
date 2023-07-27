# Tokopedia Play Clone

## Description
This project is a mid-term assignment for Fullstack track of Generasi Gigih 3.0. This project is created using Express.js, REST API, and MongoDB on the backend side. The project is an application developed for learning purposes to implement basic backend creation by cloning Tokopedia Play, which functions as a platform for selling products through live videos. In this project, live videos are replaced with videos from youtube.com. Products will be displayed on the video page.

This project using external data for populating initial database, the videos is fetched from YouTube API and the product list is fetched from [Fake Store API](https://fakestoreapi.com/)

This repository only contains the backend part for now, but it will be updated for the development of the frontend section in the future.

---

## Table of Contents


- [Description](#description)
- [Features](#features)
- [Pre-Installation Setup](#pre-installation-setup)
- [Installation](#installation)
- [Usage](#usage)
- [API Structure](#api-structure)
    - [API Endpoints](#api-endpoints)
    - [API Payloads and Response](#api-payloads--response)
- [Database Schema](#database-schema)
    - [Regarding YouTube API](#regarding-youtube-api)
    - [List of Collections](#list-of-collection)
        - [Video Collection](#video-collection)
        - [Product Collection](#product-collection)
        - [Comment Collection](#comment-collection)
- [Upcoming Feature](#upcoming-feature)

---

## Features
This project has features to perform the following:
- View list of all videos
- View a video from the list of videos
- Show list of products of related video
- Show comment of selected video
- Add comment in the video

---

## Pre-Installation Setup
As stated in the description, this project is created using Express.js, REST API, and MongoDB, before installing the required dependencies you need to already installing Node.js and MongoDB in your machine. To test the API you can use Postman or any other choices to your preference, here I provide the links to the Postman installation. You can go to this link to install Node.js, MongoDB, and Postman.

- [Node.js installation](https://nodejs.org/)
- [MongoDB installation](https://www.mongodb.com/try/download/community)
- [Postman installation](https://www.postman.com/downloads/)

---

## Installation
To install this project you need to follow this steps:


#### 1. Clone The Repository:

```bash
git clone https://github.com/Josh282/mid-term.git
```

#### 2. Install Dependencies:
Use node package manager to install the dependencies in `package.json`:
```bash
cd /mid-term
npm install
```

#### 3. Set Up Environment Variables:
- Create `.env` file in the root directory of the project.
- Add the following environment variables to the `.env` file:
```
MONGODB_URI=your-mongobd-uri
YOUTUBE_API_KEY=your-youtube-api-key
PORT=your-preferred-port (e.g., 3000)
```
`YOUTUBE_API_KEY` is needed if you want to populate the initial database using the provided code in this repository, you can refer to [Database Section](#database-schema) for more information.

## Usage
To start the application in development process use:
```bash
npm run dev
```

After that connect to the API using Postman to perform the features on your preferred PORT (default is PORT:3000).

## API Structure
The following content contains:
##### 1. [API Endpoints](#api-enpoints)
##### 2. [API Payloads & Response ](#api-payloads--response)
---

### API Endpoints
This section showed the existing API endpoints in this projects.

---

| HTTP Verbs | Endpoints | Action |
| ---------  | --------- | ------ |
| **GET** | /videos | To retrieve all videos on the system |
| **GET** | /videos/:id | To retrieve a video |
| **GET** | /videos/:id/products | To retrieve list product of a video
| **GET** | /videos/:id/comments | To retrieve comments of a video
| **POST** | /videos/:id/comments | To add comment to a video

---

### API Payloads & Response

#### GET /videos
---
Returns all videos in the system.
- **Video object**
```json
{
    "_id": "string",
    "youtubeId": "string",
    "thumbnailsURL": "string",
    "titleVideos": "string",
    "products": [{"<product_object>"},
                 {"<product_object>"},
                 {"<product_object>"},
                 {"<product_object>"}
                ]
}
```
---
- **URL Params**: None
- **Data Params**: None
- **Headers**:
    - **Content-Type**: application/json
- **Success Response**:
    - **Code**: 200
    - **Content**:
```json
{
    "videos": [
                {"<video_object>"},
                {"<video_object>"},
                {"<video_object>"},
                "..."
            ]
}
```

#### GET /videos/:id
---
Returns the specified video.
- **URL Params**: 
    - ***Required***: `id=[string]`
- **Data Params**: None
- **Headers**:
    - **Content-Type**: application/json
- **Success Response**:
    - **Code**: 200
    - **Content**: `{ <video_object> }`
- **Error Response**:
    - **Code**: 404
    - **Content**: `{ error: "Video not found" }`

#### GET /videos/:id/products
---
Returns the list of products of specified video.
- **Product object**
```json
{
    "_id": "string",
    "title": "string",
    "price": "number",
    "description": "string",
    "category": ["string"],
    "image": ["string"],
}
```
---

- **URL Params**:
    - ***Required***: `id=[string]`
- **Data Params**: None
- **Headers**:
    - **Content-Type**: application/json
- **Success Response**:
    - **Code**: 200
    - **Content**:
```json
{
    "productList": [
                {"<product_object>"},
                {"<product_object>"},
                {"<product_object>"},
                {"<product_object>"}
            ]
}
```

#### GET /videos/:id/comments
---
Returns all comment of specified video.
- **Comment object**
```json
{
    "_id": "string",
    "userName": "string",
    "commentText": "string",
    "videoId": "string",
    "createdAt": "datetime(ISO 8601)"
}
```
---

- **URL Params**:
    - ***Required***: `id=[string]`
- **Data Params**: None
- **Headers**:
    - **Content-Type**: application/json
- **Success Response**:
    - **Code**: 200
    - **Content**:
```json
{
    "comments": [
                {"<comment_object>"},
                {"<comment_object>"},
                {"<comment_object>"},
                "..."
            ]
}
```

#### POST /videos/:id/comments
---
Creates a new comment in a specified video.
- **URL Params**:
    - ***Required***: `id=[string]`
- **Data Params**:
    - ***Required***: 
```json
{
    
    "userName": "string",
    "commentText": "string"
}
```
- **Headers**:
    - **Content-Type**: application/json
- **Success Response**:
    - **Code**: 201
    - **Content**: `{ <comment_object> }`

---

## Database Schema
The following section is explaining how the collection of **Videos**, **Products**, and **Comments** used in this project. As mentioned before, the initial data for **Videos** and **Products** is populated by fetching from YouTube API and [Fake Store API](https://fakestoreapi.com/). The population process will only run for once when starting the server for the first time. The process can be found in `/src/index.js`:
```javascript
mongoose.connection.on('connected', async () => {
    console.log('Connected to MongoDB database.');
    try {
        const countVideos = await Video.countDocuments();
        const countProducts = await Product.countDocuments();
        if (countVideos === 0 && countProducts === 0) {
            const categories = ['Valorant', 'Coding', 'Comedy', 'Prank'];
            for (const category of categories) {
                await scrapeVideoFromCategories(category);
            };
            saveProducts();
            populateProductsToVideo();
            console.log('Initial data population complete.');
        } else {
            console.log('Database aleady contains data. Skipping initial data population.');
        }

    } catch (error) {
        console.error('Error populating initial data:', error.message);
        mongoose.connection.close();
    }
});
```
#### Regarding YouTube API
If you want to populate initial database using your preferred video from YouTube using the code provided, you need to signup to Google for Developers to get `YOUTUBE_API_KEY` for accessing the API. You can follow this link: [How to Get a YouTube API Key [Tutorial + Examples]](https://blog.hubspot.com/website/how-to-get-youtube-api-key) for quick tutorial on how to signup to Google for Developers and get your `YOUTUBE_API_KEY`. Or you can just donwload the premade collection that I make here: [VideoCollection](https://intip.in/midtermCollections) and import the collection to your MongoDB database.

If you want to populate the initial data by your own using the YouTube API earlier, you can adjust the `categories` and number of video that you want to fetch you can change this part in `/src/index.js` with desired category:
```javascript
const categories = ['Valorant', 'Coding', 'Comedy', 'Prank'];
```
and in `/seeders/saveVideoIds.js`, in `maxResults` value with desired number of video:
```javascript
const saveVideoIds = async (searchQuery) => {
    try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: process.env.YOUTUBE_API_KEY,
                    q: searchQuery,
                    part: 'id, snippet',
                    maxResults: 5,
                    type: 'video',
                },
                ...
```
---

### List Of Collection
Here is the list name and type of documents in the Collection used in this project:

---
#### Video Collection
The Video Collection (`/src/models/videoModel.js`) stores information about videos used in the system. Each document in the collection represents a single video entry, and it contains the fields mentioned as follows:

| Fields | Type | Information |
| ---- | ---- |----------- |
| **_id** | (ObjectID) | The unique identifier for this video |
| **youtubeId** | (String, *required*) | The unique identifier id for this video fetch from YouTube API |
| **thumbnailsURL** | (String) | The URL of the video thumbnail |
| **titleVideos** | (String) | The title of the video |
| **products** | (Array of ObjectIDs) | An array of MongoDB ObjectIDs referencing the associated products for this video from `Product` Collection

#### Product Collection
The Product Collection (`/scr/models/productModel.js`) stores information about the products used in system. Each document in the collection represents a single product entry, and it contains the field mentioned as follows:

| Fields | Type | Information |
| ------ | ---- | ----------- |
| **_id** | (ObjectID) | The unique identifier for this product |
| **title** | (String) | The title of the product |
| **price** | (Number) | The price of the product |
| **description** | (String) | A description of the product |
| **category** | (String) | The category to which the product belongs |
| **image** | (Array of Strings) | An array of image URLs or filenames representing the product's images. If no image is provided, it will default to `default_picture.jpg` |


#### Comment Collection
The Comment Collection (`/src/models/commentModel.js`) stores information about the comments made by users on videos. Each document in the collection represents a single comment entry and contains the fields mentioned as follows:

| Fields | Type | Information |
| ------ | ---- | ----------- |
| **_id** | (ObjectID) | The unique identifier for this comment |
| **userName** | (String, *required*) | The actual text content of the comment  |
| **commentText** | (String)
| **videoId** | (ObjectID, *required*) | The reference to the video to which this comment belongs. It uses the MongoDB ObjectID type and reference the `Video` Collection |
| **createdAt** | (Date) | The timestamp representing when the comment was created. It has a default value of the current date and time

---

 ## Upcoming Feature
 This project is under active development, as the timeline goes I plan to add the following features:

 - [ ] **Live Comment Feature**: The system now can't handle real-time commenting system that allows users to post and view comments without refreshing page. The implementation will be create using websocket.
 - [ ] **Search Feature**: I am planning to add seach functionality that enables users to search specific video within the application.
 - [ ] **Frontend Development**: Currently, the project only includes the backend part. I will be adding the frontend part to create the user interface.






