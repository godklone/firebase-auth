export const mapProfileData = (userData) => {
  const { name, surename,identification, fidelization } = userData.data;
  let mappedData = {};
  try {
    mappedData = {
      name,
      surename,
      identification,
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
    console.log(error)
  }
  return mappedData;

};
