import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

function SiswaForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tanggal_lahir: '',
    jurusan: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        kode_siswa: initialData.kode_siswa,
        nama_siswa: initialData.nama_siswa,
        alamat_siswa: initialData.alamat_siswa || '',
        tanggal_lahir: initialData.tanggal_lahir,
        jurusan: initialData.jurusan
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">
          {initialData ? '✏️ Edit Data Siswa' : '➕ Tambah Data Siswa Baru'}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Kode Siswa *</Form.Label>
                <Form.Control
                  type="text"
                  name="kode_siswa"
                  value={formData.kode_siswa}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: SIS-001"
                  pattern="[A-Za-z0-9\-]+"
                  title="Hanya huruf, angka, dan tanda hubung"
                />
                <Form.Text className="text-muted">
                  Kode unik untuk setiap siswa (contoh: SIS-001, A-001)
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Lengkap *</Form.Label>
                <Form.Control
                  type="text"
                  name="nama_siswa"
                  value={formData.nama_siswa}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama lengkap siswa"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal Lahir *</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  Format: YYYY-MM-DD
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Jurusan *</Form.Label>
                <Form.Select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Jurusan</option>
                  <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                  <option value="TKJ">Teknik Komputer dan Jaringan (TKJ)</option>
                  <option value="MM">Multimedia (MM)</option>
                  <option value="BC">Broadcast (BC)</option>
                  <option value="AKL">Akuntansi (AKL)</option>
                  <option value="OTKP">Otomatisasi Tata Kelola Perkantoran (OTKP)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as="textarea"
              name="alamat_siswa"
              value={formData.alamat_siswa}
              onChange={handleChange}
              rows={3}
              placeholder="Masukkan alamat lengkap siswa (opsional)"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {initialData ? '💾 Update Data' : '💾 Simpan Data'}
            </Button>
            <Button variant="secondary" type="button" onClick={onCancel}>
              ❌ Batal
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SiswaForm;