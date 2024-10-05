import { Database } from 'bun:sqlite'

const sqlite = new Database('sqlite.db')
const query = sqlite.query('DELETE FROM movies; DROP TABLE movies;')
query.get()
