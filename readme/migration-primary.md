http://docs.sequelizejs.com/manual/tutorial/migrations.html
安装 sequelize-cli
```
$ npm install sequelize-cli -D
```

安装sequelize
```
npm install --save sequelize
# And one of the following:
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save pg pg-hstore
$ npm install --save tedious // MSSQL
```
helper
```
sequelize help
```

init
```
$ sequelize init
```

create db
```
$ sequelize db:create [--env production]
```
drop
```
$ sequelize db:drop [--env production]
```
create model
```
sequelize model:generate --name User --attributes username:string,email:string --underscored
sequelize model:generate --name Wallet22 --attributes user_id:integer,amount:decimal --underscored
```

run migrate
```
sequelize db:migrate
```
rollback
```
sequelize db:migrate:undo
sequelize db:migrate:undo:all
sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```
seed
```
sequelize seed:generate --name demo-user
```
run seed
```
sequelize db:seed:all
```
rollback run seed
```
sequelize db:seed:undo
sequelize db:seed:undo:all
```

# Model
- [Data types](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types)
- [Validations](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations)
- [Config](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration)


# Sequelize使用相关文档
- http://docs.sequelizejs.com/
- https://segmentfault.com/a/1190000003987871#articleHeader17