import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Select, Container, makeStyles, TextField, FormControlLabel, Button, Radio, FormControl, FormLabel, RadioGroup, Grid, Paper} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify'
import InputMask from 'react-input-mask';


const useStyles = makeStyles((theme) => ({
    
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(3),
      width: '100%',
    },
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

  }));



export default function New() {
 const classes = useStyles();
 const {id} = useParams();
 const history = useHistory();
 const [formData, setFormData] = useState({
   nome: '',
   documento: '',
   obs: '',
  });

  const [endereco, setEndereco] = useState([]);

 
 const [tipo_doc, setTipo_Doc] = useState('');
 const [gerar_nf, setGeraNf] = useState('');
 const [retem_iss, setRetemIss] = useState('');
 

  useEffect(() => {

    async function loadApi(){
      const response = await api.get(`/origem/1/empresa/${id}`);
      const {data} = response;
      
      
      setFormData({ nome: data.result[0].nome,
      documento: data.result[0].documento,
      obs: data.result[0].obs});
      //console.log(data.result[0].endereco[0].id);
      setEndereco(
        data.result[0].endereco
      );
      

      setTipo_Doc(data.result[0].tipo_doc);
      setGeraNf(data.result[0].gerar_nf === true ? 'sim' : 'nao');
      setRetemIss(data.result[0].retem_iss === true ? 'sim' : 'nao');

    }

  loadApi()



  }, [id])





  async function handleSubmit(event){
    event.preventDefault();
  const empresa = {
  id: id,
  nome: formData.nome,
  tipo_doc,
  documento: formData.documento,
  retem_iss: retem_iss === 'sim' ? true : false,
  gerar_nf: gerar_nf === 'sim' ? true : false,
  obs: formData.obs,
  endereco: endereco,
  };

 
 try{
  await api.put('origem/1/empresa', {empresa});
  history.replace('/');
  toast.success('Empresa editada com sucesso!')
 }catch{

  }
  
  }

  function handleInputEmpresa(event){
    const {name, value} = event.target;
    setFormData({...formData, [name]: value });
  }
  
 return (
    <>
    <Button variant="contained" style={{marginTop: '30px', marginLeft: '50px'}}><Link to="/">Voltar</Link></Button>
    <Container>
    <h1 className={classes.title}>Editar Cadastro</h1>
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
          value={formData.nome}
          label="Nome:"
          placeholder="Digite o nome"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleInputEmpresa}
          required
        />
        
        {tipo_doc === 'Física' ? (
         <>
         <InputMask
            mask="999.999.999-99"
            onChange={handleInputEmpresa}
            value={formData.documento}
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
        </>
        ) : (
          <InputMask
            mask="99.999.999/9999-99"
            onChange={handleInputEmpresa}
            value={formData.documento}
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
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
        
        <FormControl component="fieldset">
          <FormLabel component="legend">Gera NF:</FormLabel>
             <RadioGroup aria-label="gender" name="gender1" value={gerar_nf} onChange={e => setGeraNf(e.target.value)}>
                 <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                 <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Retem ISS:</FormLabel>
             <RadioGroup aria-label="gender" name="gender1" value={retem_iss} onChange={e => setRetemIss(e.target.value)}>
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
          value={formData.obs}
          
        />
        
       {endereco.map((end, index) => (        
        <> 
        <h4>Endereço:{ end.principal === true ? 'Principal' : index + 1  }</h4>
        <Grid container spacing={2} key={index} >
        <Grid item xs={6} sm={6} >
          <Paper className={classes.paper}>Identificação: {end.identificacao}</Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper className={classes.paper}>Endereço: {end.endereco}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Numero: {end.numero}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Bairro: {end.bairro}</Paper>
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
       <Button type="submit" style={{height: '50px',width: '100px' , marginTop: '10px', background: 'grey', color: 'white'}}>Editar</Button>
       </div>
        </form>   
    </Container>
   </>
 );
}

