import React, { useState, useEffect, SyntheticEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type NameProps = { name?: string; onChange: (name: string) => void };

export default function Name(props: NameProps) {
  const [editing, setEditing] = useState(false);
  const [localName, setLocalName] = useState(props.name || '');
  useEffect(() => {
    if (props.name !== '') {
      setLocalName(props.name || '');
    }
  }, [props.name]);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    handleClick();
  }

  function handleClick() {
    setEditing(false);
    props.onChange(localName || '');
  }

  let nameArea;
  if (editing) {
    nameArea = (
      <Form inline onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          value={localName}
          onChange={(event) => setLocalName(event.target.value)}
        ></Form.Control>
        <Button onClick={handleClick}>Save</Button>
      </Form>
    );
  } else {
    nameArea = (
      <span onClick={() => setEditing(true)}>
        {!!localName ? localName : 'Your name'}
      </span>
    );
  }
  return <strong>{nameArea}</strong>;
}
