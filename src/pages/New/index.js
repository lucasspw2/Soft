import React, { useState} from 'react';
import {Select, Container, makeStyles, TextField, FormControlLabel, Button, Radio, FormControl, FormLabel, RadioGroup, Grid, Paper} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';
//import * as yup from 'yup';

import InputMask from 'react-input-mask';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: '50px',
        width: '100%'
    },
    container: {
        display: 'flex',
        alignItems: 'center',   
    },
    checkboxs: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    endereco:{
      display: 'flex',
      flex: '3',  
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    containerBotao: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px'
    }
  }));

export default function New() {
  const classes = useStyles();
  const history = useHistory()
  const [formData, setFormData] = useState({
   nome: '',
   documento: '',
   obs: '',
  });

  const [end, setEnd] = useState({
    principal: 'nao',
    identificacao: '',
    endereco: '',
    cep: '',
    bairro: '',
    uf: '',
    complemento: '',
    numero: ''
  });
  const [endereco, setEndereco] = useState([]);  
  const [disabled, setDisabled] = useState(true);
  const [tipo_doc, setTipo_Doc] = useState('Física');
  const [gerar_nf, setGeraNf] = useState('nao');
  const [retem_iss, setRetemIss] = useState('nao');

  async function handleSubmit(event){
    event.preventDefault();
 //  let schema = yup.object().shape({
 //     nome: yup.string().required(),
 //     documento: yup.string().required().min(10).max(14),
 //     obs: yup.string()
 //   })

 // if(!(await schema.isValid(FormData))){
 //   console.log(schema.isValid(FormData));
 //  return;

 // }

      const data =  {
        empresa: {
        nome: formData.nome,
        tipo_doc,
        documento: formData.documento,
        retem_iss: retem_iss === 'sim' ? true : false,
        gerar_nf: gerar_nf === 'sim' ? true : false,
        obs: formData.obs,
        endereco
        }
      } 

      await api.post('origem/1/empresa', data);
      toast.success('Cadastro realizado com sucesso!')
      history.replace('/')
      
     
  }

  function handleInputEmpresa(event){
    const {name, value} = event.target;
    setFormData({...formData, [name]: value });
  }

  function handleInputEndereco(event){
    const {name, value} = event.target;
    setEnd({...end, [name]: value})
    
  }
   
  function addInputEnd(e) {
    if(end.identificacao === '' 
    || end.endereco === '' 
    || end.cep === '' 
    || end.bairro === '' 
    || end.uf === ''){
      toast.error('Informe os campos');
    }
    else{
      end.principal = end.principal === 'sim' ? true : false
      setEndereco([
      ...endereco,
      end
    ]);
    setEnd({principal: 'nao',
    identificacao: '',
    endereco: '',
    cep: '',
    bairro: '',
    uf: '',
    complemento: '',
    numero: ''});
    setDisabled(false);
    toast.success('Endereço adicionado com Sucesso!')
  }
  };

  return (
    <>
    <Button variant="contained" style={{marginTop: '30px', marginLeft: '70px'}}><Link to="/">Voltar</Link></Button>
    <Container>
    <h1 className={classes.title}>Cadastre sua Empresa</h1>
    <form onSubmit={handleSubmit}>
      <div className={classes.container}>
        
        <h3 style={{ marginRight: '15px'}}>Selecione o documento: </h3>
            <Select variant="filled" value={tipo_doc} onChange={ e => setTipo_Doc(e.target.value)} >
                <option value="Física">Física</option>
                <option value="Jurídica">Jurídica</option>
            </Select>
      </div>
        
        <TextField
          name="nome"
          label="Nome:"
          placeholder="Digite o nome"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleInputEmpresa}
          required 
        /> 
        
        {tipo_doc === 'Física' ? (
         
         <InputMask
            mask="999.999.999-99"
            onChange={handleInputEmpresa}
          >
           {() => <TextField

          label="CPF"
          placeholder="digite CPF"
          fullWidth
          margin="normal"
          variant="outlined"
          name="documento"
          required
          />}
          </InputMask>
        ) : (
          
          <InputMask
            mask="99.999.999/9999-99"
            onChange={handleInputEmpresa}
          >
           {() => <TextField
          label="CNPJ"
          placeholder="digite CNPJ"
          fullWidth
          margin="normal"
          variant="outlined"
          name="documento"
          required
          />}
          </InputMask>
        )
      }
        <div style={{border: '1px solid #D3D3D3' ,display: 'flex', justifyContent: 'space-around', paddingTop: '15px', paddingButton:'15px', alignItems: 'center'}}>
        
        <FormControl component="fieldset">
          <FormLabel component="legend">Gera NF:</FormLabel>
             <RadioGroup aria-label="gender" name="gerar_nf" value={gerar_nf} onChange={e => setGeraNf(e.target.value)}>
                 <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                 <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Retem Iss:</FormLabel>
             <RadioGroup aria-label="gender" name="retem_iss" value={retem_iss} onChange={e => setRetemIss(e.target.value)}>
                 <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                 <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
        </FormControl>
      </div>
     
      <TextField
          label="Observação"
          placeholder="digite alguma observação"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleInputEmpresa}
          name="obs"
        />
        
          <div >
          <h3 style={{marginTop: '30px'}}>Endereço</h3>
          <div style={{display: 'flex'}}>
          <TextField
          style={{flex: '3'}}
          label="Identificação"
          placeholder="endereço comercial/ residencial"
          margin="normal"
          variant="outlined"
          onChange={handleInputEndereco}
          name="identificacao"
          value={end.identificacao}
          />

          <TextField
          style={{flex: '5'}}
          label="Endereco"
          placeholder="Digite seu endereço"
          margin="normal"
          variant="outlined"
          onChange={handleInputEndereco}
          name="endereco"
          value={end.endereco}
          
        />
        <TextField
        className={classes.endereco}

          label="Numero"
          placeholder="digite o numero do endereço"
          margin="normal"
          variant="outlined"
          onChange={handleInputEndereco}
          name="numero" 
          value={end.numero}
        />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
         <TextField
         style={{flex: '1'}}
          label="Bairro"
          placeholder="digite o numero do endereço"
          margin="normal"
          variant="outlined"
          name="bairro"
          onChange={handleInputEndereco}
          value={end.bairro}
        />
       
         <TextField
         style={{flex: '1'}}
          label="Estado"
          placeholder="digite o estado"
          margin="normal"
          variant="outlined"
          name="uf"
          onChange={handleInputEndereco}
          value={end.uf}

        />
        </div>
        <div style={{display:'flex', alignItems: 'center'}}>
        <InputMask
            mask="99.999-999"
            onChange={handleInputEndereco}
            value={end.cep}
          >
         {() => <TextField
         style={{flex: '3'}}
          label="Cep"
          placeholder="digite o cep"
          margin="normal"
          variant="outlined"
          name="cep" 
        />}
        </InputMask>

         <TextField
         style={{flex: '3'}}
          label="Complemento"
          placeholder="complemento"
          margin="normal"
          variant="outlined"
          onChange={handleInputEndereco}
          name="complemento"
          value={end.complemento}
        />
        </div>
        </div>
       
        
          <div className={classes.containerBotao}>
          <FormControl component="fieldset">
          <FormLabel component="legend">Endereço principal:</FormLabel>
             <RadioGroup aria-label="gender" name="principal" value={end.principal} onChange={handleInputEndereco}>
                 <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                 <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
        </FormControl>
        
        <Button variant="contained" type="button" style={{padding: '20px'}} onClick={addInputEnd}>adicionar Endereço</Button>
        </div>
        
        {endereco.map((end, index) => (        
        <> 
        <h4>Endereço:{ end.principal === true ? 'Principal' : ++index }</h4>
        <Grid container spacing={2} key={index} >
        <Grid item xs={6} sm={6}  >
          <Paper  className={classes.paper}>identificacao: {end.identificacao}</Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper className={classes.paper}>endereco: {end.endereco}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>numero: {end.numero}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>bairro: {end.bairro}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Cep: {end.cep}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Uf: {end.uf}</Paper>
        </Grid>
      </Grid>
        </>
       ))}
        
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button  disabled={disabled} type="submit" style={{height: '70px', marginTop: '10px', background: 'grey', color: 'white'}}>Cadastrar</Button>
        </div>
        
        </form>   

      
        
                

    </Container>
   </>
 );
}


 