import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, Button, Modal, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister } from "@fortawesome/free-solid-svg-icons";
import ItensCarrinho from "./itensCarrinho";
import squirtle from '../imagens/6.png'

export default function Carrinho(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function calcularTotal() {
    if (props.pokemons.length === 0) {
      return "0,00";
    }
    let total = 0;
    props.pokemons.forEach((pokemons) => {
      let preco = pokemons.preco.replace(",", ".").replace("R$ ", "");
      total += parseFloat(preco) * pokemons.quantidade;
    });
    return total.toFixed(2).toString().replace(".", ",");
  }

  function removerPokemon(){
     const index = props.pokemons;
     index.splice(index);
     handleClose()
  }

  return (
    <div style={{ 
        padding: 30,
        marginTop: 50, 
        fontStyle: 'italic', 
        borderWidth: 800, 
        display: 'flex', 
        flexDirection: 'column',
      }}>
      <h1 style={{ color: "#808080", fontWeight: 'bold'}}><FontAwesomeIcon icon={faCashRegister}/> Carrinho</h1>
      <span>
        <ItensCarrinho pokemons={props.pokemons} />
      </span>
      <ListGroup variant="flush">
        <ListGroup.Item><p style={{fontStyle: 'normal', fontWeight: 'bold', fontSize: 36}}>Total: R$ {calcularTotal()}</p></ListGroup.Item>
      </ListGroup>
      <span>
        <Button onClick={handleShow} variant="warning" size="lg" style={{fontWeight: 'bold'}}>
          Finalizar Compra
        </Button>
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>OBRIGADO!!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>
        <Image style={{marginTop: 50}} roundedCircle src={squirtle}/>
        </Modal.Body>
        <Modal.Body style={{ fontWeight: "bold" }}>
          Você ganhará R${calcularTotal()} de volta se finalizar sua compra.        
        </Modal.Body>
        <Modal.Footer>        
        <Button variant="warning" onClick={() => {removerPokemon()}} style={{fontWeight: 'bold'}}>
            Finalizar Compra
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

Carrinho.propTypes = {
  pokemons: PropTypes.array.isRequired,
  handleExibirModal: PropTypes.func.isRequired,
};
