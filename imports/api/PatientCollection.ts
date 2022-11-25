import { Mongo } from 'meteor/mongo';

export interface Patient {
  _id: string;
  names: string;
  fatherLastName: string;
  motherLastName: string;
  rut: string;
  region: string;
  comuna: string;
  zipCode: number;
}

export const PatientCollection = new Mongo.Collection<Patient>('pacientes');
