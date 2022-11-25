import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { formatRut } from 'rutlib';
import { Patient, PatientCollection } from '../../api/PatientCollection';

const DataTable = () => {
  const patient = useTracker(() => {
    return PatientCollection.find().fetch();
  });

  const patients = (patient: Patient) => {
    const handleDelete = () => PatientCollection.remove(patient._id);

    return (
      <tr className="border-b hover:bg-sky-50" key={patient._id}>
        <td className="p-6">
          <p className="text-2xl text-gray-800">
            {`${patient.names} ${patient.fatherLastName} ${patient.motherLastName}`}
          </p>
        </td>
        <td className="p-6">
          <p className="text-2xl text-gray-800">{formatRut(patient.rut)}</p>
        </td>
        <td className="p-6">
          <p className="text-2xl text-gray-800">{patient.region}</p>
        </td>
        <td className="p-6">
          <p className="text-2xl text-gray-800">{patient.comuna}</p>
        </td>
        <td className="p-6">
          <p className="text-2xl text-gray-800">{patient.zipCode}</p>
        </td>
        <td className="p-6">
          <button
            type="button"
            className="text-red-600 hover:text-red-700 text-xs"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  };
  return (
    <div className="flex justify-center">
      <table className="w-3/4 bg-white shadow mt-5 table-auto">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-2">Nombre completo</th>
            <th className="p-2">RUT</th>
            <th className="p-2">Región</th>
            <th className="p-2">Comuna</th>
            <th className="p-2">Código postal</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        {patient.length === 0 ? null : <tbody>{patient.map(patients)}</tbody>}
      </table>
    </div>
  );
};

export default DataTable;
