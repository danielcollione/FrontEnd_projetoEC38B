import React, { useState, useEffect, initPage } from "react";
import ListPokemon from "./listPokemon";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";

export default function Pokemons(props) {

  const [exibirMsg, setExibirMsg] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const [pokemons, setPokemons] = useState("");
  const [procurar, setProcurar] = useState("");
  const [usuario, setUsuario] = useState("");
  const [admin, setAdmin] = useState(false);

  const history = useHistory();
  useEffect(() => {
    initPage();
  }, []);
  window.onload = initPage;

  async function initPage(){
    let aux = isAdmin();
    await setAdmin( aux );
    return;
  }

  function setProcurarPoke(event){
    setProcurar(event.target.value);
  }

  async function getPoke(poke){
    await setPokemons(poke);
  }

  function visivel() {
    return props.visivel ? null : "hidden";
  }

  function exibirMensagem(pokemon) {
    setExibirMsg(true);
    setPokemon(pokemon);
    setTimeout(() => {
      setExibirMsg(false);
    }, 3000);
  }

  function isAdmin(){
    let userLogado = sessionStorage.getItem('UserLogado')
    let userTipo = sessionStorage.getItem('UserTipo')
    setUsuario(userLogado);
    
    if(userLogado != undefined && userTipo == '1'){
      return true;
    }else if( (userLogado == '' || userTipo == '') || (userLogado == undefined || userTipo == undefined)){
      return history.push('/login');
    }else{
      return false;
    }
  }

  function novoPokemon(){
    return history.push('/novopokemon');
  }

  function logout(){
    sessionStorage.setItem('UserLogado', null);
    sessionStorage.setItem('UserTipo', null);
    return history.push('/login');
  }

  if(admin){
    return (
      <div className={visivel()}>
        <Alert variant="warning" style={{ margin: "10px"}} show={exibirMsg}>
          <b>{pokemon}</b> adicionado com sucesso ao carrinho!
        </Alert>
        <Navbar>
          <Form inline>
            <FormControl type="text" placeholder="Procurar Pokemon" name="name" onChange={setProcurarPoke}/>
            <Button variant="primary">GO!</Button>
          </Form>
          <Button variant="success" style={{ marginLeft: '20px'}} onClick={novoPokemon}>
            Adicionar Pokemon
          </Button>
          <Button variant="warning" style={{ marginLeft: '20px'}} onClick={logout}>
            Logout
          </Button>
        </Navbar>
        <div style={{width: '100%', height: '800px' , overflowY: 'scroll', textAlign: "center"}}>
          
          <ListPokemon
            exibirMensagem={exibirMensagem}
            getPoke={pokemons}
            adicionarPokemon={props.adicionarPokemon}
          />
        </div>
        
      </div>
    );
  }else{
    return (
      <div className={visivel()}>
        <Alert variant="warning" style={{ margin: "10px"}} show={exibirMsg}>
          <b>{pokemon}</b> adicionado com sucesso ao carrinho!
        </Alert>
        <Navbar>
          <Form inline>
            <FormControl type="text" placeholder="Procurar Pokemon" />
            <Button variant="primary">GO!</Button>
          </Form>
          <Button variant="warning" style={{ marginLeft: '20px'}} onClick={logout}>
            Logout
          </Button>
        </Navbar>
        <div style={{width: '100%', height: '800px' , overflowY: 'scroll', textAlign: "center"}}>
          
        <ListPokemon
              exibirMensagem={exibirMensagem}
              getPoke={procurar}
              adicionarPokemon={props.adicionarPokemon}
            />
        </div>
        
      </div>
    );
  }

  
}

Pokemons.propTypes = {
  visivel: PropTypes.bool.isRequired,
  adicionarPokemon: PropTypes.func.isRequired,
};
