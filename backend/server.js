import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database(join(__dirname, 'siswa.db'));

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS siswa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kode_siswa TEXT UNIQUE NOT NULL,
    nama_siswa TEXT NOT NULL,
    alamat_siswa TEXT,
    tanggal_lahir DATE NOT NULL,
    jurusan TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Database ready');
  }
});

// Helper functions
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

const getAllQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET semua siswa (simple version)
app.get('/api/siswa', async (req, res) => {
  try {
    const siswa = await getAllQuery('SELECT * FROM siswa ORDER BY id DESC');
    res.json(siswa);
  } catch (error) {
    console.error('Error fetching:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET siswa by ID
app.get('/api/siswa/:id', async (req, res) => {
  try {
    const siswa = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM siswa WHERE id = ?', req.params.id, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    if (siswa) {
      res.json(siswa);
    } else {
      res.status(404).json({ error: 'Siswa not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST tambah siswa
app.post('/api/siswa', async (req, res) => {
  const { kode_siswa, nama_siswa, alamat_siswa, tanggal_lahir, jurusan } = req.body;
  
  if (!kode_siswa || !nama_siswa || !tanggal_lahir || !jurusan) {
    return res.status(400).json({ error: 'Kode siswa, Nama, Tanggal lahir, dan Jurusan wajib diisi' });
  }

  try {
    const result = await runQuery(
      'INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tanggal_lahir, jurusan) VALUES (?, ?, ?, ?, ?)',
      [kode_siswa, nama_siswa, alamat_siswa || '', tanggal_lahir, jurusan]
    );
    
    const newSiswa = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM siswa WHERE id = ?', result.lastID, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.status(201).json(newSiswa);
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      res.status(400).json({ error: 'Kode siswa sudah terdaftar' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT update siswa
app.put('/api/siswa/:id', async (req, res) => {
  const { kode_siswa, nama_siswa, alamat_siswa, tanggal_lahir, jurusan } = req.body;
  const { id } = req.params;

  try {
    await runQuery(
      'UPDATE siswa SET kode_siswa = ?, nama_siswa = ?, alamat_siswa = ?, tanggal_lahir = ?, jurusan = ? WHERE id = ?',
      [kode_siswa, nama_siswa, alamat_siswa || '', tanggal_lahir, jurusan, id]
    );
    
    const updatedSiswa = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM siswa WHERE id = ?', id, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json(updatedSiswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE siswa
app.delete('/api/siswa/:id', async (req, res) => {
  try {
    await runQuery('DELETE FROM siswa WHERE id = ?', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📝 Test API: http://localhost:${PORT}/api/test`);
});