const Spinner = ({ mini = true }: { mini?: boolean }) => {
  return <div className={mini ? "spinner-mini" : "spinner"}></div>;
};

export default Spinner;
