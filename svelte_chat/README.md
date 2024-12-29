# svelte chat

 Version: 0.9.1

 Author  :

 date    : 2024/12/29

 update  :

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
* authrize : USER_NAME,  PASSWORD set

```
name = "workers21"
main = "src/index.ts"
compatibility_date = "2024-12-18"
node_compat = true

assets = { directory = "./public/" }

[vars]
PUBLIC_SYSTEM_NAME = "workers21chat"
USER_ID = "1"
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

