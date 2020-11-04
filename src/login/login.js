import React, {useState} from 'react';
import './login.css';
import axios from "axios";
import { useHistory } from 'react-router-dom';
require('dotenv').config();

function initialState(){
  return { email: '', password: ''};
}



export default function Login () {

  const [values, setValues] = useState(initialState);
  const history = useHistory();
  const [error,setError] = useState(0)
    
  window.onload = initPage;

  async function initPage(){
    let userLogado = await sessionStorage.getItem('UserLogado')
    console.log("userLogado =>", userLogado)
    
    if(userLogado != 'null' && userLogado){
      
      return history.push('/lojapokemon');
    }
  }

  function onChange(event){
    const {value, name} = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  async function login({ user, password}){
    try{
      // const token = await axios.post('https://reqres.in/api/login', values);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, values);
      console.log('values => ', values);
      console.log('token.data => ', res.data);
      return res.data
    } catch(err){
      setError('Falha a conectar o servidor!');
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    if(values.email === undefined || values.email.length < 5 || values.email.search("@")==-1){
      setError("Preencha um email válido!");
    } else {
      const user = await login(values);
      console.log('Token de autenticação: ', user.token);
      if(user.token != undefined){
        user.password = '';
        console.log('user => ', user);
        
        sessionStorage.setItem('UserLogado', user.email);
        sessionStorage.setItem('UserTipo', user.tpUser);
        return history.push('/lojapokemon');
        
      } else {
        if(setError == 0)
        setError('Usuário não foi encontrado.');
      }
    }
    
    
    
  }

  return (
    <div className="user-login">
    <h1 className="user-login__title">Acessar a Loja</h1>

    <form autoComplete="nope" onSubmit={onSubmit}>
      <div className="user-login__form-control">
        <label htmlFor="email">E-mail</label>
        <input id="email" type="text" name="email" autoComplete="off" onChange={onChange}
            value={values.email}/>
      </div>
      <div className="user-login__form-control">
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" name="password" onChange={onChange}
            value={values.password}/>
      </div>
      {error === 0 ? null : <p style={{ color: "red" }}>{error}</p>}
      <button
        type="submit"
        theme="contained-green"
        className="user-login__submit-button"
        rounded
      >
        <p style={{fontWeight: 'bold', fontSize: 15, color: 'white', marginTop: 5}}>Entrar</p>
      </button>
    </form>
    
    <a href='/signup' style={{fontSize: 20, textAlign: 'center'}}>Cadastre-se aqui</a>
  </div>
  )
}