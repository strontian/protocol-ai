`protocolai` converts LLM responses into typed class objects that can be used by your program.

This is an early stage prototype.

## Overview ##

First, writes one or more classes for the LLM to use in its responses, using the `ParameterDecorator` provided by the library on **each constructor parameter**

Next, create a `Protocol`, passing the class(es) you created into the constructor.

The `Protocol` class has two main functions:

1. `getInstructions` provides a prompt with instructions telling the LLM how to respond in a way that can be translated back into objects. Prepend the instructions to your task request before .

2. `decodeResponse` converts a response from the LLM back into instances of the class objects provided. Returns an array with elements with a union type of the provided classes.


## Example Usage ##

In this example, we are going to ask the LLM to give us a list of Octopuses and some facts about them.

First, we create a class for the responses.

```typescript

class Octopus {
  constructor(
    @ParameterSpec({ fieldType: "string", instructions: "Provide the octopus species name" })
    public species: string,
    @ParameterSpec({ fieldType: "number", instructions: "The approximate length of the octopus' lifespan" })
    public lifespan: number,
  ) {
    this.species = species
    this.lifespan = lifespan
  }
}
```

Prepare a prompt for the LLM by combining the instructions for using the protocl with a task request:

```typescript
  const protocol = new Protocol(Octopus)
  const instructions = protocol.getInstructions()
  const question = "Please create a list of 3 octopuses."
  const prompt = `${instructions}\n\n${question}`
```

Generate a completion, and translate it back into object instances:

```typescript
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
  })
  //TypeScript will
  const octopuses: Octopus[] = outputSpec.decodeResponse(response.data.choices[0].text as string)
  console.log(octopuses)
  /*
  [
    Octopus { species: 'Graneledone boreopacifica', lifespan: 25 },
    Octopus { species: 'Hapalochlaena maculosa', lifespan: 2 },
    Octopus { species: 'Octopus vulgaris', lifespan: 5 }
  ]
  */
```

## Protocol ##

The library constraints the output of the LLM in a few ways. 

1. The LLM is instructed to return a series of messages. The format looks like this:

```json
[
  [messageType1, arg1, arg2, ...]
  [messageType1, arg1, arg2, ...]
  [messageType2, arg1, arg2, ...]
]
```

2. Only the provided message types will appear, but they can appear more than once.

3. Messages themselves can only include a few basic types: boolean, string, and number.

You can provide the LLM with further instructions about when and how messages should be returned, for example that a message should only appear once, or that some messages are mutually exclusive.


## Limitations ##

Basic field types: The current implementation only supports string, boolean, and number.

No nested classes or objects: The library does not support nesting of classes or objects within the defined class.

No built-in LLM integration: The library does not include built-in integration with a specific LLM.

No error handling: The current implementation does not include robust error handling, which means that if the LLM returns a response that does not match the expected format, the parsing process may fail without providing helpful error messages.

Unknown Impact on Response Quality: Using this format this has not been tested in a broad number of situations, so it's not yet understood what effect with will have on the LLM's performance.