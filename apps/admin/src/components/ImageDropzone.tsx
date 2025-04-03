"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { LuUpload, LuX } from "react-icons/lu";
import { cn } from "@/lib/utils";
import Image from "next/image";

// todo: add images by url

interface ImageDropzoneProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  existingImage?: string;
  className?: string;
}

export function ImageDropzone({
  value,
  onChange,
  existingImage,
  className,
}: ImageDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles[0] || null);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      maxSize: 5 * 1024 * 1024, // 5MB
      multiple: false,
    });

  const previewUrl = useMemo(() => {
    if (value) return URL.createObjectURL(value);
    if (existingImage) return existingImage;
    return null;
  }, [value, existingImage]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative h-64 w-full cursor-pointer rounded-lg border-2 border-dashed transition-colors",
        "hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/50",
        isDragReject && "border-destructive",
        className
      )}
    >
      <input {...getInputProps()} />

      {previewUrl ? (
        <div className="relative h-full w-full">
          <Image
            src={previewUrl}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white shadow-sm transition hover:bg-destructive/90"
          >
            <LuX className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition group-hover:bg-muted/80">
            <LuUpload className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-1">
            <p
              className={cn(
                "text-sm font-medium transition-colors",
                isDragActive ? "text-primary" : "text-foreground"
              )}
            >
              {isDragActive
                ? "Drop image here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, WEBP (Max 5MB)
            </p>
          </div>

          {isDragReject && (
            <p className="text-xs text-destructive">Unsupported file type</p>
          )}
        </div>
      )}
    </div>
  );
}
