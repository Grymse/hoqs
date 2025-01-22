import clsx from 'clsx';

export const Table: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="border-collapse border-spacing-0 w-full">
        {children}
      </table>
    </div>
  );
};

export const Thead: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <thead
      className={clsx(
        '[&>tr]:h-12',
        '[&>tr>th]:py-0',
        '[&>tr>th]:align-middle',
        '[&>tr>th]:bg-default-400/20',
        'dark:[&>tr>th]:bg-default-600/10',
        '[&>tr>th]:text-default-600 [&>tr>th]:text-xs',
        '[&>tr>th]:text-left [&>tr>th]:pl-2',
        '[&>tr>th:first-child]:rounded-l-lg',
        '[&>tr>th:last-child]:rounded-r-lg'
      )}
    >
      {children}
    </thead>
  );
};
export const Trow: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <tr>{children}</tr>;
};

export const Tcol: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <td className="text-sm p-2 max-w-[200px] overflow-auto whitespace-normal break-normal">
      {children}
    </td>
  );
};
