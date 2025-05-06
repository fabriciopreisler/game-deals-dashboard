import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={`
      flex h-10 w-full items-center justify-between rounded-md border border-gray-600 
      bg-gray-800 px-3 py-2 text-sm text-white transition-colors
      hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-roxo-500 
      disabled:cursor-not-allowed disabled:opacity-50 ${className}
    `}
    {...props}
  >
    <span className="truncate flex-1 text-left">
      {children}
    </span>
    <ChevronDown className="h-4 w-4 text-gray-400" />
  </SelectPrimitive.Trigger>
));

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={`
        relative z-50 min-w-[var(--radix-select-trigger-width)]
        overflow-hidden rounded-md border border-gray-600 bg-gray-800
        text-white shadow-lg data-[state=open]:animate-in
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95 ${className}
      `}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={`py-1.5 pl-8 pr-2 text-sm font-semibold text-gray-300 ${className}`}
    {...props}
  />
));

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={`
      relative flex w-full cursor-default select-none items-center 
      rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none 
      focus:bg-gray-700 data-[disabled]:pointer-events-none 
      data-[disabled]:opacity-50 hover:bg-gray-700/60
      transition-colors duration-100 ${className}
    `}
    {...props}
  >
    <SelectPrimitive.ItemText className="truncate">
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
};