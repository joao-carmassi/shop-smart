import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { IItem } from '@/types/item';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';

interface Props {
  item: IItem;
}

function ItemRow({ item }: Props): React.ReactNode {
  return (
    <li key={item.id} className='flex items-center gap-3 justify-between'>
      <div className='flex items-center gap-1.5'>
        <Checkbox checked={item.checked} id={`terms-${item.id}`} />
        <Label
          className={`capitalize ${item.checked && 'line-through'}`}
          htmlFor={`terms-${item.id}`}
        >
          {item.title}
        </Label>
      </div>
      <Button className='hidden' size={'sm'}>
        <Trash />
      </Button>
    </li>
  );
}

export default ItemRow;
