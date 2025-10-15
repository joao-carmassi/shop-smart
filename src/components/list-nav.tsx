'use client';

import { ArrowRight, ArrowUp, Menu, Pen, Trash } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { Combobox } from './example-combobox';
import { useState } from 'react';

function ListNav(): React.ReactNode {
  const [groups, setGroups] = useState<string[]>(['mercado', 'conveniencia']);
  const [item, setItem] = useState('');
  const [group, setGroup] = useState('');
  const [open, setOpen] = useState(false);

  function handleValueChange(newGroup: string, newGroups: string[]) {
    setGroup(newGroup);
    setGroups(newGroups);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ item: item, grupo: group });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem>
            <Pen /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowUp /> Exportar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-red-500 hover:text-foreground group'>
            <Trash className='text-red-500 group-hover:text-muted-foreground' />
            Apagar item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='w-full'>
            Adicionar <ArrowRight />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Adicionar item</DialogTitle>
              <DialogDescription asChild>
                <div className='grid grid-cols-[1fr_auto] gap-3'>
                  <div className='grid gap-1.5'>
                    <Label htmlFor='item' className=''>
                      Item
                    </Label>
                    <Input
                      id='item'
                      placeholder='Digite o título do item'
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                    />
                  </div>
                  <div className='grid gap-1.5'>
                    <Label htmlFor='group' className=''>
                      Grupo
                    </Label>
                    <Combobox
                      items={groups}
                      value={group}
                      onValueChange={handleValueChange}
                      id='group'
                    />
                  </div>
                </div>
              </DialogDescription>
              <DialogFooter>
                <Button type='submit'>Adicionar item</Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setOpen(false);
                    setItem('');
                    setGroup('');
                  }}
                >
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogHeader>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ListNav;
