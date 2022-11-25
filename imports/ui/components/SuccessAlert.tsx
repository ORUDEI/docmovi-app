import React from 'react';
import { ISuccessAlert } from '/utils/interfaces';

const Alert = ({ showSuccessAlert }: ISuccessAlert) => {
  return (
    <>
      {showSuccessAlert ? (
        <div className="flex justify-center pt-8">
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 w-1/2 text-center"
            role="alert"
          >
            <span className="font-bold">Registro completo</span> Paciente
            ingresado con éxito
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
