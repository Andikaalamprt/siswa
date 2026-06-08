import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function openDb() {
  return open({
    filename: join(__dirname, 'siswa.db'),
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS siswa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kode_siswa TEXT UNIQUE NOT NULL,
      nama_siswa TEXT NOT NULL,
      alamat_siswa TEXT,
      tanggal_lahir DATE NOT NULL,
      jurusan TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}