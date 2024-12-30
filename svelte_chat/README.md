# svelte chat

 Version: 0.9.1

 Author  :

 date    : 2024/12/29

 update  : 2024/12/30 

***
### Summary

d1 +  workers , svelte chat

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
PUBLIC_SYSTEM_NAME = "workers21chat"

[[d1_databases]]
binding = "DB"
database_name = ""
database_id = ""
```
***
### blog 

***

