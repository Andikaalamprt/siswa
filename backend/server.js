import express from 'express';
import cors from 'cors';
import { initDb } from './database.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let db;

// Init database
initDb().then(database => {
  db = database;
  console.log('Database connected');
});

// GET semua siswa
app.get('/api/siswa', async (req, res) => {
  try {
    const siswa = await db.all('SELECT * FROM siswa ORDER BY id DESC');
    res.json(siswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET siswa by ID
app.get('/api/siswa/:id', async (req, res) => {
  try {
    const siswa = await db.get('SELECT * FROM siswa WHERE id = ?', req.params.id);
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
    const result = await db.run(
      'INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tanggal_lahir, jurusan) VALUES (?, ?, ?, ?, ?)',
      [kode_siswa, nama_siswa, alamat_siswa || '', tanggal_lahir, jurusan]
    );
    const newSiswa = await db.get('SELECT * FROM siswa WHERE id = ?', result.lastID);
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
    await db.run(
      'UPDATE siswa SET kode_siswa = ?, nama_siswa = ?, alamat_siswa = ?, tanggal_lahir = ?, jurusan = ? WHERE id = ?',
      [kode_siswa, nama_siswa, alamat_siswa || '', tanggal_lahir, jurusan, id]
    );
    const updatedSiswa = await db.get('SELECT * FROM siswa WHERE id = ?', id);
    res.json(updatedSiswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE siswa
app.delete('/api/siswa/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM siswa WHERE id = ?', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});