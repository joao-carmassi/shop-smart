/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface ComboboxProps
  extends React.ComponentPropsWithoutRef<'button'> {
  items: string[];
  value: string;
  onValueChange: (value: string, items: string[]) => void;
  id?: string;
  className?: string;
}

export function Combobox({
  items,
  value,
  onValueChange,
  id,
  className,
  ...rest
}: ComboboxProps): React.ReactNode {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const exists = items.some(
    (item) => item.toLowerCase() === inputValue.toLowerCase()
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          className={cn('w-[200px] justify-between shadow-none', className)}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          {...rest}
        >
          {value ? items.find((item) => item === value) : 'Grupo'}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='block w-[200px] p-0'>
        <Command>
          <CommandInput
            placeholder='Search...'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {!exists && inputValue.trim() !== '' && (
              <CommandItem
                value={inputValue}
                onSelect={() => {
                  const newItems = [...items, inputValue];
                  onValueChange(inputValue, newItems);
                  setOpen(false);
                  setInputValue('');
                }}
              >
                <CheckIcon className='mr-2 h-4 w-4 opacity-100' />
                Criar {inputValue}
              </CommandItem>
            )}
            {items
              .filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue: any) => {
                    onValueChange(
                      currentValue === value ? '' : currentValue,
                      items
                    );
                    setOpen(false);
                    setInputValue('');
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            <CommandEmpty>Sem itens.</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
