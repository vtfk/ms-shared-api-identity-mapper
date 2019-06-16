# ms-shared-api-identity-mapper

Microservice for mapping identities across internal services

## API

### `GET /identities/upn/:upn`

Get identities for a given upn.

```
$ curl -v http://localhost:3000/identities/upn/dummy.test@vtfk.no
```

```JavaScript
{
  upn: "dummy.test@vtfk.no",
  fnr: "12345678987",
  username: "160703fluffy",
}
```

### `GET /identities/username/:username`

Get identities for a given username.

```
$ curl -v http://localhost:3000/identities/username/160703fluffy
```

```JavaScript
{
  upn: "dummy.test@vtfk.no",
  fnr: "12345678987",
  username: "160703fluffy",
}
```


### `GET /identities/fnr/:fnr`

Get identities for a given fnr.

```
$ curl -v http://localhost:3000/identities/fnr/dummy.12345678987
```

```JavaScript
{
  upn: "dummy.test@vtfk.no",
  fnr: "12345678987",
  username: "160703fluffy",
}
```

# Development

You'll need the [now-cli](https://zeit.co/now) installed

- clone the repo
- install dependencies
- add a `.env` file
- start the service with now-dev ```$ now dev```

.env

```
NODE_ENV=development
JWT_SECRET=your-jwt-api-secret
MONGODB_CONNECTION=connection-string-to-your-mongodb
MONGODB_COLLECTION=mongodb-collection-name
MONGODB_NAME=mongodb-database-name
PAPERTRAIL_HOST=your-papertrail-host
PAPERTRAIL_PORT=your-papertrail-post
PAPERTRAIL_HOSTNAME=your-papertrail-hostname
```

# Deploy

This service is created to run on the [ZEIT/Now](https://zeit.co/now) serverless infrastructure.

Make sure the settings in [now.json](now.json) matches your environment.

Run the deploy script.

```
$ npm run deploy
```

## License

[MIT](LICENSE)