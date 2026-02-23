'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { IItem } from '@/types/item';
import { Button } from './ui/button';
import { Pen, Trash } from 'lucide-react';
import useItemsStore from '@/store/items';
import { useState } from 'react';
import ItemDialog from './item-dialog';

interface Props {
  item: IItem;
}

function ItemRow({ item }: Props): React.ReactNode {
  const {
    toggleItemSelection,
    removeItem,
    isEditing: editing,
  } = useItemsStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <li key={item.id} className='flex items-center gap-3 justify-between'>
      <div className='flex items-center gap-1.5 w-full'>
        <Checkbox
          onCheckedChange={() => toggleItemSelection(item.id)}
          checked={item.checked}
          id={`terms-${item.id}`}
        />
        <Label
          className={`capitalize w-full ${item.checked && 'line-through'}`}
          htmlFor={`terms-${item.id}`}
        >
          {item.item}
        </Label>
      </div>
      {editing && (
        <div className='flex gap-1'>
          <Button onClick={() => setEditDialogOpen(true)} size={'sm'}>
            <Pen />
          </Button>
          <Button onClick={() => removeItem(item.id)} size={'sm'}>
            <Trash />
          </Button>
        </div>
      )}
      <ItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        editItem={item}
      />
    </li>
  );
}

export default ItemRow;
