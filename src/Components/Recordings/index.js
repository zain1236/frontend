import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AudioPlayer from '../AudioPlayer';
import { AppContext } from "../Context";
export default function Recordings() {
    const {erpId,userData} = useContext(AppContext);
    const [recData,setRecData] = useState();
 
    useEffect(()=> {
        if (userData){

            const url = process.env.REACT_APP_HOST + '/rec/' + erpId;
            const token = userData.Token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
            axios.get(url)
            .then(resp => {
                // console.log(resp.data);
                if(resp.data.Message === 'success'){
                setRecData(resp.data.Rec);
                console.log(recData);
                }
                else{
                    alert(resp.data.Message);
                }
            })
            .catch(error => {
                alert(error);
            });
        }
      },[])
    

    const handleDownload = (fileName) => {
        const url = process.env.REACT_APP_HOST + `/rec/download/${erpId}/${fileName}`;
        const token = userData.Token;

        axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
        })
        .then((response) => {
            const blobURL = URL.createObjectURL(response.data);
            console.log(blobURL);
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = fileName;
            link.click();

            // Clean up the temporary URL
            URL.revokeObjectURL(blobURL);
        })
            .catch((error) => {
            alert(error);
        });
    };
    
    const columns = [
        { field: 'id', headerName: 'Rec ID', flex: 1 },
        // { field: 'file_name', headerName: 'Recording', flex: 2 },
        {
            field: 'file_name',
            headerName: 'Rec',
            flex: 2,
            renderCell:  (params) => {
                const fileName = params.value;
                const token = userData.Token;
                const url = `${process.env.REACT_APP_HOST}/rec/download/${erpId}/${fileName}`;
            
                return (
                    <div style={{paddingTop : '20px',paddingBottom : "20px"}} >
                        <AudioPlayer fileUrl={url} token={token}/>
                    </div>
                );
            },
        },
        { field: 'duration', headerName: 'Duration', flex: 1 },
        { field: 'size', headerName: 'Size', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'time', headerName: 'Time', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                const fileName = params.row.file_name;
                return (
                    <button onClick={() => handleDownload(fileName)}>Download</button>
                );
            },
        },
        
    ];
    

    
      
    if (erpId)
    {
        return (
            <div>
                <h2 style={{ textAlign: 'center', margin: '20px 0', fontFamily: 'Montserrat, sans-serif' }}>
                    Showing Results Of <strong>{erpId}</strong>
                </h2>
                {recData ?
                    <DataGrid
                        rows={recData}
                        columns={columns}
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
                                        
                    />
                    : ""
                }
            </div>
        )
    }
    else{
        return (
            <h2 style={{ textAlign: 'center', margin: '20px 0', fontFamily: 'Montserrat, sans-serif' }}>
                Please Select Erp Id
            </h2>
        )
    }
}

