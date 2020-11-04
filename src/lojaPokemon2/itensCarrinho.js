import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import triste from '../imagens/2.png';
import poke from '../imagens/3.png';

export default function ItensCarrinho(props) {
  function render() {
    // carrinho vazio
    if (props.pokemons.length === 0) {
      return (
        <NavDropdown.Item disabled>
          
          
          <Image roundedCircle src={triste}/>
          
          <br/>  
          Carrinho Vazio...        
        </NavDropdown.Item>
      );
    }
    // listagem dos Produtos
    const itens = props.pokemons.map(pokemons =>
      <NavDropdown.Item disabled key={pokemons.pokemon}>
        <Image src={poke}/> {pokemons.pokemon} - {pokemons.quantidade} x R${pokemons.preco}
      </NavDropdown.Item>
    );
    return itens;
  }

  return render();
}

ItensCarrinho.propTypes = {
  pokemons: PropTypes.array.isRequired
}
