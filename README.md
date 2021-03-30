



# Concept, initial phase



first, it would be look at known accounts that were blocked and reported by a trusted source. What is trust?


## Basics 
As of 3/17/2021 tiktok started allowing JSON data exports




## Command to Extract data

This requires the tools `jq`. If you have a MacOS you can 

```sh
brew install jq
```

Starting from the ZIP you download.

```sh
unzip -p TikTok_Data_1616022525.zip | jq '."App Settings".Block.BlockList'
```


If already unzipped the file.

```sh
cat user_data.json | jq '."App Settings".Block.BlockList'
```