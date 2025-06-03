import type { ReactElement } from "react";

type HeadingProps = { title: string };

const Heading = ({ title }: HeadingProps): ReactElement => {
  return <h2>{title}</h2>;
};

export default Heading;
