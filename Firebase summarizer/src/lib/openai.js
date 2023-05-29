import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: 'org-YNDucfmZbZO9yaWvN2Ma6GUT',
  apiKey: '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',
});

export const openai = new OpenAIApi(configuration);;
