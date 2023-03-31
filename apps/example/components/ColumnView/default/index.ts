export const initialValues = [
  {
    id: '633431fa-ef2c-4d05-a032-a651f7fcfa22',
    children: ['4428803c-43ec-4cff-877e-119bd21d4316'],
    name: 'Venice',
  },
  {
    id: '0f14abb9-71e7-4e20-9745-adf15b0a4d84',
    children: [],
    name: 'New York',
  },
  {
    id: '2096aa5e-5b6f-4754-8b9d-3780a85f9c8e',
    children: [],
    name: 'London',
  },
  {
    id: '4428803c-43ec-4cff-877e-119bd21d4316',
    children: [
      'a1cf21fc-f08f-454f-8da4-95ae5a2ec907',
      'f0585461-c70f-4f04-aa62-7e65dc7caa63',
    ],
    name: 'Hotels',
  },
  {
    id: 'a1cf21fc-f08f-454f-8da4-95ae5a2ec907',
    children: [],
    name: 'Danieli',
  },
  {
    id: 'f0585461-c70f-4f04-aa62-7e65dc7caa63',
    children: [],
    name: 'Grand Hotel',
  },
];

export const initialPath = [
  '633431fa-ef2c-4d05-a032-a651f7fcfa22',
  '4428803c-43ec-4cff-877e-119bd21d4316',
];

export type InitialState = typeof initialValues;
