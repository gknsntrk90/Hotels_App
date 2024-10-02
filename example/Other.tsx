import { useMutation } from "@tanstack/react-query"
import axios from "axios"


const Other = () => {

//* useQuery bileşen ekrana basıldığı anda otomatik api istediğini atar.
//* useMutation da ise api nin ne zaman atılacağını biz belirleriz

const {data, error, isPending, mutate} = useMutation({
    mutationKey: ["randomTodo"],
    mutationFn: () => axios.get("https://dummyjson.com/todos/random"),
})
  return (
    <div>
        {/* @ts-ignore */}
        <button onClick={mutate}>Rastgele Söz Al</button>
        <br />
        <br />

        {!data ? "todo yok" : isPending ? "yükleniyor" : error ? "hata var" : data && ( <p>
            <span>{data.data.id}</span><br />
            
            <span>{data.data.todo}</span>
            </p>
            )}
    </div>
  )
}

export default Other