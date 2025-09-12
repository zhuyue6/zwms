import { PrismaClient } from './generated/prisma/client.js'
const prisma = new PrismaClient();

async function testConnection() {
  try {
    // 不执行 SQL，仅测试连接是否能建立
    await prisma.$connect(); 
    console.log('数据库连接成功！');
  } catch (error) {
    console.error('连接失败详情：', error); // 打印完整错误信息（关键）
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();