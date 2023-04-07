type BasicTypes = "boolean" | "number" | "string";

type FieldOptions = {
  fieldType: BasicTypes;
  instructions: string;
};

const fieldOptionsKey = Symbol("fieldOptions");

export function Field(options: FieldOptions) {
  return function (target: Object, propertyKey: string) {
    // Store the options for this field in a metadata map associated with the target class
    const targetPrototype = target.constructor.prototype;
    const existingOptions = targetPrototype[fieldOptionsKey] || new Map<string, FieldOptions>();
    existingOptions.set(propertyKey, options);
    targetPrototype[fieldOptionsKey] = existingOptions;
  };
}