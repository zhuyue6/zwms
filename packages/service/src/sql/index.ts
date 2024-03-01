import mysql  from 'mysql'

const db = mysql.createPool({
  host: '127.0.0.1', // 表示连接某个服务器上的mysql数据库
  port: 3306,
  user: 'root', // 数据库的用户名 （默认为root）
  password: 'zywyy123456', // 数据库的密码 (默认为root)
  database: 'zmws', // 创建的本地数据库名称
})

db.query('select * from user', (err, data) => {
  if (err) return console.log(err.message); // 连接失败
  if (data.length === 0) return console.log('数据为空'); // 数据长度为0 则没有获取到数据
  // 否则获取成功，将结果返回给客户端res.send
})