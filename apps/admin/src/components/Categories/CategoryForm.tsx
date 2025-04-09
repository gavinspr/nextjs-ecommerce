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
  CategoryFormValues,
  createCategoryFormSchema,
  updateCategoryFormSchema,
} from "@nextjs-ecommerce/db/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "../SubmitButton";
import { toast } from "sonner";
import { useNavigationGuard } from "@/hooks/use-navigation-guard";
import { DiscardAlertButton } from "../DiscardAlertButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// todo: add products to category section

interface CategoryFormProps {
  initialData?: Category | null;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const CategoryForm = ({ initialData, onSubmit }: CategoryFormProps) => {
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(
      initialData ? updateCategoryFormSchema : createCategoryFormSchema
    ),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description || "",
          image: undefined,
          isActive: initialData.isActive,
        }
      : {
          name: "",
          description: "",
          image: undefined,
          isActive: true,
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
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, value.toString());
        }
      });

      await onSubmit(formData);

      toast.dismiss(loadingToastId);
      toast.success(
        initialData
          ? "Category updated successfully"
          : "Category created successfully"
      );
      router.push("/products/categories");
    } catch (error: unknown) {
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
            <Card className="bg-muted">
              <CardHeader className="flex justify-between items-center">
                <h2>Category Information</h2>
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between mt-1 md:mt-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="scale-90 md:scale-100 "
                        />
                      </FormControl>
                      <FormLabel>Active</FormLabel>
                    </FormItem>
                  )}
                />
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Add Products Section */}
            <Card className="bg-muted">
              <CardHeader>
                <h2>
                  Products in Category
                  <span className="ml-2 text-muted-foreground">0</span>
                </h2>
              </CardHeader>
              <Separator />
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};
