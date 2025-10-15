import ItemGroup from '@/components/item-group';
import ItemRow from '@/components/item-row';
import ListNav from '@/components/list-nav';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const data = [
  { id: '1', title: 'Item 1', checked: false, group: 'A' },
  { id: '2', title: 'Item 2', checked: true, group: 'B' },
  { id: '3', title: 'Item 3', checked: false, group: 'A' },
  { id: '4', title: 'Item 4', checked: true, group: 'B' },
  { id: '5', title: 'Item 5', checked: false, group: 'A' },
  { id: '6', title: 'Item 6', checked: true, group: 'C' },
  { id: '7', title: 'Item 7', checked: false, group: 'C' },
  { id: '8', title: 'Item 8', checked: true, group: 'A' },
  { id: '9', title: 'Item 9', checked: false, group: 'B' },
  { id: '10', title: 'Item 10', checked: true, group: 'C' },
];

const groups = [...new Set(data.map((item) => item.group))];

export default function Home() {
  return (
    <main className='mx-auto max-w-7xl md:p-12 min-h-[26rem] h-screen flex items-center justify-center'>
      <Card className='rounded-none shadow-none border-0 md:rounded-2xl md:shadow-md w-full max-w-lg h-full'>
        <CardHeader>
          <CardDescription className='grid grid-cols-[auto_1fr] gap-y-2 gap-x-3'>
            <ListNav />
          </CardDescription>
        </CardHeader>
        <CardContent className='bg-red-50 rounded-md p-4 h-full'>
          <Accordion type='multiple'>
            {groups.map((group, i) => (
              <ItemGroup group={group} i={i} key={group}>
                {data
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <ItemRow key={item.id} item={item} />
                  ))}
              </ItemGroup>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button variant='link' size='sm'>
            Selecionar Todos
          </Button>
          <Button variant='link' size='sm'>
            Limpar Seleção
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
