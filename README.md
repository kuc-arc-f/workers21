# workers21

 Version: 0.9.1

 Author  :

 date    : 2024/12/23

 update  : 2025/05/27

***
### Summary

workers + d1 , React Vue Svelte

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
### Example
* react : react example
* react_ex_auth : React auth example
* vue : vue example
* svelte : svelte  example
* svelte5: svelte5 example

***
# License

* MIT

***

