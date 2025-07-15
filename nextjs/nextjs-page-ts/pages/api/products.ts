import type { NextApiRequest, NextApiResponse } from 'next';

const products = [
  {
    id: 1,
    title: "iPhone 16 Pro",
    price: 999,
    description: "Flagship Apple 2025",
    images: ["/no-image.png"],
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    price: 899,
    description: "Flagship Samsung 2025",
    images: ["/no-image.png"],
  },
  {
    id: 3,
    title: "MacBook Air M3",
    price: 1199,
    description: "Laptop Apple mới nhất",
    images: ["/no-image.png"],
  },
  {
    id: 4,
    title: "AirPods Pro",
    price: 249,
    description: "Tai nghe không dây cao cấp",
    images: ["/no-image.png"],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
}
