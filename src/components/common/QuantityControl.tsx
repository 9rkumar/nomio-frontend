import React, { useState } from 'react';
import Button from './Button';

interface QuantityControlProps {
  initialQty?: number;
  onAdd: (quantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ initialQty = 1, onAdd }) => {
  const [quantity, setQuantity] = useState(initialQty);

  return (
    <div className="quantity-add">
      <Button
        className="quantity-btn"
        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        className="quantity-btn"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        +
      </Button>
      <Button onClick={() => onAdd(quantity)}>Add</Button>
    </div>
  );
};

export default QuantityControl;