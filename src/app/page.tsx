import { HomeSlider } from "@/components/HomeSlider";
import { ProductsList } from "@/components/ProductsList";

export default function HomePage() {
  return (
    <div className="">
      <HomeSlider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductsList />
      </div>
    </div>
  );
}
