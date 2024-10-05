import * as schema from './db/schema'
import { db } from './db'

const result = await db.select().from(schema.movies)
console.log(result)
