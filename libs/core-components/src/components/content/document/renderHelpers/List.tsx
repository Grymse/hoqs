export const List: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ul className="list-disc flex flex-col gap-2 ml-4 mt-2 [&>li>strong]:text-pink-500 dark:[&>li>strong]:text-cyan-600">
      {children}
    </ul>
  );
};

export const OrderedList: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ol className="list-decimal [&>li>ol]:list-disc flex flex-col gap-2 ml-4 mt-2 [&>li>strong]:text-pink-500 dark:[&>li>strong]:text-cyan-600">
      {children}
    </ol>
  );
};
