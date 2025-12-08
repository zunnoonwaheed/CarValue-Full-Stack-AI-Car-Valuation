export interface CarVariant {
  name: string;
  basePrice: number;
}

export interface CarModel {
  name: string;
  variants: CarVariant[];
}

export interface CarMake {
  name: string;
  logo?: string;
  models: CarModel[];
}

export const carDatabase: CarMake[] = [
  {
    name: "Toyota",
    models: [
      {
        name: "Corolla",
        variants: [
          { name: "GLi 1.3", basePrice: 3200000 },
          { name: "XLi 1.3", basePrice: 3400000 },
          { name: "Altis 1.6", basePrice: 4500000 },
          { name: "Altis Grande 1.8", basePrice: 5500000 },
          { name: "Cross 1.8", basePrice: 6500000 },
        ],
      },
      {
        name: "Yaris",
        variants: [
          { name: "GLi 1.3", basePrice: 2800000 },
          { name: "ATIV X 1.3", basePrice: 3200000 },
          { name: "ATIV X CVT 1.5", basePrice: 3800000 },
        ],
      },
      {
        name: "Camry",
        variants: [
          { name: "2.5L", basePrice: 12500000 },
          { name: "Hybrid", basePrice: 15000000 },
        ],
      },
      {
        name: "Fortuner",
        variants: [
          { name: "2.7 V", basePrice: 9500000 },
          { name: "2.8 Sigma 4", basePrice: 12000000 },
          { name: "Legender", basePrice: 14500000 },
        ],
      },
      {
        name: "Land Cruiser",
        variants: [
          { name: "VX", basePrice: 35000000 },
          { name: "ZX", basePrice: 45000000 },
          { name: "GR Sport", basePrice: 55000000 },
        ],
      },
      {
        name: "Prado",
        variants: [
          { name: "TX", basePrice: 22000000 },
          { name: "TXL", basePrice: 28000000 },
          { name: "VX", basePrice: 32000000 },
        ],
      },
      {
        name: "Hilux",
        variants: [
          { name: "Single Cab", basePrice: 5500000 },
          { name: "Revo G", basePrice: 7500000 },
          { name: "Revo V", basePrice: 9000000 },
          { name: "Rocco", basePrice: 11000000 },
        ],
      },
    ],
  },
  {
    name: "Honda",
    models: [
      {
        name: "Civic",
        variants: [
          { name: "Standard 1.5T", basePrice: 6500000 },
          { name: "Oriel 1.5T", basePrice: 7200000 },
          { name: "RS 1.5T", basePrice: 8500000 },
        ],
      },
      {
        name: "City",
        variants: [
          { name: "1.2L Standard", basePrice: 3200000 },
          { name: "1.2L Aspire", basePrice: 3600000 },
          { name: "1.5L Aspire", basePrice: 4200000 },
        ],
      },
      {
        name: "Accord",
        variants: [
          { name: "2.0T Sport", basePrice: 14000000 },
          { name: "Hybrid", basePrice: 16500000 },
        ],
      },
      {
        name: "BR-V",
        variants: [
          { name: "S", basePrice: 4200000 },
          { name: "i-VTEC S", basePrice: 4800000 },
        ],
      },
      {
        name: "HR-V",
        variants: [
          { name: "Standard", basePrice: 6800000 },
          { name: "AWD", basePrice: 8200000 },
        ],
      },
      {
        name: "Vezel",
        variants: [
          { name: "Hybrid X", basePrice: 6500000 },
          { name: "Hybrid Z", basePrice: 7500000 },
        ],
      },
    ],
  },
  {
    name: "Suzuki",
    models: [
      {
        name: "Alto",
        variants: [
          { name: "VX", basePrice: 1850000 },
          { name: "VXR", basePrice: 2100000 },
          { name: "VXL AGS", basePrice: 2350000 },
        ],
      },
      {
        name: "Cultus",
        variants: [
          { name: "VXR", basePrice: 2400000 },
          { name: "VXL", basePrice: 2700000 },
          { name: "AGS", basePrice: 2900000 },
        ],
      },
      {
        name: "Swift",
        variants: [
          { name: "GL Manual", basePrice: 3100000 },
          { name: "GL CVT", basePrice: 3400000 },
          { name: "GLX CVT", basePrice: 3700000 },
        ],
      },
      {
        name: "Wagon R",
        variants: [
          { name: "VXR", basePrice: 2500000 },
          { name: "VXL", basePrice: 2800000 },
          { name: "AGS", basePrice: 3000000 },
        ],
      },
      {
        name: "Jimny",
        variants: [
          { name: "GL", basePrice: 6500000 },
          { name: "JLSX", basePrice: 7200000 },
        ],
      },
      {
        name: "Vitara",
        variants: [
          { name: "GLX", basePrice: 8500000 },
        ],
      },
    ],
  },
  {
    name: "Hyundai",
    models: [
      {
        name: "Elantra",
        variants: [
          { name: "GL 1.6", basePrice: 5500000 },
          { name: "GLS 2.0", basePrice: 6200000 },
        ],
      },
      {
        name: "Sonata",
        variants: [
          { name: "2.0 GLS", basePrice: 8500000 },
          { name: "2.5 Sport", basePrice: 10500000 },
        ],
      },
      {
        name: "Tucson",
        variants: [
          { name: "GLS Sport FWD", basePrice: 7500000 },
          { name: "Ultimate AWD", basePrice: 9500000 },
        ],
      },
      {
        name: "Santa Fe",
        variants: [
          { name: "2.4 GDI", basePrice: 12500000 },
          { name: "3.5 V6", basePrice: 15000000 },
        ],
      },
      {
        name: "Staria",
        variants: [
          { name: "Premium", basePrice: 13500000 },
        ],
      },
    ],
  },
  {
    name: "KIA",
    models: [
      {
        name: "Picanto",
        variants: [
          { name: "1.0 AT", basePrice: 3200000 },
        ],
      },
      {
        name: "Stonic",
        variants: [
          { name: "EX", basePrice: 5500000 },
          { name: "EX+", basePrice: 6200000 },
        ],
      },
      {
        name: "Sportage",
        variants: [
          { name: "Alpha", basePrice: 7500000 },
          { name: "FWD", basePrice: 9500000 },
          { name: "AWD", basePrice: 11500000 },
        ],
      },
      {
        name: "Sorento",
        variants: [
          { name: "2.4 FWD", basePrice: 12500000 },
          { name: "3.5 AWD", basePrice: 15500000 },
        ],
      },
      {
        name: "Carnival",
        variants: [
          { name: "Grand 7S", basePrice: 16500000 },
          { name: "Grand 8S", basePrice: 18500000 },
        ],
      },
    ],
  },
  {
    name: "Changan",
    models: [
      {
        name: "Alsvin",
        variants: [
          { name: "Comfort", basePrice: 3000000 },
          { name: "Lumiere", basePrice: 3400000 },
        ],
      },
      {
        name: "Oshan X7",
        variants: [
          { name: "Comfort", basePrice: 5500000 },
          { name: "FutureSense", basePrice: 6500000 },
        ],
      },
      {
        name: "Uni-T",
        variants: [
          { name: "Standard", basePrice: 6000000 },
        ],
      },
      {
        name: "Karvaan",
        variants: [
          { name: "Base", basePrice: 2200000 },
          { name: "Plus", basePrice: 2500000 },
        ],
      },
    ],
  },
  {
    name: "MG",
    models: [
      {
        name: "ZS",
        variants: [
          { name: "1.5L", basePrice: 4800000 },
          { name: "EV", basePrice: 6500000 },
        ],
      },
      {
        name: "HS",
        variants: [
          { name: "Excite", basePrice: 6500000 },
          { name: "Essence", basePrice: 7500000 },
        ],
      },
      {
        name: "5",
        variants: [
          { name: "Excite", basePrice: 4200000 },
        ],
      },
    ],
  },
  {
    name: "Proton",
    models: [
      {
        name: "Saga",
        variants: [
          { name: "Standard AT", basePrice: 2800000 },
          { name: "Ace AT", basePrice: 3200000 },
        ],
      },
      {
        name: "X70",
        variants: [
          { name: "Executive FWD", basePrice: 6500000 },
          { name: "Premium AWD", basePrice: 8500000 },
        ],
      },
    ],
  },
  {
    name: "DFSK",
    models: [
      {
        name: "Glory 580",
        variants: [
          { name: "1.5T CVT", basePrice: 5500000 },
          { name: "Pro", basePrice: 6000000 },
        ],
      },
    ],
  },
  {
    name: "Haval",
    models: [
      {
        name: "H6",
        variants: [
          { name: "2.0T", basePrice: 8500000 },
        ],
      },
      {
        name: "Jolion",
        variants: [
          { name: "Active", basePrice: 6000000 },
          { name: "Ultra", basePrice: 7000000 },
        ],
      },
    ],
  },
];

export const transmissionTypes = ["Manual", "Automatic", "CVT", "DCT"] as const;
export const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"] as const;
export const conditionRatings = ["Excellent", "Good", "Fair", "Poor"] as const;

export function getModelsForMake(make: string): CarModel[] {
  const carMake = carDatabase.find((m) => m.name === make);
  return carMake?.models || [];
}

export function getVariantsForModel(make: string, model: string): CarVariant[] {
  const carMake = carDatabase.find((m) => m.name === make);
  const carModel = carMake?.models.find((m) => m.name === model);
  return carModel?.variants || [];
}

export function getBasePrice(make: string, model: string, variant: string): number {
  const carMake = carDatabase.find((m) => m.name === make);
  const carModel = carMake?.models.find((m) => m.name === model);
  const carVariant = carModel?.variants.find((v) => v.name === variant);
  return carVariant?.basePrice || 0;
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(1)} Lac`;
  }
  return price.toLocaleString("en-PK");
}

export function formatPriceShort(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(1)}Cr`;
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(0)}L`;
  }
  return price.toLocaleString("en-PK");
}

export const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
