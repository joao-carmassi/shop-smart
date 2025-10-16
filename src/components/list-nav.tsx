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
import { Combobox } from './combobox';
import { useState } from 'react';
import useItemsStore from '@/store/items';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  item: z.string().min(1, 'Item é obrigatório'),
  group: z.string(),
});

type TSchema = z.infer<typeof schema>;

function ListNav(): React.ReactNode {
  const {
    clearItems,
    addItem,
    groups: storeGroups,
    setEditing,
    exportState,
  } = useItemsStore();
  const [localGroups, setLocalGroups] = useState<string[]>([]);
  const [group, setGroup] = useState('');
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  function handleValueChange(newGroup: string, newGroups?: string[]) {
    setGroup(newGroup);
    if (
      newGroups &&
      !storeGroups.includes(newGroup) &&
      !localGroups.includes(newGroup)
    ) {
      setLocalGroups([...localGroups, newGroup]);
    }
  }

  function handleClick(data: TSchema) {
    addItem({
      item: data.item,
      group: group ? group : 'Geral',
    });
    reset();
    setGroup('');
    setOpen(false);
    setLocalGroups([]);
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
          <DropdownMenuItem onClick={() => setEditing(true)}>
            <Pen /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const compressed = exportState();
              navigator.clipboard.writeText(compressed);
              alert('Lista copiada para a área de transferência!');
            }}
          >
            <ArrowUp /> Exportar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => clearItems()}
            className='text-red-500 hover:text-foreground group'
          >
            <Trash className='text-red-500 group-hover:text-muted-foreground' />
            Apagar itens
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
          <form onSubmit={handleSubmit(handleClick)}>
            <DialogHeader>
              <DialogTitle>Adicionar item</DialogTitle>
              <DialogDescription asChild>
                <div className='grid grid-cols-[1fr_auto] gap-3'>
                  <div className='grid gap-1.5 w-full place-items-start'>
                    <Label htmlFor='item' className=''>
                      Item
                    </Label>
                    <Input
                      id='item'
                      placeholder='Digite o item'
                      className='w-full'
                      {...register('item')}
                      autoComplete='off'
                      aria-invalid={errors.item ? 'true' : 'false'}
                    />
                    {errors.item && (
                      <span className='text-sm text-red-500'>
                        {errors.item.message}
                      </span>
                    )}
                  </div>
                  <div className='grid gap-1.5 place-items-start'>
                    <Label htmlFor='group' className=''>
                      Grupo
                    </Label>
                    <Combobox
                      items={[...storeGroups, ...localGroups]}
                      value={group}
                      onValueChange={handleValueChange}
                      id='group'
                      className='w-fit'
                      {...register('group')}
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
                    reset();
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
