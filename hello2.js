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
    salary(city: String): Int
}
    type Query {
        getHero(teamName: String!): [String]
        account(username:String): Account
    }
    
    `
);

// 定义查询所对应的 resolver，也就是查询对应的处理器
const root = {
  getHero: ({ teamName }) => {
    // 这里的数据 实际开发中常常用在请求数据库
    const hero = {
      三国: ["张飞", "刘备", "关羽"],
      复仇者联盟: ["钢铁侠", "美国队长", "绿巨人"],
    };
    return hero[teamName];
  },
  account: ({ username }) => {
    const name = username;
    const sex = "man";
    const age = 22;
    const department = "科学院";
    const salary = ({ city }) => {
      if (city === "北京" || city === "上海") {
        return 30000;
      } else {
        return 3000;
      }
    };
    return {
      name: name,
      sex,
      age,
      department,
      salary,
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
