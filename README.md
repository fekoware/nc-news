# NC News Frontend

View and interact with projects [here](https://mynewswebapp.netlify.app/) - it may take about 5 minutes to load due to server restrictions - the budget for this project was £0! 

This repository contains the frontend of **NC News**, a news aggregation web application where users can browse, read, and interact with articles. This project is built using React, Tailwind CSS, and communicates with the NC News Backend API I created, located [here](https://github.com/fekoware/nc-news-be).

## Project Overview

NC News is a Reddit-style news application where users can:
- Browse a list of articles from different topics.
- Sort articles by votes, date, and comments.
- View individual articles with full content.
- Upvote/downvote articles and comments.
- Post comments on articles.
- Delete their own comments.

The frontend app interacts with the NC News Backend API to fetch and manipulate data. You can find the backend API here: [NC News Backend](https://github.com/fekoware/nc-news-be).

## Features

- **Article Listings**: View and sort articles by different criteria.
- **Article Details**: Read full articles and interact with comments.
- **User Interactions**: Upvote/downvote articles and comments, post comments.
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for interacting with the backend API.
- **React Router**: For routing and navigation within the app.

## Setup

To run this project locally, follow the steps below:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/fekoware/nc-news.git
    cd nc-news
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following line with the URL of your backend API:
    ```bash
    REACT_APP_API_URL=<your-backend-api-url>
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

The app will be served locally at [http://localhost:5173](http://localhost:5173).

## API

This project relies on the backend API hosted [here](https://github.com/fekoware/nc-news-be). The API endpoints provide access to articles, comments, topics, and user data. Ensure the backend is set up and running for full functionality.

Example API endpoints used in this project:
- `GET /api/articles`
- `GET /api/articles/:article_id`
- `POST /api/articles/:article_id/comments`
- `PATCH /api/articles/:article_id`
- `DELETE /api/comments/:comment_id`

For more details, visit the backend repository.

## Running the App

To view the app, navigate to [http://localhost:5173](http://localhost:5173) after starting the development server. The app is responsive and should work well on both desktop and mobile browsers.

## Contributing

Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear explanation of your changes.

## License

This project is licensed under the MIT License.
