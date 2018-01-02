const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.PORT || 3000

// Obtain twitter OAuth credentials from environment variables.
const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
const TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET

// Setup common parameters for making requests to twitter.
const baseRequest = request.defaults({
    baseUrl: 'https://api.twitter.com/1.1/',
    oauth: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        token: TOKEN,
        token_secret: TOKEN_SECRET
    },
    json: true
})

// Enable middleware that parses JSON request bodies.
app.use(bodyParser.json())

// Handle request to GET /twitter_handle which will return all the tweets for
// twitter_handle.
app.get('/:screenName', (req, res) => {
    baseRequest.get({
        url: '/statuses/user_timeline.json',
        qs: {
            screen_name: req.params.screenName,
            trim_user: true,
            exclude_replies: true
        }
    }).pipe(res)
})

// Handle request to POST / with a JSON body like { status: "tweet message" }
// which will post the given status as a tweet.
app.post('/', (req, res) => {
    baseRequest.post({
        url: '/statuses/update.json',
        qs: {
            status: req.body.status
        }
    }).pipe(res)
})

// Start the server.
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


/* Potential improvements:
 *
 * - Implement error handling:
 *   - validate request parameters and/or body
 *   - handle failed requests to twitter
 * - Implement automated regression tests.
 * - Implement authentication for the service, depending on more detailed requirements.
 * - Implement logging (ideally with some monitoring system to alert for problems).
 * - Implement timelime pagination, depending on more detailed requirements.
 *   - https://developer.twitter.com/en/docs/tweets/timelines/guides/working-with-timelines
 * - Transform responses as required (maybe not all twitter response is needed).
 * - Possibly implement requesting OAuth token (rather than providing via
 *   environment variable), depending more more detailed requirements.
 *   - https://www.npmjs.com/package/request#oauth-signing
 */
