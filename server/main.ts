import { Meteor } from 'meteor/meteor';
import { PatientCollection } from '/imports/api/PatientCollection';

export type patient = {
  _id: string;
  names: string;
  fatherLastName: string;
  motherLastName: string;
  rut: string;
  region: string;
  comuna: string;
  zipCode: number;
};

const insertPatient = ({
  _id,
  names,
  fatherLastName,
  motherLastName,
  rut,
  region,
  comuna,
  zipCode,
}: patient) =>
  PatientCollection.insert({
    _id,
    names,
    fatherLastName,
    motherLastName,
    rut,
    region,
    comuna,
    zipCode,
  });

Meteor.startup(() => {
 
});


