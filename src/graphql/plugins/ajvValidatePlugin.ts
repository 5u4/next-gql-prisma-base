import { ValidateFunction } from "ajv";
import { UserInputError } from "apollo-server-micro";
import { plugin } from "nexus";
import { NexusPlugin } from "nexus/dist/plugin";
import { printedGenTyping, printedGenTypingImport } from "nexus/dist/utils";

export type ValidationSchema<ArgsType> = ValidateFunction<{
  [ArgName in keyof ArgsType]: ArgsType[ArgName];
}>;

const AjvValidatePluginImport = printedGenTypingImport({
  module: "~/graphql/plugins/ajvValidatePlugin",
  bindings: ["ValidationSchema"],
});

const fieldDefTypes = printedGenTyping({
  optional: true,
  name: "validate",
  description: "Ajv validation function",
  type: "ValidationSchema<NexusGenArgTypes[TypeName][FieldName]>",
  imports: [AjvValidatePluginImport],
});

export function ajvValidatePlugin(): NexusPlugin {
  return plugin({
    name: "AjvValidatePlugin",
    description: "Validate input args with ajv validation function",
    fieldDefTypes,
    onCreateFieldResolver: config => {
      const validate: ValidateFunction | undefined =
        config.fieldConfig.extensions?.nexus?.config.ajvValidate;

      if (!validate) return;

      return async (root, args, ctx, info, next) => {
        const isValid = validate(args);
        if (!isValid) {
          const errors = validate.errors!;
          throw new UserInputError("Invalid args field", { errors });
        }

        return plugin.completeValue(undefined, () => next(root, args as any, ctx, info));
      };
    },
  });
}
