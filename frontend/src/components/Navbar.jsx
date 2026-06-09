import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

function NavBar() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
            <FaGraduationCap size={30} />
            <div>
              <span className="fw-bold fs-4">Data</span>
              <span className="text-primary fw-bold fs-4"> Siswa</span>
              <p className="mb-0 small text-muted">Data Siswa</p>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="ms-auto">
              <div className="text-white-50 small">
                <span className="me-2">UJI KOMPETENSI</span>
                <span>@Tama 2026</span>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default NavBar;