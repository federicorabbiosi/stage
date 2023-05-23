import { useEffect, useState } from "react"
import { getList } from "../../services/services"
import { useNavigate } from "react-router-dom"
import { Typography, Box } from "@mui/material"

const MainList = () => {
  const [items, setItems] = useState()
  const navigate = useNavigate()
  var mount = false

  useEffect(() => {
    if (!items && !mount) {
      mount = true
      console.log('Get list...')
      getList().then(res => {
        setItems(res.items)
      }).catch(() => {})
    }
  }, [])

  const onItemClick = (item) => {
    navigate("/wanted/"+ item.uid, {
      state: item
    })
  }

  return <div className="main-list">
    {items ? items.map(item => {
      return <Item key={item.uid} item={item} onItemClick={() => onItemClick(item)} />
    }) : <>...</>}
    <Box className='pointer'>
      <Typography marginY={2}>Altri risultati...</Typography>
    </Box>
  </div>
}



const Item = ({item, onItemClick}) => {
  return <div className="main-list-item pointer" onClick={onItemClick}>
    {item.title}
  </div>
}

export default MainList