import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { ArrowRight, Menu, Trash } from 'lucide-react';

export default function Home() {
  return (
    <main className='mx-auto max-w-7xl md:p-12 min-h-[26rem] h-screen flex items-center justify-center'>
      <Card className='rounded-none shadow-none border-0 md:rounded-2xl md:shadow-md w-full max-w-lg h-full'>
        <CardHeader>
          <CardDescription className='grid grid-cols-[auto_1fr] gap-y-2 gap-x-3'>
            <Button>
              <Menu />
            </Button>
            <Button className='w-full'>
              Adicionar <ArrowRight />
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className='bg-red-50 rounded-md p-4 h-full'>
          <Accordion type='multiple'>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='capitalize pt-0'>
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                <ul className='space-y-5'>
                  <li className='flex items-center gap-3 justify-between'>
                    <div className='flex items-center gap-1.5'>
                      <Checkbox id='terms-1' />
                      <Label className='capitalize' htmlFor='terms-1'>
                        teste - 1
                      </Label>
                    </div>
                    <Button className='hidden' size={'sm'}>
                      <Trash />
                    </Button>
                  </li>
                  <li className='flex items-center gap-3 justify-between'>
                    <div className='flex items-center gap-1.5'>
                      <Checkbox id='terms-2' />
                      <Label className='capitalize' htmlFor='terms-2'>
                        teste - 2
                      </Label>
                    </div>
                    <Button className='hidden' size={'sm'}>
                      <Trash />
                    </Button>
                  </li>
                  <li className='flex items-center gap-3 justify-between'>
                    <div className='flex items-center gap-1.5'>
                      <Checkbox id='terms-3' />
                      <Label className='capitalize' htmlFor='terms-3'>
                        teste - 3
                      </Label>
                    </div>
                    <Button className='hidden' size={'sm'}>
                      <Trash />
                    </Button>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
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
