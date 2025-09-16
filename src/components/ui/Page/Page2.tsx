import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import Header2 from '@/components/Header2';

interface IProps {
  containerClassName?: string;
  pageClassName?: string;
}

const Page2: React.FC<React.PropsWithChildren<IProps>> = ({
  containerClassName,
  children,
  pageClassName,
}) => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col bg-white text-[#0a0a0a] transition-colors duration-300',
        pageClassName
      )}
    >
      <Header2 />
      <main className={cn('flex flex-1 flex-col items-center px-1 md:px-3', containerClassName)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Page2;
