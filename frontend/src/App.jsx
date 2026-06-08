import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import SiswaForm from './components/SiswaForm';
import SiswaList from './components/SiswaList';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/siswa';

function App() {
  const [siswa, setSiswa] = useState([]);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ text: '', variant: '' });

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    try {
      const response = await axios.get(API_URL);
      setSiswa(response.data);
    } catch (error) {
      console.error('Error fetching siswa:', error);
      showMessage('Gagal mengambil data siswa', 'danger');
    }
  };

  const showMessage = (text, variant) => {
    setMessage({ text, variant });
    setTimeout(() => setMessage({ text: '', variant: '' }), 3000);
  };

  const addSiswa = async (siswaData) => {
    try {
      const response = await axios.post(API_URL, siswaData);
      setSiswa([response.data, ...siswa]);
      showMessage('Data siswa berhasil ditambahkan', 'success');
      setShowForm(false);
    } catch (error) {
      showMessage(error.response?.data?.error || 'Gagal menambahkan data', 'danger');
    }
  };

  const updateSiswa = async (id, siswaData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, siswaData);
      setSiswa(siswa.map(s => s.id === id ? response.data : s));
      showMessage('Data siswa berhasil diupdate', 'success');
      setEditingSiswa(null);
      setShowForm(false);
    } catch (error) {
      showMessage(error.response?.data?.error || 'Gagal mengupdate data', 'danger');
    }
  };

  const deleteSiswa = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSiswa(siswa.filter(s => s.id !== id));
        showMessage('Data siswa berhasil dihapus', 'success');
      } catch (error) {
        showMessage('Gagal menghapus data', 'danger');
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

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        {message.text && (
          <Alert variant={message.variant} dismissible onClose={() => setMessage({ text: '', variant: '' })}>
            {message.text}
          </Alert>
        )}
        
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>📋 Manajemen Data Siswa</h2>
              {!showForm && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  ➕ Tambah Siswa
                </button>
              )}
            </div>
            
            {showForm && (
              <SiswaForm
                onSubmit={editingSiswa ? (data) => updateSiswa(editingSiswa.id, data) : addSiswa}
                onCancel={handleCancel}
                initialData={editingSiswa}
              />
            )}
            
            <SiswaList
              siswa={siswa}
              onEdit={handleEdit}
              onDelete={deleteSiswa}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;