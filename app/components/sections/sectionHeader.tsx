import React from "react";

type Props = {
  plainText: string;
  highlightText: string;
};

const SectionHeader = ({ plainText, highlightText }: Props) => {
  return (
    <h2 className="text-[22px] md:text-[35px] px-20 text-center" role="heading" aria-level={2}>
      {plainText}
      <span className="highlight px-2 whitespace-nowrap">{highlightText}</span>
    </h2>
  );
};

export default SectionHeader;
