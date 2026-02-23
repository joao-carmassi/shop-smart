'use client';

import React, { useEffect, useState } from 'react';
import ItemGroup from '@/components/item-group';
import ItemRow from '@/components/item-row';
import ListNav from '@/components/list-nav';
import { Accordion } from '@/components/ui/accordion';
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
import { useRouter, useSearchParams } from 'next/navigation';
import LZString from 'lz-string';

export default function Home(): React.ReactNode {
  const { items, groups, isEditing: editing, importItems } = useItemsStore();
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const importParam = params.get('import');

  useEffect(() => {
    if (importParam) {
      const decoded = LZString.decompressFromEncodedURIComponent(importParam);
      if (decoded) {
        const items = JSON.parse(decoded);
        importItems(items);
        router.replace(
          `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH}`,
        );
      }
    }
  }, [importParam, importItems, router]);

  useEffect(() => {
    setAccordionValue([...groups]);
  }, [groups]);

  return (
    <main className='mx-auto max-w-7xl md:p-12 min-h-screen h-svh flex flex-col items-center justify-between'>
      <Card className='rounded-none shadow-none border-0 md:rounded-2xl md:shadow-md w-full max-w-lg h-full'>
        <CardHeader>
          <CardDescription className='grid grid-cols-[auto_1fr] gap-y-2 gap-x-3'>
            <ListNav />
          </CardDescription>
        </CardHeader>
        <CardContent className='bg-red-50 rounded-md p-4 h-full overflow-auto custom-scrollbar'>
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
        <CardFooter>
          {editing && (
            <Banner className='w-full rounded-xl'>
              <BannerIcon icon={Pen} />
              <BannerTitle>Editando</BannerTitle>
              <BannerAction>Sair do modo edição</BannerAction>
            </Banner>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
