import type { ReactNode } from "react";

type SectionProps = {
  title?: string;
  children: ReactNode;
};

const Section = ({ children, title = "Section 1!" }: SectionProps) => {
  return (
    <section>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

export default Section;
