import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react';


const getQuotes = () => axios.get("http://dummyjson.com/quotes");

const Updated = () => {
    const [page,setPage] = useState(1);
    //* useQuery Yapılan api istediğinin bütün detaylarının state'ini tutar
    const {data,error,isLoading} = useQuery({
        queryKey:["quotes", page],
        queryFn: getQuotes,
        retry:10,
    })
  return (
    <div>//* 5- eğer isLoading durumu true ise ekrana bir tane yükleniyor metni bas
    if (isLoading) return <h2>Yükleniyor...</h2>;


    if (error)
     return (
      <div>
        {/* @ts-ignore */}
        {error?.message} <button onClick={reflect}>Tekrar Dene</button>
      </div>
    );
    //* 6- eğer ki error değeri true ise hatanın içeriğini bas
    
      return (
        <button onClick={() => setPage(page + 1)}>Sayfa Değiş ({page})</button>
        //* 7- eğer ki son olarak datalar geldiğinde datayı bas
        <div>
        {/* @ts-ignore */}
            <button onClick={refetch}>Tekrar Dene</button>
            
            {/* @ts-ignore */}
            {data.data.quotes.map((item) => (
                <p>
                    <span>{item.quote}</span>
                    <br />
                    <b>{item.author}</b>
    
                    <br />
                    <br />
                    <br />
                </p>
            ))}
        </div>
      )</div>
  )
}

export default Updated