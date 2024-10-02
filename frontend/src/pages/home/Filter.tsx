import { useQuery } from "@tanstack/react-query";
import { sortOptions } from "../../constants";
import { Place } from "../../types";
import { getPlaces } from "../../api";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";


const Filter = () => {
  const whereRef = useRef<HTMLSelectElement>(null);
  const orderRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const[params, setParams] = useSearchParams();

  //* api'dan location verilerini aldık
  const { isLoading, data } = useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  //* otellerin lokasyonlarından oluşan benzersiz elemanlara sahip bir dizi yaptık.
const cities = [...new Set(data?.map((i) => i.location))];

//* inputlardan alınan değerleri url'e parametre olarak ekle
const handleChange = (name: string, value: string) => {
  params.set(name, value);

  setParams(params);
};

//* bütün inputları ve url deki parametreleri sıfırla
const handleReset = () => {
  setParams({});

// todo inputları sıfırlama kodu hata veriyor
// whereRef.current?.value = "";
// orderRef.current?.value = "";
// inputRef.current?.value = "";
};


  return (
    <form className="lg:mt-28 flex flex-col gap-4 lg:gap-10">
      <div className="flex flex-col gap-2">
        <label className="font-bold">Nereye?</label>

      {!isLoading && (  <select
        ref={whereRef}
        defaultValue={params.get("location") || ""}
        onChange={((e) => handleChange("location", e.target.value))}
         className="border py-1 px-4 rounded-md">
        <option value="">Seçiniz</option>
        {cities.map((i,key) => (
          <option key={key}>{i}</option>
        ))}
        </select>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold">Konaklama yeri adına göre ara</label>

        <input
        ref={inputRef}
        onChange={(e) => handleChange("title", e.target.value)}
         type="text" className="border py-1 px-4 rounded-md"
        placeholder="örn:Seaside Villa"
        defaultValue={params.get("title") || ""}/>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold">Sıralama Ölçütü</label>

        <select 
        ref={orderRef}
        onChange={(e) => handleChange("order", e.target.value)}
        className="border py-1 px-4 rounded-md"
        defaultValue={params.get("order") || undefined}>
        <option value={undefined}>Seçiniz</option>

        {sortOptions.map((i) => (
          <option value={i.value}>{i.label}</option>
        ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
        type="reset"
        onClick={handleReset}
        className="bg-blue-500 p-1 px-4 text-white rounded-md w-fit">
          Filtreleri Temizle</button></div>
    </form>
  );
};

export default Filter