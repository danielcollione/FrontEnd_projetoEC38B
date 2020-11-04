import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
require('dotenv').config()

function initialState() {
  return { user: "", password: "" };
}

export default function SignUp() {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(0);
  const [errorCreate, setErrorCreate] = useState(0);
  const [errorPassword, setErrorWord] = useState(0);
  const [success, setSuccess] = useState(0)
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  async function signup({ user, password }) {
    try {
      const token = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, values);
      // const token = await axios.post("https://reqres.in/api/register", values);
      console.log(token);
      return token;
    } catch (err) {
      console.log("nao foi possivel cadastrar");
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    console.log(values.email);
    console.log(values.password);
    if (values.email === undefined || values.email.length < 5) {
      setError("Preencha um email válido!");
    } else if (values.password === "") {
      setErrorWord("Preencha senha para cadastrar!");
    } else {
      const token = await signup(values);
      console.log(token);
      if (token !== undefined) {
        setError('')
        setSuccess('')
        setSuccess('Usuário cadastrado com sucesso!')
        setTimeout(() => {return history.push("/login");}, 2000)
        
      } else {
        setError('')
        setSuccess('')
        setErrorCreate("Email já cadastrado!");
      }
    }
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Cadastre-se</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="text"
            name="email"
            autoComplete="off"
            onChange={onChange}
            value={values.email}
          />
        </div>
        {error === 0 ? null : <p style={{ color: "red" }}>{error}</p>}
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        {errorPassword === 0 ? null : <p style={{ color: "red" }}>{errorPassword}</p>}
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
      <a href="/login" style={{ fontSize: 20, textAlign: "center" }}>
        volte para página de Login
      </a>
    </div>
  );
}
