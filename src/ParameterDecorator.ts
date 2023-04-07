type BasicTypes = "boolean" | "number" | "string"

export type ParameterSpecOptions = {
  fieldType: BasicTypes
  instructions: string
}

export type ParameterSpecOptionsPlus = {
  fieldType: BasicTypes
  instructions: string
  parameterIndex: number
}

export const parameterSpecKey = Symbol("parameterSpec")

export function ParameterSpec(options: ParameterSpecOptions) {
  return function (target: Object, _: undefined, parameterIndex: number): void {
    // Store the options for this field in a metadata map associated with the target class constructor
    const targetConstructor = target.constructor
    const optionsPlus = { ...options, parameterIndex }
    const existingOptions = (targetConstructor as any)[parameterSpecKey] || []
    Array.prototype.push.apply(existingOptions, [optionsPlus]);
    (targetConstructor as any)[parameterSpecKey] = existingOptions
  }
}
