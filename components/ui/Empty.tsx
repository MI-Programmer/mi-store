const Empty = ({ children }: { children: string }) => {
  return (
    <p className="col-span-2 text-lg font-medium">
      No {children} could be found.
    </p>
  );
};

export default Empty;
