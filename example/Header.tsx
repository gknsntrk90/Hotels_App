import { useQuery } from "@tanstack/react-query"
// import { getQuotes } from "./Updated";
import axios from "axios";

const Header = () => {
    //* updated bileşenininde api istedğinden elde ettiğimiz veri header'da bize gerekli
    //*bizde header'da aynı api istediğini attık
    //* normal bir projede bu bir sorun olsada tanstack query'nin ache mekanizması sayesinde iki kere api istediği atmak yerine 1 kere atıp ilk istekten gelen verileri ikincide kullanıyor
    const {data} = useQuery({
        queryKey: ["quotes"],
        queryFn: () => axios.get("https://dummyjson.com/quotes"),
    });
  return (
    <div>
        <h1>Özlü Sözler</h1>
        {/* @ts-ignore */}
        <h2>{data?.data?.quotes?.length}tane söz var</h2>
        </div>
  )
}

export default Header