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
    const sourceCode = context.getSourceCode();
    return {
      VariableDeclarator: node => {
        if (node.init && node.init.type === "YieldExpression") {
          if (node.init.argument.type === "CallExpression") {
            if (node.init.argument.callee.type === "Identifier") {
              if (methods.some(x => x === node.init.argument.callee.name)) {
                if (node.init.argument.arguments.length > 0) {
                  if (
                    node.init.argument.arguments[0].type === "Identifier" ||
                    node.init.argument.arguments[0].type === "MemberExpression"
                  ) {
                    const argumentSource = sourceCode.getText(node.init.argument.arguments[0]);
                    const expected = `YieldReturn<typeof ${argumentSource}`;
                    if (node.id.typeAnnotation === undefined) {
                      context.report({
                        node,
                        message: `TypeAnnotation is missing and should be '${expected}'.`
                      });
                      return;
                    }
                    if (node.id.typeAnnotation.type !== "TSTypeAnnotation") {
                      context.report({
                        node,
                        message: `TypeAnnotation is missing and should be '${expected}'.`
                      });
                      return;
                    }
                    const typeAnnotation = node.id.typeAnnotation.typeAnnotation;
                    if (typeAnnotation.type !== "TSTypeReference") {
                      context.report({
                        node: typeAnnotation,
                        message: `TypeAnnotation should be '${expected}'.`
                      });
                      return;
                    }
                    if (typeAnnotation.typeName.name !== "YieldReturn") {
                      context.report({
                        node: typeAnnotation,
                        message: `TypeAnnotation should be '${expected}'.`
                      });
                      return;
                    }
                    if (typeAnnotation.typeParameters.type !== "TSTypeParameterInstantiation") {
                      context.report({
                        node: typeAnnotation,
                        message: `TypeAnnotation should be '${expected}'.`
                      });
                      return;
                    }
                    if (typeAnnotation.typeParameters.params[0].type !== "TSTypeQuery") {
                      context.report({
                        node: typeAnnotation,
                        message: `TypeAnnotation should be '${expected}'.`
                      });
                      return;
                    }
                    const yieldreturnSource = sourceCode.getText(typeAnnotation.typeParameters.params[0].exprName);
                    if (yieldreturnSource !== argumentSource) {
                      context.report({
                        node: typeAnnotation,
                        message: `TypeAnnotation should be '${expected}'.`
                      });
                      return;
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }
};
