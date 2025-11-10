import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
const __dirname = import.meta.dirname
const initializeTestDb = () => {
 const sql = fs.readFileSync(path.resolve(__dirname, '../db.sql'), 'utf8')
 pool.query(sql, (err) => {
 if (err) {
 console.error('Error initializing test database:', err)
 } else {
 console.log('Test database initialized successfully')
 }
 })
}
export { initializeTestDb }