﻿# svelte_example

 Version: 0.9.1

 Author  :

 date    : 2024/12/25

 update  :

***
### Summary

d1 +  workers , svelte example

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
* authrize : USER_NAME,  PASSWORD set

```
name = "workers21"
main = "src/index.ts"
compatibility_date = "2024-12-18"
node_compat = true

assets = { directory = "./public/" }

[vars]
USER_NAME = ""
PASSWORD = ""


[[d1_databases]]
binding = "DB"
database_name = ""
database_id = ""
```
***
### blog 

***

