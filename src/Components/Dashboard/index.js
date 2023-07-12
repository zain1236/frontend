import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { AppContext } from "../Context";

export const Dashboard = (props) => {
  const [ids,setIds] = useState('');
  const {userData,setErpId,erpId} = useContext(AppContext);

  useEffect(()=> {
    const url = process.env.REACT_APP_HOST + '/rec/ids'
    const token = userData.Token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(url)
      .then(resp => {
        if(resp.data.Message === 'success'){
          setIds(resp.data.Ids);
        }
      })
      .catch(error => {
        console.error(error);
      });
 
  },[])

  const handleIdClick  = (id) => {
    setErpId(id);
  } 
  const columns = [
    { 
      field: 'id', headerName: 'ERP ID', flex: 1,
      renderCell: (params) => {
        return (
          <Link to={'/rec'} onClick={() => handleIdClick(params.value) } >
            {params.value}
          </Link>
        )}
      ,
    },
    { field: 'no_of_files', headerName: 'Number of Files', flex: 1 },
    { field: 'last_seen', headerName: 'Last Seen', flex: 1 },
  ];

  return (
    <div>
        <h2 style={{ textAlign: 'center', margin: '20px 0', fontFamily: 'Montserrat, sans-serif' }}>
        ERP IDS
      </h2>
        <DataGrid
          columns={columns}
          rows={ids}
          disableSelectionOnClick
          autoHeight
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              color: '#fff',
              fontWeight: 'bold',
            },
            height : '90vh',
            margin : 2
          }}
          // rowsPerPageOptions={[5, 10, 20]}
          // disableSelectionOnClick
      />
    </div>
  )
}
