import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export const getRandomUserName = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals]
})
