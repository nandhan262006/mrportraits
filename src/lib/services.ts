export interface ServiceCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const services: ServiceCard[] = [
  {
    id: "wedding-photography",
    title: "Wedding Photography",
    category: "Photography",
    imageUrl: "/gallery/wedding.jpg",
  },
  {
    id: "pre-wedding",
    title: "Pre-Wedding Shoots",
    category: "Photography",
    imageUrl: "/gallery/prewedding.jpg",
  },
  {
    id: "engagement",
    title: "Engagement Shoots",
    category: "Photography",
    imageUrl: "/gallery/enagement.jpg",
  },
  {
    id: "maternity",
    title: "Maternity & Newborn",
    category: "Photography",
    imageUrl: "/gallery/maternity.jpg",
  },
  {
    id: "portrait-baby",
    title: "Portrait & Baby",
    category: "Photography",
    imageUrl: "/gallery/baby.jpg",
  },
  {
    id: "family-shoots",
    title: "Family Shoots",
    category: "Photography",
    imageUrl: "/gallery/familyshoot.jpg",
  },
  {
    id: "photoshoots",
    title: "Creative Photoshoots",
    category: "Photography",
    imageUrl: "/gallery/photoshoots.jpg",
  },
  {
    id: "reception",
    title: "Wedding Receptions",
    category: "Events",
    imageUrl: "/gallery/reception.jpg",
  },
  {
    id: "sangeet",
    title: "Sangeet Nights",
    category: "Events",
    imageUrl: "/gallery/sangeeth.jpg",
  },
];