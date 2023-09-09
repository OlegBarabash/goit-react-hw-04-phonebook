import { ListItem, List } from './ContactList.styled';

export const ContactList = ({ contArr, onDelete }) => {
  if (contArr.length) {
    return (
      <List>
        {contArr.map(cont => (
          <ListItem key={cont.id}>
            {cont.contactName}: {cont.number}
            <button onClick={() => onDelete(cont.id)}>Delete</button>
          </ListItem>
        ))}
      </List>
    );
  }
};
