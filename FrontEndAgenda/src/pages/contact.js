import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import {useContext, useEffect, useState} from "react";
import GlobalContext from "../Context/globalContexto";
import {Link, Navigate} from "react-router-dom";
import api from "../service/api";
import {Done, Edit, SaveAlt} from "@mui/icons-material";

const Contact =() => {

  const [user, setUser] = useContext(GlobalContext);
  const [contact, setContact] = useState([])
  const [rows, setRows] = useState([])

  const contactUser = async (id) => {
    await api.get(`contato/list/${id}`)
        .then((resposta) => resposta.data)
        .then((json) => {
            setContact(json.contatos)
        })
        .catch((error) => console.error(error))
    };

  const handleDelete = async (id) => {

    await api.delete(`contato/${id}`, {headers: {
        'Auth-Token': localStorage.getItem("token")
        }})
        .then((resposta) => resposta.data)
        .then((json) => {
            console.log(json)
            contactUser(user.id)
        })
        .catch((error) => console.error(error))
    };

  // TODO REFATORA ESSE CODIGO
  // const handleUpdate = async (id) => {
  //   await api.patch(`contato/${id}`,{headers: {
  //       'Auth-Token': localStorage.getItem("token")
  //       }})
  //       .then((resposta) => resposta.data)
  //       .then((json) => {
  //           console.log(json)
  //           // contactUser(user.id)
  //       })
  //       .catch((error) => console.error(error))
  //   };
  const columns = [
        { field: 'id', headerName: 'ID', width: 110 },
        {
            field: 'name',
            headerName: 'Nome',
            width: 170,
        },
        {
            field: 'phone',
            headerName: 'Telefone',
            width: 170,
        },
        {
            field: 'action',
            headerName: 'Ação',
            width: 220,
            type: 'actions',
            getActions: (params) => [

                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Editar"
                        style={{color: "green"}}
                        // onClick={ () => handleUpdate(params.id)}

                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        style={{color: "black"}}
                        onClick={ () => handleDelete(params.id)}

                    />,
            ],
        },
      ];

  const contactROws = () => {
    let row = [];
    contact.map(i =>  row.push({
        id: i.id,
        name: i.nome,
        phone: i.telefone
    }));
    setRows(row)
}

  useEffect(() => {
      if(user) {
          contactUser(user.id)
      }
  }, [])

    useEffect(() => {

        if(Array.isArray(contact) && contact.length > 0){
            contactROws()
        }else if(Array.isArray(contact) && contact.length < 1){
            setRows([])
        }
    }, [contact])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'flex-end', width:'90%'}}>
          <p> Editar Dados</p>
          <Link to="/   " >
            <p style={{ marginLeft: 40 }}> Sair</p>
          </Link>
      </div>

      <h1 style={{ marginTop: 18 }}> Contatos </h1>
      <div style={{ width: '54%', display:'flex', justifyContent:'flex-start' }}>
        <Button
          variant="contained"
          size="small"
          style={{ background: '#E56B6F', border: '1px solid #BC5457', width: '10%' }}
        >
          Novo +
        </Button>
      </div>

      <Box sx={{ height: 400, width: '54%', marginTop: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export default  Contact;
;
