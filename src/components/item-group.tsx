import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface Props {
  group: string;
  i: number;
  children?: React.ReactNode;
}

function ItemGroup({ group, i, children }: Props): React.ReactNode {
  return (
    <AccordionItem key={group} value={group}>
      <AccordionTrigger className={i === 0 ? 'pt-0' : ''}>
        {group}
      </AccordionTrigger>
      <AccordionContent>
        <ul className='space-y-5'>{children}</ul>
      </AccordionContent>
    </AccordionItem>
  );
}

export default ItemGroup;
