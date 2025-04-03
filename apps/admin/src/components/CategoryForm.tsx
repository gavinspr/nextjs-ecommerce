"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuFolderPlus } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImageDropzone } from "@/components/ImageDropzone";
import {
  Category,
  categoryFormSchema,
  CategoryFormValues,
} from "@nextjs-ecommerce/db/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "./SubmitButton";
import { toast } from "sonner";
import { useNavigationGuard } from "@/hooks/use-navigation-guard";
import { DiscardAlertButton } from "./DiscardAlertButton";

// todo: add products to category section

interface CategoryFormProps {
  initialData?: Category | null;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
}

export const CategoryForm = ({ initialData, onSubmit }: CategoryFormProps) => {
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description || "",
          image: undefined,
        }
      : {
          name: "",
          description: "",
          image: undefined,
        },
  });

  useNavigationGuard({ isDirty: form.formState.isDirty });

  const handleConfirmDiscard = () => {
    form.reset();
    router.push("/products/categories");
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    // Create the loading toast
    const loadingToastId = toast.loading(
      initialData ? "Updating category..." : "Creating category..."
    );

    try {
      // Execute the submission
      await onSubmit(values);

      // Dismiss the loading toast and show success
      toast.dismiss(loadingToastId);
      toast.success(
        initialData
          ? "Category updated successfully"
          : "Category created successfully"
      );

      // Navigate after successful submission
      router.push("/products/categories");
    } catch (error: unknown) {
      // Dismiss the loading toast and show error
      toast.dismiss(loadingToastId);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="tracking-tight flex items-center gap-2">
            <LuFolderPlus className="mt-0.5" />
            {initialData ? "Edit Category" : "Add New Category"}
          </h1>
          <div className="flex gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
            <DiscardAlertButton
              onConfirm={handleConfirmDiscard}
              isDirty={form.formState.isDirty}
              isSubmitting={form.formState.isSubmitting}
            />
            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              label={initialData ? "Save Changes" : "Add Category"}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="w-full lg:w-4/5 xl:w-3/4 gap-4">
          <div className="space-y-6">
            {/* Category Information Section */}
            <div className="flex-1 space-y-4 bg-muted rounded-md p-4 md:p-6">
              <h2>Category Information</h2>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Fields */}
                <div className="lg:col-span-3 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Category Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Category name"
                            className="bg-background"
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe the category"
                            className="min-h-[120px] md:min-h-[150px] bg-background resize-none"
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image upload */}
                <div className="lg:col-span-2">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="h-full flex flex-col">
                        <FormLabel required>Category Image</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                            existingImage={initialData?.image}
                            className="h-full min-h-[180px] md:min-h-[200px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Add Products Section */}
            <div className="space-y-4 bg-muted rounded-md p-4 md:p-6">
              <div className="flex items-center justify-between">
                <h2>
                  Products in Category
                  <span className="ml-2 text-muted-foreground">0</span>
                </h2>
              </div>
              <Separator />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
