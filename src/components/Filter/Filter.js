import { Label, StyledInput } from '../ContactForm/ContactForm.styled';

export const Filter = ({ onFilter }) => {
  return (
    <Label>
      Find contacts by name
      <StyledInput
        type="text"
        name="name"
        onChange={e => onFilter(e.target.value)}
      />
    </Label>
  );
};
