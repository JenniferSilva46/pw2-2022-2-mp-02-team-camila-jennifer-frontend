import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";


const EditUser = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h1 style={{marginTop:100}}>Editar Dados</h1>
      <form>
      <Input
          label='Nome'
          placeholder='Digite seu nome'
          type='text'
          value={name}
          onChange={setName}
        />
        <Input
          label='Email'
          placeholder='Digite seu email'
          type='text'
          value={email}
          onChange={setEmail}
        />
        <Input
          label='Senha'
          placeholder='Digite sua senha'
          type='password'
          value={password}
          onChange={setPassword}
        />
      </form>

      <Button
        title='Confirmar'
      />

    </>
  );
}

export default EditUser;