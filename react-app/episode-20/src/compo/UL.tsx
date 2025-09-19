// ---------------- Generic UL Component ----------------

// <T> means this component is generic and can work with any item type
// T will be "filled in" automatically by TypeScript when you use the component
export function UL<T>({
  items,
  render,
  itemClick,
}: {
  // An array of items of type T
  items: T[];

  // A render function that takes one item (type T) and returns JSX/ReactNode
  render: (item: T) => React.ReactNode;

  // A callback that runs when an item is clicked
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        // Using index as key for simplicity (better to use a unique id in real apps)
        <li key={index} onClick={() => itemClick(item)}>
          {/* Render the item using the provided render function */}
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

// example of use
{
  /* <UL
  items={["apple", "banana", "orange"]}
  render={(item) => <span>{item.toUpperCase()}</span>}
  itemClick={(item) => console.log("Clicked:", item)}
/>; */
}
