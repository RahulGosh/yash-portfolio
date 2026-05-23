import React from "react";

type Props = React.PropsWithChildren<{
  id: string;
}>;

const SectionContainer = ({ children, id }: Props) => {
  return (
    <div>
      <section id={id} className="w-full relative flex justify-center z-30">
        {children}
      </section>
    </div>
  );
};

export default SectionContainer;