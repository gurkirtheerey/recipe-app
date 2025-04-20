type WithId = {
  id: string | number;
};

type ModalItemProps<T extends WithId> = {
  item: T;
  handleClick: (item: T) => void;
  selectedItems: T[];
  renderLabel: (item: T) => string;
  selectedIcon: React.ReactNode;
};

// Add "extends WithId" here ↓
const ModalItem = <T extends WithId>({
  item,
  handleClick,
  selectedItems,
  renderLabel,
  selectedIcon,
}: ModalItemProps<T>) => {
  return (
    <div
      onClick={() => handleClick(item)}
      className={
        'flex items-center justify-between border border-gray-200 bg-gray-200 rounded w-full px-4 py-2 shadow-md cursor-pointer hover:bg-gray-50'
      }
    >
      <h2>{renderLabel(item)}</h2>
      {selectedItems.find((t) => t.id === item.id) && selectedIcon}
    </div>
  );
};

export default ModalItem;
