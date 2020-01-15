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
    if (context.options.length >= 1) {
      methods = context.options[0];
    }
    console.log("eslint-plugin-yield-return-type methods: ", methods);
    return {
      VariableDeclarator: node => {
        if (node.init && node.init.type === "YieldExpression") {
          if (
            node.init.argument.type === "CallExpression" &&
            node.init.argument.arguments.lengt > 0 &&
            methods.some(x => x === node.init.argument.arguments[0])
          ) {
            if (node.id.type === "Identifier") {
              if (node.id.typeAnnotation === undefined)
                context.report({ node, message: "TypeAnnotation is missing." });
            }
          }
        }
      }
    };
  }
};
