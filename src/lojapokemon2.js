import React, { useState } from "react";
import MenuPokemon from "./lojaPokemon2/menuPokemon";
import ListPokemon from "./lojaPokemon2/listPokemon";
import carrinho from "./lojaPokemon2/carrinho";
import Pokemons from "./lojaPokemon2/pokemons";
import { Container, Row, Col } from "react-bootstrap";
import Carrinho from "./lojaPokemon2/carrinho";
import SectionOne from './htmlApple/sectionone';
import SectionTwo from './htmlApple/sectiontwo';
import Footer from './htmlApple/footer';

function LojaPokemon() {
  const [carrinho, setCarrinho] = useState({ pokemons: [] });
  const [exibitPokemon, setExibirPokemon] = useState(true);
  const [exibirModal, setExibirModal] = useState(true);
  const [total, setTotal] = useState("0,00");

  function adicionarPokemon(pokemon) {
    const objCarrinho = Object.assign({}, carrinho);

    let novoPokemon = true;
    objCarrinho.pokemons.forEach((prod, indice) => {
      if (prod.pokemon === pokemon) {
        objCarrinho.pokemons[indice].quantidade++;
        novoPokemon = false;
      }
    });
    if (novoPokemon) {
      objCarrinho.pokemons.push({
        pokemon: pokemon.name,
        quantidade: 1,
        preco: parseFloat(pokemon.preco).toFixed(2),
      });
    }
    setCarrinho(objCarrinho);
  }

  function handleExibirModal(total) {
    setExibirModal(true);
    setTotal(total);
  }

  return (
    <div>
      <MenuPokemon />
      <SectionOne/>
      <SectionTwo/>
      <Container fluid>
        <Row>
          <Col sm={8}>
            <Pokemons
              visivel={setExibirPokemon}
              adicionarPokemon={adicionarPokemon}
            />
          </Col>
          <Col sm={4}>
            <Carrinho
              pokemons={carrinho.pokemons}
              handleExibirModal={handleExibirModal}
            />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default LojaPokemon;