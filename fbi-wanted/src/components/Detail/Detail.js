import { useLocation } from "react-router-dom"
import {inchToCm} from '../../utils'

const Detail = () => {
  const location = useLocation()
  const data = location.state

  const Header = () => {
    return <div className="detail-header">
      <img src={data.images[0].original} />
      <h1 className="detail-header-title">{data.title}</h1>
    </div>
  }

  const MainData = () => {
    return <>
      {getRow('Data di nascita', data.dates_of_birth_used)}
      {getRow('Luogo di nascita', data.place_of_birth)}
      {getRow('Età', data.age_range)}
      {getRow('Sesso',data.sex)}
    </>
  }

  const PhysicalData = () => {
    return <>
      {getRow('Altezza', data.height_min === data.height_max ? `${Math.round(inchToCm(data.height_max))} cm` : `${Math.round(inchToCm(data.height_min))} - ${Math.round(inchToCm(data.height_max))} cm`)}
    
      {getRow('Peso', data.weight)}
      {getRow('Capelli', data.hair_raw)}
      {getRow('Occhi', data.eyes_raw)}
      
    </>
  }

  const Description = () => {
    return <p>
      {data.description}
      <div dangerouslySetInnerHTML={{ __html: data.details}}></div>
      <h3>{data.warning_message}</h3>
    </p>
  }

  const getRow = (key, value) => {
    return <p>{key}: <b>{value || '-'}</b></p>
  }

  return <div className="flex column">
    {data ? <>
        <Header />
        <p>{data.publication}</p>
        <MainData />
        <PhysicalData />

        <Description />
      </>
    : <></>}

  </div>

}


export default Detail