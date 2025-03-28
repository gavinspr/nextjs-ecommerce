import { AddProduct } from "../../../../components/AddProduct";
import { CustomizeProduct } from "../../../../components/CustomizeProduct";
import { ProductImages } from "../../../../components/ProductImages";

export default function ProductPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vero
          nihil laboriosam possimus maiores placeat nostrum praesentium? Illo,
          laboriosam commodi molestiae libero eaque culpa blanditiis optio
          repellat, dolorem fuga consectetur.
        </p>
        <div className="h-[2px] bg-blue-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$59</h3>
          <h2 className="font-medium text-2xl">$49</h2>
        </div>
        <div className="h-[2px] bg-blue-100" />
        <CustomizeProduct />
        <AddProduct />
        <div className="h-[2px] bg-blue-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
            laudantium repellendus totam at, eos qui? Exercitationem vel
            voluptas numquam adipisci iure modi maiores! Accusamus quaerat,
            temporibus atque tempora dicta quisquam.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
            laudantium repellendus totam at, eos qui? Exercitationem vel
            voluptas numquam adipisci iure modi maiores! Accusamus quaerat,
            temporibus atque tempora dicta quisquam.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
            laudantium repellendus totam at, eos qui? Exercitationem vel
            voluptas numquam adipisci iure modi maiores! Accusamus quaerat,
            temporibus atque tempora dicta quisquam.
          </p>
        </div>
      </div>
    </div>
  );
}
