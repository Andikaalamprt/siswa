import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#">
          🎓 Aplikasi CRUD Data Siswa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto text-white">
            <small>Sistem Informasi Manajemen Siswa</small>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;