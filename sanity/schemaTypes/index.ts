// schemas/index.ts
import {type SchemaTypeDefinition} from 'sanity'
// import the default export from your upcomingEvent.ts file:
import upcomingEvent from './upcomingEvents'
import fighter_card from './fighter_card'

// Export an array of all schema types for easy import in sanity.config.ts
export const schemaTypes: SchemaTypeDefinition[] = [
  upcomingEvent,
  fighter_card

]
