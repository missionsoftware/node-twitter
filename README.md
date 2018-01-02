# node-twitter

Demo NodeJS web service showing integration with twitter.

Supports the following HTTP requests:
* `GET /:screenName` - retrieve the tweets for user :screenName
* `POST / { status: "A tweet" }` - post a tweet with the given content.

## Usage

1. Create [Twitter App](https://apps.twitter.com/)
1. Create an access token for the app.
1. Copy the app consumer key & secret and access token & secret into the corresponding environment variables:

```
    export TWITTER_CONSUMER_KEY=xxx
    export TWITTER_CONSUMER_SECRET=xxx
    export TWITTER_ACCESS_TOKEN=xxx
    export TWITTER_ACCESS_TOKEN_SECRET=xxx
```

1. Run the service:

```
    npm start
```

1. Test the GET endpoint:

```
    curl http://localhost:3000/zacaway
```

1. Test the POST endpoint:

```
    curl http://localhost:3000 --data '{"status":"hello world!"}' -H 'Content-Type: application/json'
```

## Resources
- [Twitter API](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html)
- [Express Framework](https://expressjs.com/)
