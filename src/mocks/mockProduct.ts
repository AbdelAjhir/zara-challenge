import type { ProductDetails } from "@/schemas/productDetailSchema";

export const mockProduct: ProductDetails = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  description:
    "El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.",
  basePrice: 1329,
  rating: 4.6,
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: "3120 x 1440 pixels",
    processor: "Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core",
    mainCamera:
      "200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x3, OIS + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS",
    selfieCamera: "12 MP",
    battery: "5000 mAh",
    os: "Android 14",
    screenRefreshRate: "120 Hz",
  },
  colorOptions: [
    {
      name: "Titanium Violet",
      hexCode: "#8E6F96",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp",
    },
    {
      name: "Titanium Black",
      hexCode: "#000000",
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-black.webp",
    },
  ],
  storageOptions: [
    { capacity: "256 GB", price: 1229 },
    { capacity: "512 GB", price: 1329 },
  ],
  similarProducts: [
    {
      id: "OPP-A18",
      brand: "OPPO",
      name: "A18",
      basePrice: 99,
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-A18-azul-brillante.webp",
    },
    {
      id: "MTO-G24",
      brand: "Motorola",
      name: "g24",
      basePrice: 119,
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/MTO-G24-gris.webp",
    },
  ],
};
