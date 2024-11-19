export interface OilField {
  id: string;
  name: string;
  concession: string;
  ooip: number;
  reserves: number;
  cumulativeProduction: number;
  initialProductionDate: string;
  location: {
    latitude: number;
    longitude: number;
  };
  details: {
    recoveryFactor: number;
    waterCut: number;
    fluidType: string;
    lithology: string;
    discoveryDate: string;
    reservoirTemperature: number;
    avgNetPay: number;
  };
}

export interface ProductionData {
  date: string;
  production: number;
  fieldId: string;
}