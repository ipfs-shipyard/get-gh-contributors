# get-gh-contributors
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fipfs%2Fget-gh-contributors.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fipfs%2Fget-gh-contributors?ref=badge_shield)


> Fetch and serve our users and contributors data from github

## Install

```sh
> npm install
```

## Usage

```sh
> node src/fetch.js
# will create a folder named data
```

## API

```
> npm start
# starts an API on port 9090 by default (change with `PORT=<somePortNumber> npm start`)
```

### Endpoints

##### `/contributors?photo=<bool>&url=<bool>&username<bool>&org=<nameOfTheorg>&page=<number>`

Returns a JSON blob containing the information about the users for a certain org.

Defaults:

- photo: true
- url: true
- username: true
- org: `all`. Other options: `ipld`, `multiformats`, `ipfs`, `libp2p`, `orbitdb`.
- page: pagination, sends arrays of 100 contributors at a time, if no value is passed, all of them are sent.

## Deploy

Make sure to have the dokku endpoint as one of your git remote

```sh
> git remote -v
deploy  dokku@cloud.ipfs.team:contributors (fetch)
deploy  dokku@cloud.ipfs.team:contributors (push)
origin  git@github.com:ipfs/get-gh-contributors.git (fetch)
origin  git@github.com:ipfs/get-gh-contributors.git (push)
```


## Contribute

Contributions welcome. Please check out [the issues](https://github.com/ipfs/get-gh-contributors/issues).

Check out our [contributing document](https://github.com/ipfs/community/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPFS are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT](LICENSE) © 2017 Protocol Labs Inc.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fipfs%2Fget-gh-contributors.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fipfs%2Fget-gh-contributors?ref=badge_large)