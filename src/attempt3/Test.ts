import { ParameterSpec } from "./ParameterDecorator.js"
import OutputSpec from "./OutputSpec.js"
import { Configuration, OpenAIApi } from "openai"

// Step 1: Declare the Octopus class with a couple of features
class Octopus {
  constructor(
    @ParameterSpec({ fieldType: "string", instructions: "Provide the octopus species name" })
    public species: string,
    @ParameterSpec({ fieldType: "number", instructions: "Provide the number of arms the octopus has" })
    public arms: number,
    @ParameterSpec({ fieldType: "number", instructions: "The approximate length of the octopus' lifespan" })
    public lifespan: number,
  ) {
    this.species = species;
    this.arms = arms;
    this.lifespan = lifespan;
  }
}

const OPENAI_API_KEY="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"

const openai = new OpenAIApi(new Configuration({
  apiKey: OPENAI_API_KEY
}))

// Test function
async function test() {
  // Step 2: Create an OutputSpec from the Octopus class
  const outputSpec = new OutputSpec(Octopus)

  // Step 3: Generate the instructions
  const instructions = outputSpec.getInstructions();

  // Step 4: Append a question to the instructions, asking for a list of 3 octopuses
  const question = "Please give me a list of 3 octopuses with their species names and number of arms:";
  const prompt = `${instructions}\n\n${question}`;

  console.log(prompt)
  
  // Step 5: Make a call to OpenAI with the question + instructions
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
    //maxTokens: 1000,
    //stop: ["You:"], //this needed?
  })
  let responseText = response.data.choices[0].text as string
  console.log(responseText)

  // Step 6: Pass the response back to the OutputSpec to get the Octopus objects
  //const octopuses = outputSpec.reponseToObjects(responseText);

  // Step 7: Print the objects
  //console.log(octopuses);
}

test();