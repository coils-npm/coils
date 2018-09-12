# Coils is Base Framework like Rails.

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
```

create db
```
$ coils db:create [--env production]
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

### migrate
```
coils db:migrate
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