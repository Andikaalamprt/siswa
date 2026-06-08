
## 📁 Struktur Folder

siswa/
│
├── backend/ # Server Backend
│ ├── database.js # Konfigurasi dan koneksi database
│ ├── server.js # Main server dengan API endpoints
│ ├── siswa.db # File database SQLite (auto-generated)
│ ├── package.json # Dependencies backend
│ └── node_modules/ # Dependencies (auto-generated)
│
├── frontend/ # Client Frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx # Komponen navigation bar
│ │ │ ├── StatsCards.jsx # Komponen kartu statistik
│ │ │ ├── SiswaForm.jsx # Form tambah/edit siswa
│ │ │ └── SiswaList.jsx # Tabel daftar siswa
│ │ ├── App.js # Main component
│ │ ├── main.jsx # Entry point React
│ │ └── index.css # Global styling & animations
│ ├── index.html # HTML template
│ ├── vite.config.js # Konfigurasi Vite
│ ├── package.json # Dependencies frontend
│ └── node_modules/ # Dependencies (auto-generated)
│
├── package.json # Root package.json (optional, untuk run bersama)
├── start.bat # Script untuk Windows (run kedua server)
├── start.ps1 # Script untuk PowerShell
└── README.md # Dokumentasi project (file ini)