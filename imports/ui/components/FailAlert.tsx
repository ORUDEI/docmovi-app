import React from 'react';
import { IFailAlert } from '/utils/interfaces';

const FailAlert = ({ showFailAlert }: IFailAlert) => {
  return (
    <>
      {showFailAlert ? (
        <div className="flex justify-center pt-8">
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 w-1/2 text-center"
            role="alert"
          >
            <span className="font-bold">Error en el registro</span> Revisar
            campos ingresados
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FailAlert;
