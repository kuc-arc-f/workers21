﻿# react19

 Version: 0.9.1

 Author  :

 date    : 2024/12/23

 update  :

***
### Summary

d1 +  workers , React 19

***
* dev start
```
yarn start
```
* react build , other window

```
yarn watch
```
***
### Setting

* wrangler.toml

```
name = "workers21"
main = "src/index.ts"
compatibility_date = "2024-12-18"
node_compat = true

assets = { directory = "./public/" }

[vars]
API_KEY = "123"

[[d1_databases]]
binding = "DB"
database_name = ""
database_id = ""
```
***
### blog 

***

