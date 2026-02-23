'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { Combobox } from './combobox';
import { useEffect, useState } from 'react';
import useItemsStore from '@/store/items';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { IItem } from '@/types/item';

const schema = z.object({
  item: z.string().min(1, 'Item é obrigatório'),
  group: z.string(),
});

type TSchema = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: IItem;
}

function ItemDialog({ open, onOpenChange, editItem }: Props): React.ReactNode {
  const { addItem, updateItem, groups: storeGroups } = useItemsStore();
  const [localGroups, setLocalGroups] = useState<string[]>([]);
  const [group, setGroup] = useState(editItem?.group ?? '');

  const isEditing = !!editItem;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      item: editItem?.item ?? '',
      group: editItem?.group ?? '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({ item: editItem?.item ?? '', group: editItem?.group ?? '' });
      setGroup(editItem?.group ?? '');
      setLocalGroups([]);
    }
  }, [open, editItem, reset]);

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

  function handleSubmitForm(data: TSchema) {
    const resolvedGroup = group || 'Geral';
    if (isEditing) {
      updateItem(editItem.id, { item: data.item, group: resolvedGroup });
    } else {
      addItem({ item: data.item, group: resolvedGroup });
    }
    onOpenChange(false);
  }

  function handleClose() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar item' : 'Adicionar item'}
            </DialogTitle>
            <DialogDescription asChild>
              <div className='grid grid-cols-[1fr_auto] gap-3'>
                <div className='grid gap-1.5 w-full place-items-start'>
                  <Label htmlFor='item'>Item</Label>
                  <Input
                    id='item'
                    placeholder='Digite o item'
                    className='w-full text-foreground'
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
                  <Label htmlFor='group'>Grupo</Label>
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
              <Button type='submit'>
                {isEditing ? 'Salvar' : 'Adicionar item'}
              </Button>
              <Button type='button' variant='outline' onClick={handleClose}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDialog;
