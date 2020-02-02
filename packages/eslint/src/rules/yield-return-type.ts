import { TSESLint } from "@typescript-eslint/experimental-utils";

type MessageIds = "missing" | "incorrect";

type Options = [string[]];

const yieldReturnType: TSESLint.RuleModule<MessageIds, Options> = {
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
    ],
    docs: { description: "", category: "Best Practices", recommended: "error", url: "" },
    messages: {
      missing: `TypeAnnotation is missing and should be '{{expected}}'.`,
      incorrect: `TypeAnnotation should be '{{expected}}'.`
    }
  },
  create: context => {
    const methods = context.options.length >= 1 ? context.options[0] : ["call"];
    const sourceCode = context.getSourceCode();
    return {
      VariableDeclarator: node => {
        if (node.init && node.init.type === "YieldExpression") {
          if (node.init.argument && node.init.argument.type === "CallExpression") {
            if (node.init.argument.callee.type === "Identifier") {
              if (
                methods.some(
                  method =>
                    node.init &&
                    node.init.type === "YieldExpression" &&
                    node.init.argument &&
                    node.init.argument.type === "CallExpression" &&
                    node.init.argument.callee.type === "Identifier" &&
                    method === node.init.argument.callee.name
                )
              ) {
                if (node.init.argument.arguments.length > 0) {
                  if (
                    node.init.argument.arguments[0].type === "Identifier" ||
                    node.init.argument.arguments[0].type === "MemberExpression"
                  ) {
                    const argumentSource = sourceCode.getText(node.init.argument.arguments[0]);
                    const expected = `YieldReturn<typeof ${argumentSource}>`;
                    if (node.id.typeAnnotation === undefined) {
                      context.report({
                        node,
                        messageId: "missing",
                        data: { expected }
                      });
                      return;
                    }
                    if (node.id.typeAnnotation.type !== "TSTypeAnnotation") {
                      context.report({
                        node,
                        messageId: "missing",
                        data: { expected }
                      });
                      return;
                    }
                    const typeAnnotation = node.id.typeAnnotation.typeAnnotation;
                    if (typeAnnotation.type !== "TSTypeReference") {
                      context.report({
                        node: typeAnnotation,
                        messageId: "incorrect",
                        data: { expected }
                      });
                      return;
                    }
                    // TODO name key does not exist?
                    // if (typeAnnotation.typeName.name !== "YieldReturn") {
                    //   context.report({
                    //     node: typeAnnotation,
                    //     messageId: "incorrect",
                    //  data: {
                    //   expected;
                    // }
                    //   });
                    //   return;
                    // }
                    if (typeAnnotation.typeParameters?.type !== "TSTypeParameterInstantiation") {
                      context.report({
                        node: typeAnnotation,
                        messageId: "incorrect",
                        data: { expected }
                      });
                      return;
                    }
                    if (typeAnnotation.typeParameters.params[0].type !== "TSTypeQuery") {
                      context.report({
                        node: typeAnnotation,
                        messageId: "incorrect",
                        data: { expected }
                      });
                      return;
                    }
                    const yieldreturnSource = sourceCode.getText(typeAnnotation.typeParameters.params[0].exprName);
                    if (yieldreturnSource !== argumentSource) {
                      context.report({
                        node: typeAnnotation,
                        messageId: "incorrect",
                        data: { expected }
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

module.exports = yieldReturnType;
