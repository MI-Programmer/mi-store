import Spinner from "@/components/ui/Spinner";

const Loading = () => {
  return (
    <section className="grid h-[70vh] items-center">
      <Spinner mini={false} />
    </section>
  );
};

export default Loading;
