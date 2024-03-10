import React, { useEffect, useRef, useState } from "react";
import { coinData } from "../../coin-data";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import 'bootstrap/dist/css/bootstrap.min.css';



const ApiCurensy = () => {
  const defaultCoins = useRef([]);
  const [isSelected, setSelected] = useState(false);

  const [coins, setCoins] = useState([]);
  const handleChange = (event) => {
    const newCoins = defaultCoins.current.filter(
      (coin) =>
        coin.id.includes(event.target.value) ||
        coin.symbol.includes(event.target.value)
    );
    setCoins(newCoins);
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd"
      );
      const data = response.ok ? await response.json() : coinData;
      console.log(data);
      setCoins(data);
      defaultCoins.current = data;
    } catch (err) {
      setCoins(coinData);
      defaultCoins.current = coinData;

      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);
 
  const columns = [
    { field: "", headerName: "", width: 10,
   renderCell: () => (
    <StarOutlineIcon  style={{ backgroundColor: isSelected ? 'yellow' : 'white' ,fontSize:"15px"}}
    onClick={() => setSelected(!isSelected[coins.symbol])}/>
)} ,
    { field: "market_cap_rank", headerName: "#", width: 10,},
    
  
    {
      field: "image",
      headerName: "",
      width:5,
      renderCell: (params) => {
        const [image, setImage] = useState(null);
    
        useEffect(() => {
          const img = new Image();
          img.src = params.value;
          img.onload = () => setImage(img);
        }, [params.value]);
    
        return image ? <img src={image.src} width={30} /> : null;
      },
    },
    
    { field: "name", headerName: "Name", width: 250 },
    { field: "current_price", headerName: "Price", width: 100 },
    { field: "high_24h", headerName: "24h %", width: 100 },
    { field: "low_24h", headerName: "Low_24h", width: 100 },
    { field: "price_change_24h", headerName: "7d", width: 100 },
    { field: "market_cap", headerName: "market_cap", width: 200 },
    { field: "price_change_percentage_24h", headerName: "Percentage-24", width: 100 },
   
   
  ];


  
 

  return (
    <div >
      
     
      <h1>CoinMarketCap</h1>
      <div style={{ height: 750, width: "100%" }}>
        <DataGrid
        slots={{
          toolbar: GridToolbar,
          }}       
         rows={coins}
          
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10,20,50]}  
          
          // checkboxSelection    
        />      
      </div>      
    </div>
  );
};
export default ApiCurensy;
