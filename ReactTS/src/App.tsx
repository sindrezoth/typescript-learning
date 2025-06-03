import { useState } from 'react';

import Counter from "./components/Counter";
import Heading from "./components/Heading";
import Section from "./components/Section";
import List from './components/List';

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <h1>Hello</h1>
      <Heading title="React TS!"/>
      <Section>
        <p>Section paragraph</p>
      </Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List 
        items={["coffee", "chocolate", "cigarette"]}
        render={(item: string) => <span className="gold">{item}</span>}
      >
      </List>
    </>
  );
}

export default App;
