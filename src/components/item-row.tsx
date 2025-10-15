'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { IItem } from '@/types/item';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import useItemsStore from '@/store/items';

interface Props {
  item: IItem;
}

function ItemRow({ item }: Props): React.ReactNode {
  const {
    toggleItemSelection,
    removeItem,
    isEditing: editing,
  } = useItemsStore();

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
        <Button onClick={() => removeItem(item.id)} size={'sm'}>
          <Trash />
        </Button>
      )}
    </li>
  );
}

export default ItemRow;
