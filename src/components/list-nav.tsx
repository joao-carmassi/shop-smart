'use client';

import { ArrowRight, Check, FileUp, Menu, Pen, Trash, X } from 'lucide-react';
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
} from './ui/dialog';
import { useState } from 'react';
import useItemsStore from '@/store/items';
import ItemDialog from './item-dialog';

function ListNav(): React.ReactNode {
  const { clearItems, setEditing, exportState, selectAll, clearSelection } =
    useItemsStore();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
          <DropdownMenuItem onClick={selectAll}>
            <Check /> Selecionar Tudo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={clearSelection}>
            <X /> Limpar Seleção
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const compressed = exportState();
              navigator.clipboard.writeText(compressed);
              alert('Lista copiada para a área de transferência!');
            }}
          >
            <FileUp /> Exportar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-red-500 focus:text-red-500'
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash className='text-red-500' />
            Apagar itens
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. Isso irá apagar permanentemente
              todos os itens da sua lista.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='destructive'
              onClick={() => {
                clearItems();
                setDeleteDialogOpen(false);
              }}
            >
              Apagar
            </Button>
            <Button
              variant='outline'
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button className='w-full' onClick={() => setOpen(true)}>
        Adicionar <ArrowRight />
      </Button>

      <ItemDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export default ListNav;
