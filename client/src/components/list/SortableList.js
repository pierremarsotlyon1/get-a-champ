import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import {List} from 'material-ui/List';

const SortableItem = SortableElement(({value}) =>
  value
);

const SortableList = SortableContainer(({items}) => {
  return (
    <List>
      {
        items.length > 0
          ?
          items.map((value, index) => {
            if (value && value.value) {
              return <SortableItem key={index} index={index} value={value.value}/>
            }
          })
          : undefined
      }
    </List>
  );
});

export default SortableList;