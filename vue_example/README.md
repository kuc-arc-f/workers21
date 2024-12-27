# vue_example

 Version: 0.9.1

 Author  :

 date    : 2024/12/23

 update  :

***
### Summary

d1 + Vue + workers , example

* Gemini-2.0-flash-thinking-exp generate

***
* dev start
```
yarn start
```
* Vue build , other window

```
yarn watch
```

***
### Setting

* wrangler.toml
* auth: USER_NAME , PASSWORD set

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
### Prompt

https://gist.github.com/kuc-arc-f/436cf17e1a16a37e9d1e2a18529743c3

***

