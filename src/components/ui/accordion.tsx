import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'group/item border border-neutral-800 rounded-2xl px-4 mb-3 last:mb-0 bg-black shadow-sm shadow-white/5 transition-[border-color,box-shadow,transform,background-color] duration-300 ease-out data-[state=open]:border-white data-[state=open]:shadow-md data-[state=open]:shadow-white/10 data-[state=open]:bg-neutral-950 hover:border-neutral-600',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-left text-sm font-medium text-white transition-all duration-300 hover:underline group outline-none',
        className
      )}
      {...props}
    >
      <span className="pr-3 transition-colors duration-300 group-data-[state=open]:text-white">
        {children}
      </span>
      <span
        className={cn(
          'ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-800',
          'transition-all duration-300 ease-out',
          'group-hover:border-neutral-500',
          'group-data-[state=open]:border-white group-data-[state=open]:bg-white group-data-[state=open]:text-black',
          'group-data-[state=open]:rotate-45 group-data-[state=open]:scale-105'
        )}
      >
        <Plus className="h-3.5 w-3.5 transition-transform duration-300" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm',
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    )}
    {...props}
  >
    <div
      className={cn(
        'pb-5 pt-0 text-neutral-400 leading-relaxed',
        'faq-answer-inner',
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
