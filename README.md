



# Concept, initial phase



first, it would be look at known accounts that were blocked and reported by a trusted source. What is trust?


## Basics 
As of 3/17/2021 tiktok started allowing JSON data exports


# Setup

```js
yarn install
```

# Overview

Four steps.

1. Request user data from TikTok
2. Unzip and access blocklist
3. Transform list of usernames into URLs
4. Transform list of URLs into HTML

## Command to Extract data

This requires the tools `jq`. If you have a MacOS you can 

```sh
brew install jq
```

Starting from the ZIP you download.

```sh
unzip -p TikTok_Data_11111111.zip | jq '."App Settings".Block.BlockList'
```


If already unzipped the file.

```sh
cat user_data.json | jq '."App Settings".Block.BlockList'
```

## Building URLs from blocklist

Expecting a JSON array of format `[{'UserName':'some.username__1'},{...}]`
This is, generally, the format exported by TikTok user export data. However, if you are manually building from a `.txt` export, the expected structure if a collection / array of objects.

```sh
cat data/blocked.json | ./linkbuilder.js
```

## Building website.

Expects output from ./linkbuilder.js

```sh
cat data/blocked-links.json | ./pagebuilder.js -f empty_shell.html.template > docs/index.html
```



