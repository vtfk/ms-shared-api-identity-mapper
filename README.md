[![Build Status](https://travis-ci.com/vtfk/ms-shared-api-identity-mapper.svg?branch=master)](https://travis-ci.com/vtfk/ms-shared-api-identity-mapper)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# ms-shared-api-identity-mapper

Microservice for mapping identities across internal services

## API

### `POST /identities/upns`

Get identities for an array of upns.

```
$ curl -v http://localhost:3000/identities/upns -d @test/data/upns.json \
--header "Content-Type: application/json"
```

```JavaScript
[
  {
    upn: "dummy.test@vtfk.no",
    fnr: "12345678987",
    sam: "160703fluffy",
    upnOld: "dummy.test@t-fk.no",
    samOld: "fluffy",
    origin: "tfk",
    isStudent: true,
    isEmployee: false
  },
  {
    upn: "donny.test@vtfk.no",
    fnr: "98765432123",
    sam: "160703star",
    upnOld: "donny.test@t-fk.no",
    samOld: "star",
    origin: "vfk",
    isStudent: true,
    isEmployee: false
  }
]
```

### `POST /identities/upns/old`

Get identities for an array of old upns.

```
$ curl -v http://localhost:3000/identities/upns/old -d @test/data/upns.json \
--header "Content-Type: application/json"
```

```JavaScript
[
  {
    upn: "dummy.test@vtfk.no",
    fnr: "12345678987",
    sam: "160703fluffy",
    upnOld: "dummy.test@t-fk.no",
    samOld: "fluffy",
    origin: "tfk",
    isStudent: true,
    isEmployee: false
  },
  {
    upn: "donny.test@vtfk.no",
    fnr: "98765432123",
    sam: "160703star",
    upnOld: "donny.test@t-fk.no",
    samOld: "star",
    origin: "vfk",
    isStudent: true,
    isEmployee: false
  }
]
```

### `GET /identities/upn/:upn`

Get identities for a given upn.

```
$ curl -v http://localhost:3000/identities/upn/dummy.test@vtfk.no
```

```JavaScript
{
  upn: "dummy.test@vtfk.no",
  fnr: "12345678987",
  sam: "160703fluffy",
  upnOld: "dummy.test@t-fk.no",
  samOld: "fluffy",
  origin: "tfk",
  isStudent: true,
  isEmployee: false
}
```

### `GET /identities/upn/old/:upn`

Get identities for an old upn.

```
$ curl -v http://localhost:3000/identities/upn/old/dummy.test@t-fk.no
```

```JavaScript
{
  upn: "dummy.test@vtfk.no",
  fnr: "12345678987",
  sam: "160703fluffy",
  upnOld: "dummy.test@t-fk.no",
  samOld: "fluffy",
  origin: "tfk",
  isStudent: true,
  isEmployee: false
}
```

### `POST /identities/sams`

Get identities for a an array of samAccaountNames.

```
$ curl -v http://localhost:3000/identities/sams -d @test/data/sams.json \
--header "Content-Type: application/json"
```

```JavaScript
[
  {
    upn: "dummy.test@vtfk.no",
    fnr: "12345678987",
    sam: "160703fluffy",
    upnOld: "dummy.test@t-fk.no",
    samOld: "fluffy",
    origin: "tfk",
    isStudent: true,
    isEmployee: false
  },
  {
    upn: "donny.test@vtfk.no",
    fnr: "98765432123",
    sam: "160703star",
    upnOld: "donny.test@t-fk.no",
    samOld: "star",
    origin: "vfk",
    isStudent: true,
    isEmployee: false
  }
]
```

### `POST /identities/sams/old`

Get identities for a an array of old samAccaountNames.

```
$ curl -v http://localhost:3000/identities/sams/old -d @test/data/sams.json \
--header "Content-Type: application/json"
```

```JavaScript
[
  {
    upn: "dummy.test@vtfk.no",
    fnr: "12345678987",
    sam: "160703fluffy",
    upnOld: "dummy.test@t-fk.no",
    samOld: "fluffy",
    origin: "tfk",
    isStudent: true,
    isEmployee: false
  },
  {
    upn: "donny.test@vtfk.no",
    fnr: "98765432123",
    sam: "160703star",
    upnOld: "donny.test@t-fk.no",
    samOld: "star",
    origin: "vfk",
    isStudent: true,
    isEmployee: false
  }
]
```

### `GET /identities/sam/:sam`

Get identities for a given samAccaountName.

```
$ curl -v http://localhost:3000/identities/sam/160703fluffy
```

```JavaScript
{
  upn: "dummy.test@vtfk.no",
  fnr: "12345678987",
  sam: "160703fluffy",
  upnOld: "dummy.test@t-fk.no",
  samOld: "fluffy",
  origin: "tfk",
  isStudent: true,
  isEmployee: false
}
```

### `GET /identities/sam/old/:sam`

Get identities for an old samAccaountName.

```
$ curl -v http://localhost:3000/identities/sam/old/fluffy
```

```JavaScript
{
  upn: "dummy.test@vtfk.no",
  fnr: "12345678987",
  sam: "160703fluffy",
  upnOld: "dummy.test@t-fk.no",
  samOld: "fluffy",
  origin: "tfk",
  isStudent: true,
  isEmployee: false
}
```

### `POST /identities/fnrs`

Get identities for an array of fnrs.

```
$ curl -v http://localhost:3000/identities/fnrs -d @test/data/fnrs.json \
--header "Content-Type: application/json"
```

```JavaScript
[
  {
    upn: "dummy.test@vtfk.no",
    fnr: "12345678987",
    sam: "160703fluffy",
    upnOld: "dummy.test@t-fk.no",
    samOld: "fluffy",
    origin: "tfk",
    isStudent: true,
    isEmployee: false
  },
  {
    upn: "donny.test@vtfk.no",
    fnr: "98765432123",
    sam: "160703star",
    upnOld: "donny.test@t-fk.no",
    samOld: "star",
    origin: "vfk",
    isStudent: true,
    isEmployee: false
  }
]
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
  sam: "160703fluffy",
  upnOld: "dummy.test@t-fk.no",
  samOld: "fluffy",
  origin: "tfk",
  isStudent: true,
  isEmployee: false
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