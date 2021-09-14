import React, {useEffect, useState, useCallback} from 'react';
import { Button, makeStyles} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {Link} from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root:{
      height: '100vh',
    },
    table:{
        minWidth: 700,
    },
    space: {
        margin: '0,0,10px,0'
    }    
  }));

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
 
function Home() {
const [empresas, setEmpresas] = useState([]);
 const classes = useStyles();

 useEffect(() => {
  async function loadApi(){
      const response = await api.get('origem/1/empresa');
      setEmpresas(response.data.result.data);
    }
    loadApi()

  },[])

   const handleDelete = useCallback((id) => {
    const pergunta = prompt('tem certeza que deseja excluir?')
    if(pergunta === 'sim'){
    const find = empresas.filter((empresa) => empresa.id !== id)
    api.delete(`/origem/1/empresa/${id}`);
    setEmpresas(find);
    toast.info('Empresa deletada')
    }
  }
    ,[empresas]);
   
  return (
 <div className={classes.root}> 
    <h1>Listagem de Empresas</h1>
    <Button variant="contained" color="primary" style={{marginBottom: '10px'}}><Link to="/new">Cadastrar</Link></Button>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right">Tipo</StyledTableCell>
            <StyledTableCell align="right">Documento</StyledTableCell>
            <StyledTableCell align="right">Gerar NF</StyledTableCell>
            <StyledTableCell align="right">Retem iss</StyledTableCell>
            <StyledTableCell align="right">#</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {empresas.map((empresa) =>(
            <StyledTableRow key={empresa.id}>
              <StyledTableCell component="th" scope="row">
                {empresa.nome}
              </StyledTableCell>
              <StyledTableCell align="right">{empresa.tipo_doc}</StyledTableCell>
              <StyledTableCell align="right">{empresa.documento}</StyledTableCell>
              <StyledTableCell align="right">{empresa.gerar_nf === true? 'Sim' : 'Não'}</StyledTableCell>
              <StyledTableCell align="right">{empresa.retem_iss === true? 'Sim' : 'Não'}</StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" ><Link to={`/edit/${empresa.id}`}>Editar</Link></Button>
                <Button variant="contained" type="button" onClick={() => handleDelete(empresa.id)}>Excluir</Button>
              </StyledTableCell>
            </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
 </div>
    )


}

export default Home;