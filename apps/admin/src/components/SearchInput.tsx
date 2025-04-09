"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  FormEvent,
  ChangeEvent,
  useMemo,
} from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
  debounceTime?: number;
  clearOnSearch?: boolean;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  expandedWidth?: number;
}

export const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  className,
  initialValue = "",
  debounceTime = 300,
  clearOnSearch = false,
  isCollapsible = false,
  defaultExpanded = false,
  expandedWidth = 64,
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isExpanded, setIsExpanded] = useState(
    defaultExpanded || !isCollapsible
  );
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        onSearch(value);
        if (clearOnSearch) {
          setSearchTerm("");
        }
      }, debounceTime);
    },
    [debounceTime, clearOnSearch, onSearch] 
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      if (clearOnSearch) {
        setSearchTerm("");
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
    inputRef.current?.focus();
  };

  const expandSearch = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleBlur = () => {
    if (isCollapsible && !searchTerm.trim()) {
      setTimeout(() => {
        if (
          !inputRef.current?.contains(document.activeElement) &&
          !searchTerm.trim()
        ) {
          setIsExpanded(false);
        }
      }, 150);
    }
  };

  const expandedMaxWidth = useMemo(
    () => `${expandedWidth * 0.25}rem`,
    [expandedWidth]
  );

  return (
    <div className={cn("relative flex items-center", className)}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        {isCollapsible && !isExpanded && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full p-0"
            onClick={expandSearch}
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}

        <div
          className={cn(
            "relative flex items-center transition-[max-width,opacity] duration-300 ease-in-out overflow-hidden",
            isExpanded ? "opacity-100" : "opacity-0",
            isCollapsible ? "max-w-0" : "max-w-full"
          )}
          style={{
            maxWidth: isExpanded ? expandedMaxWidth : undefined,
          }}
        >
          <div className="relative flex w-full items-center rounded-md border bg-background shadow-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="h-9 w-full border-0 pl-9 pr-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
