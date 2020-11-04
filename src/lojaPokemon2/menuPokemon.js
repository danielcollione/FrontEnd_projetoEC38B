import React, {useState, useEffect} from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, 
} from '@fortawesome/free-solid-svg-icons';

function MenuPokemon() {

  return (
    <Navbar fixed="top" bg="primary" variant="dark">
    <Navbar.Brand href="/">Loja Pokemon</Navbar.Brand>
    <Nav className="">
      <Nav.Link style={{color: '#C0C0C0'}} disabled>Encontre seu Pokemon tipo Água favorito.</Nav.Link>
    </Nav>
  </Navbar>
  );
}

export default MenuPokemon;