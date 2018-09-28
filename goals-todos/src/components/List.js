import React from 'react';

export default (list = { items, toggle, remove }(
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <span
          onClick={() => toggle && toggle(item.id)}
          style={{ textDecoration: item.complete ? 'line-through' : 'none' }}>
          {item.name}
        </span>
      </li>
    ))}
  </ul>,
));
