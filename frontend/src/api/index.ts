import axios from "axios"
import { Params } from "react-router-dom";
import { PlaceData } from "../types";

//* base url'e sahip bir axios örneği oluştur
const api = axios.create({ baseURL: "http://localhost:4001" });


//* Bütün konaklama yerlerini getiren bir fonskyon yaz
export const getPlaces = (params: Params) => 
    api.get("/api/places", { params }).then((res) => res.data.places);

//* Yeni bir konaklama yeri oluşturan fonksiyon
export const createPlace = (body:PlaceData) => 
    api.post("/api/places", body);

//* 1 konaklama noktasını alan fonskyon
export const getPlace = (id:string) => 
    api.get(`/api/place/${id}`).then((res) => res.data.place);

//* Konaklama alanını sil
export const deletePlace = (id:string) =>
    api.delete(`/api/place/${id}`);