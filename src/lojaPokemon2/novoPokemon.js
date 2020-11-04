import React, { useState, useEffect } from "react";
import "../login/login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function initialState() {
  return { name: "", preco: "" };
}

export default function NovoPokemon() {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(0);
  const [errorCreate, setErrorCreate] = useState(0);
  const [errorPoke, setErrorPoke] = useState(0);
  const [success, setSuccess] = useState(0)
  const history = useHistory();

  useEffect(() => {
    isAdmin();
  }, []);

  window.onload = initPage;

  async function initPage(){
    let aux = isAdmin();
    return;
  }

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function isAdmin(){
    let userLogado = sessionStorage.getItem('UserLogado')
    let userTipo = sessionStorage.getItem('UserTipo')
    
    if(userLogado != undefined && userTipo == '1'){
      return true;
    }else if( (userLogado == '' || userTipo == '') || (userLogado == undefined || userTipo == undefined)){
      return history.push('/login');
    }else{
      return false;
    }
  }

  async function cadastrarPokemon({ name, preco }) {
    try {
      const res = await axios.post("http://localhost:4200/novoPokemon", values);
      // const token = await axios.post("https://reqres.in/api/register", values);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("nao foi possivel cadastrar");
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    console.log(values.name);
    console.log(values.preco);
    if (values.name === undefined || values.preco === undefined) {
      setError("Preencha algo valido");
    } else if (values.name === "" || values.preco === "") {
      setErrorPoke("Preencha algo valido!");
    } else {
      const res = await cadastrarPokemon(values);
      console.log(res);
      if (res == 0) {
        setError('')
        setSuccess('')
        setSuccess('Pokemon cadastrado com sucesso!')
        setTimeout(() => {return history.push("/lojapokemon");}, 2000)
        
      } else {
        setError('')
        setSuccess('')
        setErrorCreate("Não foi possivel cadastrar o Pokemon!");
      }
    }
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Novo Pokemon</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="off"
            onChange={onChange}
            value={values.name}
          />
        </div>
        {error === 0 ? null : <p style={{ color: "red" }}>{error}</p>}
        <div className="user-login__form-control">
          <label htmlFor="preco">Valor</label>
          <input
            id="preco"
            type="number"
            step="0.01"
            min='0'
            name="preco"
            onChange={onChange}
            value={values.preco}
          />
        </div>
        {errorPoke === 0 ? null : <p style={{ color: "red" }}>{errorPoke}</p>}
        {errorCreate === 0 ? null : <p style={{ color: "red" }}>{errorCreate}</p>}
        {success === 0 ? null : <p style={{ color: "green" }}>{success}</p>}
        <button
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "white",
              marginTop: 5,
            }}
          >
            Cadastrar
          </p>
        </button>
      </form>
      <a href="/lojapokemon" style={{ fontSize: 20, textAlign: "center" }}>
        volte para loja
      </a>
    </div>
  );
}
