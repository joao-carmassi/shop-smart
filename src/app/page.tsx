'use client';

import React, { useEffect, useState } from 'react';
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
import useItemsStore from '@/store/items';
import {
  Banner,
  BannerAction,
  BannerIcon,
  BannerTitle,
} from '@/components/kibo-ui/banner';
import { Pen } from 'lucide-react';

export default function Home(): React.ReactNode {
  const {
    items,
    groups,
    selectAll,
    clearSelection,
    isEditing: editing,
  } = useItemsStore();
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  useEffect(() => {
    setAccordionValue([...groups]);
  }, [groups]);

  return (
    <main className='mx-auto max-w-7xl md:p-12 min-h-[26rem] h-screen flex items-center justify-center'>
      <Card className='rounded-none shadow-none border-0 md:rounded-2xl md:shadow-md w-full max-w-lg h-full'>
        <CardHeader>
          <CardDescription className='grid grid-cols-[auto_1fr] gap-y-2 gap-x-3'>
            <ListNav />
          </CardDescription>
        </CardHeader>
        <CardContent className='bg-red-50 rounded-md p-4 h-full'>
          <Accordion
            value={accordionValue}
            onValueChange={setAccordionValue}
            type='multiple'
          >
            {groups.map((group, i) => (
              <ItemGroup group={group} i={i} key={group}>
                {items
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <ItemRow key={item.id} item={item} />
                  ))}
              </ItemGroup>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button onClick={selectAll} variant='link' size='sm'>
            Selecionar Todos
          </Button>
          <Button onClick={clearSelection} variant='link' size='sm'>
            Limpar Seleção
          </Button>
        </CardFooter>
      </Card>
      {editing && (
        <Banner className='fixed bottom-0 w-full'>
          <BannerIcon icon={Pen} />
          <BannerTitle>Editando</BannerTitle>
          <BannerAction>Sair do modo edição</BannerAction>
        </Banner>
      )}
    </main>
  );
}
