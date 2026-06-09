import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import SiswaForm from './components/SiswaForm';
import SiswaList from './components/SiswaList';
import StatsCards from './components/StatsCards';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api/siswa';

function App() {
  const [siswa, setSiswa] = useState([]);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      console.log('Data fetched:', response.data);
      setSiswa(response.data);
    } catch (error) {
      console.error('Error fetching siswa:', error);
      toast.error('Gagal mengambil data siswa. Pastikan backend berjalan di port 5000');
    } finally {
      setLoading(false);
    }
  };

  const addSiswa = async (siswaData) => {
    try {
      const response = await axios.post(API_URL, siswaData);
      setSiswa([response.data, ...siswa]);
      toast.success('Berhasil menambahkan data siswa!');
      setShowForm(false);
      fetchSiswa();
    } catch (error) {
      console.error('Error adding:', error);
      toast.error(error.response?.data?.error || 'Gagal menambahkan data');
    }
  };

  const updateSiswa = async (id, siswaData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, siswaData);
      setSiswa(siswa.map(s => s.id === id ? response.data : s));
      toast.success('Berhasil mengupdate data siswa!');
      setEditingSiswa(null);
      setShowForm(false);
      fetchSiswa();
    } catch (error) {
      console.error('Error updating:', error);
      toast.error(error.response?.data?.error || 'Gagal mengupdate data');
    }
  };

  const deleteSiswa = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success('Berhasil menghapus data siswa!');
        fetchSiswa();
      } catch (error) {
        console.error('Error deleting:', error);
        toast.error('Gagal menghapus data');
      }
    }
  };

  const handleEdit = (siswa) => {
    setEditingSiswa(siswa);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingSiswa(null);
    setShowForm(false);
  };

  // Filter siswa berdasarkan search
  const filteredSiswa = siswa.filter(s => 
    s.kode_siswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nama_siswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.jurusan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Container className="mt-4 mb-5">
        <StatsCards totalSiswa={siswa.length} />
        
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
              <h2 className="mb-0 fw-bold text-white"> Data Siswa</h2>
              <div className="d-flex gap-2">
                {!showForm && (
                  <Button 
                    variant="primary"
                    onClick={() => setShowForm(true)}
                    className="d-flex align-items-center gap-2"
                  >
                    <FiPlus /> Tambah Siswa
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
        
        {showForm && (
          <SiswaForm
            onSubmit={editingSiswa ? (data) => updateSiswa(editingSiswa.id, data) : addSiswa}
            onCancel={handleCancel}
            initialData={editingSiswa}
          />
        )}
        
        {loading ? (
          <div className="text-center py-5">
            <div className="loading-spinner mx-auto mb-3"></div>
            <p className="text-white">Memuat data...</p>
          </div>
        ) : (
          <SiswaList
            siswa={filteredSiswa}
            onEdit={handleEdit}
            onDelete={deleteSiswa}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </Container>
    </>
  );
}

export default App;