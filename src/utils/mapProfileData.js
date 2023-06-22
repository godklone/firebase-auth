import { formatDate } from "../helpers";

export const mapProfileData = (userData) => {
  const { name, surename,identification,birthday,gender, localization, fidelization } = userData.data;
  let mappedData = {};
  try {
    mappedData = {
      name,
      surename,
      identification,
      birthday:formatDate(birthday),
      gender:JSON.stringify(gender),
      localization,
      fullName: `${name} ${surename}`,
      fidelization: {
        accumulatedPoints: fidelization?.accumulated_points,
        expirationPoints: fidelization?.expiration_points,
        expirationDate: fidelization?.expiration_date,
        credencial: {
          number: fidelization?.credencial.number,
          code: fidelization?.credencial.code,
          identificacion: fidelization?.credencial.identificacion,
        },
      },
    };

  } catch (error) {
    throw new Error(error)
  }
  return mappedData;

};
