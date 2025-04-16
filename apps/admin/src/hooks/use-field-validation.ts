import { useEffect, useState } from "react";
import { debounce } from "@/utils/debounce";
import { isValueUnique } from "@/lib/validations/db/is-value-unique";
import { capitalizeWords } from "@/utils/string-utils";
import pluralize from "pluralize";

export function useFieldValidation(
  tableName: string,
  fieldName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any,
  initialId?: string,
  options: {
    minLength?: number;
    debounceTime?: number;
    idColumn?: string;
  } = {}
) {
  const { minLength = 2, debounceTime = 500, idColumn = "id" } = options;
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const debouncedCheck = debounce(async (value: string) => {
      if (!value || value.length < minLength) return;

      setIsChecking(true);
      try {
        const isUnique = await isValueUnique(
          tableName,
          fieldName,
          value,
          initialId
        );

        const formattedTableName = capitalizeWords(
          pluralize.singular(tableName)
        );

        if (!isUnique) {
          form.setError(fieldName, {
            type: "manual",
            message: `${formattedTableName} ${fieldName} already exists`,
          });
        } else {
          form.clearErrors(fieldName);
        }
      } catch (error) {
        console.error(`Failed to check ${fieldName}:`, error);
      } finally {
        setIsChecking(false);
      }
    }, debounceTime);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = form.watch((values: any) => {
      if (values[fieldName]) {
        debouncedCheck(values[fieldName]);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedCheck.cancel();
    };
  }, [
    form,
    initialId,
    tableName,
    fieldName,
    minLength,
    debounceTime,
    idColumn,
  ]);

  return { isChecking };
}
