const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(
  `
  #输入类型
  input AccountInput {
    name: String
    age: Int
    sex: String
    department: String
  }
   #查询类型
   type Account {
     name: String
     age: Int
     sex: String
     department: String
  }
   type Mutation {
     createAccount(oninput: AccountInput): Account
     updateAccount(id: ID!, oninput: AccountInput): Account
   }
   type Query {
     account: [Account]
   }
  `
);
// 模拟数据库
const fakeDb = {};

const root = {
  // 增加
  createAccount({ oninput }) {
    fakeDb[oninput.name] = oninput;
    return fakeDb[oninput.name];
  },
  updateAccount({ id, oninput }) {
    // 修改
    const updateAccount = Object.assign({}, fakeDb[id], oninput);
    fakeDb[id] = updateAccount;
    return updateAccount;
  },
  // 查询
  account() {
    let arr = [];
    for (const key in fakeDb) {
      arr.push(fakeDb[key]);
    }
    return arr;
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
