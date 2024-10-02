import Container from '../../components/container'
import { Field, Form, Formik } from 'formik'
import { initial, inputs } from '../../constants';
import { PlaceData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { createPlace } from '../../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Create = () => {
  const navigate = useNavigate();
  

 const {isPending, mutate} = useMutation({
  mutationFn: (body: PlaceData) => createPlace(body),

  onSuccess: (res) => {
    toast.success("Konaklama noktası oluşturuldu")
    navigate(`/place/${res.data.place.id}`);
  },

  onError: (err) => {
    console.log(err);
    toast.error("İşlem başarısız oldu");
  },
});


const handleSubmit = (values: PlaceData) => {
  //* Kopyasını oluştur
  const body = { ...values };

  //* özellikler metnini ,'e göre diziye çevir
  body.amenities = (values.amenities as string).split(",");

  //* api'ye istek at
  mutate(body);
};


  return (
    <Container>
      <Formik initialValues={initial} onSubmit={handleSubmit}>
        <Form className='max-w-2xl mx-auto grid gap-5'>
          {inputs.map((item,key) => (
            <div key={key} className='flex flex-col gap-3'>
              <label className='font-bold'>{item.label}</label>
              <Field
              type={item.type || "text"} 
              name={item.name}
              className="border py-1 px-4 rounded-md shadow w-full" />
            </div>
          ))}

          <button
          disabled={isPending}
          className='my-5 bg-blue-500 py-2 text-white font-bold rounded-md
          transition hover:bg-blue-600'
          type="submit">Gönder</button>
        </Form>
      </Formik>
    </Container>
  );
};

export default Create 