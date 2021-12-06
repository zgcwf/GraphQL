const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
    type Hero {
        name: String
        age: Int
        doSomething(thing: String): String
    }
    type Query {
        getSuperHero(heroName: String!): Hero
    }
`);
const root = {
  getSuperHero: ({ heroName }) => {
    // 这里的操作 实际开发中常常用在请求数据库
    const name = heroName;
    const age = 46;
    const doSomething = ({ thing }) => {
      return `I'm ${name}, I'm ${thing} now`;
    };
    return { name, age, doSomething };
  },
};
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
// 公开文件夹 使用户访问静态资源
app.use(express.static("public"));
app.listen(5555);
