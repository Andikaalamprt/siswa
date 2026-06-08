import React from 'react';
import { Table, Button, Badge, Card } from 'react-bootstrap';

function SiswaList({ siswa, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getJurusanBadge = (jurusan) => {
    const colors = {
      'RPL': 'primary',
      'TKJ': 'success',
      'MM': 'warning',
      'BC': 'info',
      'AKL': 'danger',
      'OTKP': 'secondary'
    };
    return colors[jurusan] || 'secondary';
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">
          📊 Daftar Siswa 
          <Badge bg="secondary" className="ms-2">
            Total: {siswa.length}
          </Badge>
        </Card.Title>
        
        {siswa.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-3">📭 Belum ada data siswa</p>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => document.querySelector('.btn-primary')?.click()}
            >
              ➕ Tambah Siswa Pertama
            </Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Kode Siswa</th>
                  <th>Nama Siswa</th>
                  <th>Tanggal Lahir</th>
                  <th>Jurusan</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {siswa.map((siswa, index) => (
                  <tr key={siswa.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Badge bg="dark">{siswa.kode_siswa}</Badge>
                    </td>
                    <td>
                      <strong>{siswa.nama_siswa}</strong>
                    </td>
                    <td>{formatDate(siswa.tanggal_lahir)}</td>
                    <td>
                      <Badge bg={getJurusanBadge(siswa.jurusan)}>
                        {siswa.jurusan}
                      </Badge>
                    </td>
                    <td>{siswa.alamat_siswa || '-'}</td>
                    <td style={{ minWidth: '130px' }}>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2"
                        onClick={() => onEdit(siswa)}
                        title="Edit data"
                      >
                        ✏️
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => onDelete(siswa.id)}
                        title="Hapus data"
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default SiswaList;