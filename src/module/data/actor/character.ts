import { BaseActorData } from './base'

class CharacterData extends BaseActorData<CharacterSchema> {}

/* -------------------------------------------- */

const characterSchema = {}

/* -------------------------------------------- */

type CharacterSchema = typeof characterSchema

export { CharacterData, type CharacterSchema }
