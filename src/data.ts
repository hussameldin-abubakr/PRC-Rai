import { OilField, ProductionData } from './types';

export const oilFields: OilField[] = [
  {
    id: 'k-field',
    name: 'K Field',
    concession: 'NC115',
    ooip: 2500,
    reserves: 850,
    cumulativeProduction: 620,
    initialProductionDate: '2004-01-01',
    location: {
      latitude: 27.8,
      longitude: 12.5,
    },
    details: {
      recoveryFactor: 39.7,
      waterCut: 83.3,
      fluidType: 'Oil',
      lithology: 'Sandstone (Upper Mamuniyat)',
      discoveryDate: '2005-11-01',
      reservoirTemperature: 183,
      avgNetPay: 35,
    }
  },
  {
    id: 'b-field-nc115',
    name: 'B Field',
    concession: 'NC115',
    ooip: 1800,
    reserves: 600,
    cumulativeProduction: 450,
    initialProductionDate: '2005-03-15',
    location: {
      latitude: 27.6,
      longitude: 12.3,
    },
    details: {
      recoveryFactor: 31.84,
      waterCut: 87,
      fluidType: 'Oil',
      lithology: 'Sandstone (Mamuniyat)',
      discoveryDate: '1985-01-01',
      reservoirTemperature: 192,
      avgNetPay: 73.2,
    }
  },
  {
    id: 'j-field-nc186',
    name: 'J Field',
    concession: 'NC186',
    ooip: 2200,
    reserves: 750,
    cumulativeProduction: 520,
    initialProductionDate: '2006-06-01',
    location: {
      latitude: 27.4,
      longitude: 12.7,
    },
    details: {
      recoveryFactor: 31.53,
      waterCut: 96,
      fluidType: 'Light Oil',
      lithology: 'Sandstone (Hawaz)',
      discoveryDate: '2001-01-01',
      reservoirTemperature: 167.3,
      avgNetPay: 64.4,
    }
  },
  {
    id: 'b-field-nc186',
    name: 'B Field',
    concession: 'NC186',
    ooip: 1600,
    reserves: 500,
    cumulativeProduction: 380,
    initialProductionDate: '2007-09-20',
    location: {
      latitude: 27.2,
      longitude: 12.4,
    },
    details: {
      recoveryFactor: 46.74,
      waterCut: 75,
      fluidType: 'Oil',
      lithology: 'Sandstone',
      discoveryDate: '2000-11-01',
      reservoirTemperature: 196,
      avgNetPay: 0,
    }
  },
  {
    id: 'a-field-nc186',
    name: 'A Field',
    concession: 'NC186',
    ooip: 2000,
    reserves: 680,
    cumulativeProduction: 480,
    initialProductionDate: '2008-12-10',
    location: {
      latitude: 27.5,
      longitude: 12.6,
    },
    details: {
      recoveryFactor: 46.74,
      waterCut: 75,
      fluidType: 'Oil',
      lithology: 'Sandstone',
      discoveryDate: '2000-11-01',
      reservoirTemperature: 196,
      avgNetPay: 0,
    }
  },
];

// Production data generation function remains the same
function generateProductionProfile(
  field: OilField,
  months: number
): ProductionData[] {
  const data: ProductionData[] = [];
  const startDate = new Date(field.initialProductionDate);
  
  const rampUpMonths = 6;
  const plateauMonths = 24;
  const plateauRate = field.cumulativeProduction / 36;
  const declineFactor = 0.08;
  
  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    
    let production: number;
    
    if (i < rampUpMonths) {
      production = (plateauRate * (i + 1)) / rampUpMonths;
    }
    else if (i < rampUpMonths + plateauMonths) {
      production = plateauRate;
    }
    else {
      const declineMonths = i - (rampUpMonths + plateauMonths);
      production = plateauRate * Math.exp(-declineFactor * (declineMonths / 12));
    }
    
    const seasonalFactor = 1 + 0.1 * Math.sin((i / 12) * 2 * Math.PI);
    const noise = 1 + (Math.random() - 0.5) * 0.1;
    production *= seasonalFactor * noise;
    production = Math.round(production);
    
    data.push({
      date: date.toISOString().split('T')[0],
      production,
      fieldId: field.id,
    });
  }
  
  return data;
}

export const productionData: ProductionData[] = oilFields.flatMap(field => 
  generateProductionProfile(field, 84)
);