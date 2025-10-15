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

function ListNav(): React.ReactNode {
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full'>
            Adicionar <ArrowRight />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar item</DialogTitle>
            <DialogDescription asChild>
              <div className='grid grid-cols-[1fr_auto] gap-3'>
                <div>
                  <Label htmlFor='item' className='mb-2'>
                    Título
                  </Label>
                  <Input id='item' placeholder='Digite o título do item' />
                </div>
                <div>
                  <Label htmlFor='group' className='mb-2 mt-4'>
                    Grupo
                  </Label>
                  <Input id='group' placeholder='Digite o grupo do item' />
                </div>
              </div>
            </DialogDescription>
            <DialogFooter>
              <Button type='submit'>Adicionar item</Button>
              <Button type='button' variant='outline'>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ListNav;
