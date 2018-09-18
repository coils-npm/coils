# Coils is Base Framework like Rails.

[![npm](https://img.shields.io/npm/v/coils.svg?style=flat-square)](https://www.npmjs.com/package/coils)

## Base Components: 
- [coils-core](https://github.com/coils-npm/coils-core)
- [coils-env](https://github.com/coils-npm/coils-env)
- [coils-model](https://github.com/coils-npm/coils-model)
- [coils-controller](https://github.com/coils-npm/coils-controller)
- ...

### Install
```
npm i coils -g
```

### init project
```
coils new hello -d mysql
cd hello && npm i
node start
```

create db (sqlite skip it)
```
$ coils db:create [--env production]
```

migrate (create table)
```
coils db:migrate
```

drop db
```
$ coils db:drop [--env production]
```

### generate
```
coils generate model User username:string,email:string
coils generate controller api/v1/Users [index|show|update|delete]
coils generate seed User
```

### destroy
```
coils destroy controller api/v1/Users
```

### rollback
```
coils db:rollback
coils db:rollback:all
```

### seed
```
coils generate seed User
coils db:seed
coils db:seed:undo
coils db:seed:undo:all 
```