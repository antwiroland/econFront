import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  {
    href: "/air-conditioners",
    name: "Air Conditions",
    imageUrl: "/air_conditioner.jpeg",
  },
  { href: "/air-fryers", name: "Air Fryers", imageUrl: "/air-fryers.jpeg" },
  { href: "/blenders", name: "Blenders", imageUrl: "/blender.jpeg" },
  { href: "/cake-mixers", name: "Cake Mixers", imageUrl: "/cake_mixer.jpeg" },
  { href: "/fans", name: "Fans", imageUrl: "/ceiling_fan.jpeg" },
  { href: "/cookwares", name: "Cookwares", imageUrl: "/cookware.webp" },
  { href: "/fridges", name: "Fridges", imageUrl: "/fridge.png" },
  {
    href: "/fufu-machine",
    name: "Fufu Machines",
    imageUrl: "/fufu_machine.jpeg",
  },
  { href: "/gas-burners", name: "Gas Burners", imageUrl: "/gas_burner.jpeg" },
  { href: "/juicers", name: "Juicers", imageUrl: "/juicer.jpeg" },
  { href: "/microwaves", name: "Microware", imageUrl: "/micro_wave.jpeg" },
  {
    href: "/rice-cookers",
    name: "Rice Cookers",
    imageUrl: "/rice_cooker.jpeg",
  },
  {
    href: "/storage-racks",
    name: "Storage Rack",
    imageUrl: "/storage_rack.jpeg",
  },
  { href: "/tablet", name: "Tablet", imageUrl: "/tablet.jpeg" },
  {
    href: "/washing-machines",
    name: "Washing Machine",
    imageUrl: "/washing_machine.jpeg",
  },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly electronics
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
