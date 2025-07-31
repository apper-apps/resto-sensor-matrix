import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const DroppableColumn = ({ status, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 transition-colors duration-200 ${
        isOver ? 'bg-primary-50 ring-2 ring-primary-200 ring-inset rounded-lg' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default DroppableColumn;