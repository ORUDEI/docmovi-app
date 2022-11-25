import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTracker } from 'meteor/react-meteor-data';
import { validateRut, cleanRut } from 'rutlib';
import { PatientCollection } from '/imports/api/PatientCollection';
import Alert from './SuccessAlert';
import FailAlert from './FailAlert';
import { IData } from '/utils/interfaces';
import data from '../../../utils/data.json';

const Form = () => {
  const [names, setNames] = useState('');
  const [fatherLastName, setFatherLastName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [rut, setRut] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [comunaData, setComunaData] = useState<Array<IData>>([
    { region: '', comunas: [] },
  ]);
  const [isValid, setIsValid] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  const patient = useTracker(() => {
    return PatientCollection.find().fetch();
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      fatherLastName: '',
      motherLastName: '',
      rut: '',
      region: '',
      comuna: '',
      zipCode: 0,
    },
  });

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
    setComuna('');
    setComunaData(
      data?.regiones.filter((region) => region.region === e.target.value)
    );
  };

  const handleComunaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComuna(e.target.value);
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRut(e.target.value);
    setIsValid(validateRut(e.target.value));
  };

  const validateRutError = () => {
    return isValid;
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 2000);
    return () => clearTimeout(time);
  }, [showSuccessAlert]);

  useEffect(() => {
    const time = setTimeout(() => {
      setShowFailAlert(false);
    }, 2000);

    return () => clearTimeout(time);
  }, [showFailAlert]);

  const clearData = () => {
    setNames('');
    setFatherLastName('');
    setMotherLastName('');
    setRut('');
    setRegion('');
    setComuna('');
    setZipCode(0);
  };

  return (
    <>
      <h1 className="font-black text-4xl text-sky-900 text-center">
        Nuevo Paciente
      </h1>

      <form
        onSubmit={handleSubmit(() => {
          setIsValid(validateRut(rut));

          const isDuplicated = patient.filter(
            (patient) => patient.rut === cleanRut(rut)
          );

          if (isDuplicated.length > 0) {
            setShowFailAlert(true);
          } else {
            setIsValid(true);
            if (rut.length > 0) {
              PatientCollection.insert({
                names,
                fatherLastName,
                motherLastName,
                rut: cleanRut(rut),
                region,
                comuna,
                zipCode,
              });
              setShowSuccessAlert(true);
              clearData();
              reset();
            } else {
              setShowFailAlert(true);
            }
          }
        })}
      >
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
          <div className="mb-4">
            <label className="text-gray-800">Nombres:</label>
            <input
              id="name"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Nombres"
              value={names}
              {...register('name', { required: true })}
              onChange={(e) => setNames(e.target.value)}
            ></input>
            {errors.name && (
              <p className="text-red-500 mt-2">Campo obligatorio</p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="mb-4 w-1/2">
              <label className="text-gray-800">Apellido paterno:</label>
              <input
                id="fatherLastName"
                type="text"
                value={fatherLastName}
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Apellido paterno"
                {...register('fatherLastName', { required: true })}
                onChange={(e) => setFatherLastName(e.target.value)}
              ></input>
              {errors.fatherLastName && (
                <p className="text-red-500 mt-2">Campo obligatorio</p>
              )}
            </div>
            <div className="mb-4 w-1/2">
              <label className="text-gray-800">Apellido paterno:</label>
              <input
                id="motherLastName"
                type="text"
                value={motherLastName}
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Apellido paterno"
                {...register('motherLastName', { required: true })}
                onChange={(e) => setMotherLastName(e.target.value)}
              ></input>
              {errors.motherLastName && (
                <p className="text-red-500 mt-2">Campo obligatorio</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="mb-4 w-1/2">
              <label className="text-gray-800">RUT:</label>
              <input
                id="rut"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                value={rut}
                placeholder="Rut"
                {...register('rut', {
                  validate: validateRutError,
                })}
                onChange={(e) => handleRutChange(e)}
              ></input>
              {errors?.rut?.type === 'validate' && (
                <p className="text-red-500 mt-2">Rut inválido</p>
              )}
            </div>
            <div className="mb-4 w-1/2">
              <label className="text-gray-800">Código postal:</label>
              <input
                id="zipCode"
                type="number"
                value={zipCode? zipCode : 0}
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Código postal"
                {...register('zipCode', { validate: (value) => value > 0 })}
                onChange={(e) => setZipCode(parseInt(e.target.value))}
              ></input>
              {errors.zipCode && (
                <p className="text-red-500 mt-2">Código postal inválido</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="mb-4 w-1/2">
              <label className="text-gray-800">Región:</label>
              <div className="relative w-full">
                <select
                  className="w-full p-2.5 text-gray-500 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 bg-gray-50"
                  {...register('region', { required: true })}
                  onChange={(e) => handleRegionChange(e)}
                  value={region}
                >
                  <option value={''}>Seleccione región</option>
                  {data?.regiones.map((region, i) => (
                    <option value={region.region} key={i}>
                      {region.region}
                    </option>
                  ))}
                </select>
              </div>
              {errors.region && (
                <p className="text-red-500 mt-2">Campo obligatorio</p>
              )}
            </div>
            <div className="mb-4 w-1/2">
              <label className="text-gray-800">Comuna:</label>
              <div className="relative w-full">
                <select
                  className="w-full p-2.5 text-gray-500 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 bg-gray-50"
                  {...register('comuna', { required: true })}
                  onChange={(e) => handleComunaChange(e)}
                  value={comuna}
                >
                  <option value={''}>Selecciones comuna</option>
                  {comunaData[0]?.comunas?.map((comuna, i) => (
                    <option value={comuna} key={i}>
                      {comuna}
                    </option>
                  ))}
                </select>
                {errors.comuna && (
                  <p className="text-red-500 mt-2">Campo obligatorio</p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="submit"
              className="mt-5 w-full bg-sky-800 p-3 uppercase font-bold text-white text-lg hover:bg-sky-900 cursor-pointer"
              value="Registrar Paciente"
            />
          </div>
        </div>
      </form>
      <Alert showSuccessAlert={showSuccessAlert} />
      <FailAlert showFailAlert={showFailAlert} />
    </>
  );
};

export default Form;
