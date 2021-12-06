const express = require("express");
const { graphqlHTTP } = require("express-graphql");

//定义类型
const graphql = require("graphql"); // 需要引入
const HeroType = new graphql.GraphQLObjectType({
  name: "Hero",
  fields: {
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
  },
});
// 定义查询方法
const QueryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    // 一个个查询方法
    getSuperHero: {
      type: HeroType,
      args: {
        heroName: { type: graphql.GraphQLString },
      },
      // 方法实现 查询的处理函数.
      resolve: function (_, { heroName }) {
        const name = heroName;
        const age = 18;
        return { name, age };
      },
    },
  },
});
// step3 构造 schema
const schema = new graphql.GraphQLSchema({ query: QueryType });
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
// 公开文件夹 使用户访问静态资源
app.use(express.static("public"));
app.listen(5555);
