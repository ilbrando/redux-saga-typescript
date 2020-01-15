module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    schema: [
      {
        type: "array",
        items: {
          type: "string"
        }
      }
    ]
  },
  create: context => {
    let methods = ["call"];
    if (context.options.length >= 1){
      methods = context.options[0;]
    }
    console.log("eslint-yield-return-type methods: ", methods);
    return {};
  }
}