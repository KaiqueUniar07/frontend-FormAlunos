import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [formulario, setFormulario] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  const API_URL = 'http://localhost:8080/projeto/api/v1/aluno';

  useEffect(() => {
    buscarAlunos();
  }, []);

  const buscarAlunos = async () => {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    setAlunos(dados);
  };

  const atualizarFormulario = (e) => {
    const { name, value } = e.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formulario)
    });
    setFormulario({ nome: '', telefone: '', email: '', endereco: '' });
    buscarAlunos();
  };

  return (
    <div className="pagina-principal">
      <h1 className="titulo-principal">Cadastro de Alunos</h1>

      <form onSubmit={enviarFormulario} className="formulario-aluno">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formulario.nome}
          onChange={atualizarFormulario}
          required
          className="campo-input"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formulario.telefone}
          onChange={atualizarFormulario}
          required
          className="campo-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formulario.email}
          onChange={atualizarFormulario}
          required
          className="campo-input"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={formulario.endereco}
          onChange={atualizarFormulario}
          required
          className="campo-input"
        />
        <button type="submit" className="botao-enviar">Cadastrar Aluno</button>
      </form>

      <div className="secao-alunos">
        <h2 className="subtitulo">Alunos</h2>
        <table className="tabela-alunos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.telefone}</td>
                <td>{aluno.email}</td>
                <td>{aluno.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
