const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

// 构建schema，这里定义查询的语句和类型
const schema = buildSchema(
  `
  type Account {
      name: String
      age: Int
      sex: String
      department: String
  }
    type Query {
        hero: String
        accountName: String
        age: Int
        account: Account
    }
    `
);

// 定义查询所对应的 resolver，也就是查询对应的处理器
const root = {
  hero: () => {
    return "I'm iron man";
  },
  accountName: () => {
    return "张三丰";
  },
  age: () => {
    return 18;
  },
  account: () => {
    return {
      name: "zgc",
      age: 22,
      sex: "男",
      department: "科学院",
    };
  },
};

const app = express();

// 将路由转发给 graphqlHTTP 处理
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(5555);
