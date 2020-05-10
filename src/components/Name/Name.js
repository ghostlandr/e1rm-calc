import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Name({ name, saveName }) {
    const [editing, setEditing] = useState(false);
    const [localName, setLocalName] = useState(name);
    let nameArea;
    if (editing) {
        nameArea = (
            <Form inline>
                <Form.Control
                    type="text"
                    value={localName}
                    onChange={(event) => setLocalName(event.target.value)}
                ></Form.Control>
                <Button
                    onClick={() => {
                        setEditing(false);
                        saveName(localName);
                    }}
                >
                    Save
                </Button>
            </Form>
        );
    } else {
        nameArea = (
            <span data-testid="name" onClick={() => setEditing(true)}>
                {name !== null ? name : 'Your name'}
            </span>
        );
    }
    return (
        <div>
            <strong>{nameArea}</strong>
        </div>
    );
}
