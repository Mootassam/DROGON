import React from 'react';

function ListNumberDuplicate(props) {
  const { wrongNumbers } = props;
  return (
    <div className="list__wrong">
      <h1>
        Please correct this items ({wrongNumbers.length})
      </h1>

      <ul className="list__scroll">
        {wrongNumbers.map((item, index) => (
          <li>
            {index + 1}) {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListNumberDuplicate;
