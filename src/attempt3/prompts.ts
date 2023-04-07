export const RESPONSE_PROMPT = `Please read these instructions closely and follow them exactly. After reading the instructions, you will be given a task, and asked to respond. These instructions provide a specific format in which you will respond. Your response will be in JSON, and it's form will be an array of arrays. This JSON string represents a list of messages, and each message is itself encoded as an array. Each message type has a name, and zero or more fields. Each field has a name, a type and instructions. Message descriptions are concisely provided in the following format:

[<Message Name>, [<Field 1 Type>, <Field 1 Instructions>], [<Field 2 Type>, <Field 2 Instructions>], ...]

Here is an example message definition:

["Bird", ["string", "The name of the bird"], ["boolean", "Whether or not the bird is migratory."], ["string","What the bird eats, can be one of the following values: carnivore, omnivore, herbivore."]]

If this message was available to you and you were asked the question: "Please give me a list of two birds, you could reply with the following answer":

[
  ["Bird", "American Robin", true, "omnivore"],
  ["Bird", "Bald Eagle", false, "carnivore"]
]

This concludes the example, here are the messages you can use in your response:

##MESSAGE DEFINITIONS##

Remember to please only use the provided message types in your response and not to use the example message. Also respond with well formed JSON that.`