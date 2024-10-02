import axios from "axios"
import { useEffect, useState } from "react"

//* 2- daha sonra export ile typeları yazacağız ki setDatayı axios da kullanalım
export type Quote = {
    id: number;
    author: string;
    quote: string;
};

const Classic = () => {
    //* 1- datada tutacağız önce 
    const [data, setData] = useState<Quote[]>([]);
    //* 3- hata state'i tutacağız başlangıcı null olacak fakat string veya null olarak
    const [error, setError] = useState<string | null>(null);
    //* 4- yüklenme durumu state'i tutmak boolean olacak true olarak
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
//* 4- useEffect ile istek atıldığında true a çekeceğiz bunu
setIsLoading(true);

        axios.get("https://dummyjson.com/quotes")
        .then((res) => setData(res.data.quotes))
        .catch((err) => setError(err.message))
        //* 4- istek bittiği zaman finally olacak ve false yapacağız
        .finally(() => setIsLoading(false));
    }, []);

//* 5- eğer isLoading durumu true ise ekrana bir tane yükleniyor metni bas
if (isLoading) return <h2>Yükleniyor...</h2>;
if (error) return <h2>Bir hata oluştu : {error}</h2>;
//* 6- eğer ki error değeri true ise hatanın içeriğini bas

  return (
    //* 7- eğer ki son olarak datalar geldiğinde datayı bas
    <div>
        {data.map((item) => (
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
  )
}

export default Classic