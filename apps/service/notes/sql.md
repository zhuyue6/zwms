# 数据库类型
使用的是mysql数据库


# 连接
可以通过shell 和 workbench登录

shell 默认js, 可以使用 \sql 切换成sql 命令
\connect 进行连接 root@localhost

# 修改
表结构改动后，更新orm schema，并执行prisma generate 更新

# 常用命令
show databases;  查看数据库
show tables; 查看表

use 数据库/表