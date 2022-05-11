export * from './date';
export * from './string';

export const calculateDelta = (params: {
  latitude: number;
  longitude: number;
  accuracy: number;
}) => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const latDelta = params.accuracy / oneDegreeOfLatitudeInMeters;
  const longDelta =
    params.accuracy /
    (oneDegreeOfLatitudeInMeters * Math.cos(params.latitude * (Math.PI / 180)));

  return {
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
  };
};
