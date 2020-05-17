import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type NameProps = { name?: string, onChange: (name: string) => void};

export default function Name(props: NameProps) {
    const [editing, setEditing] = useState(false);
    const [localName, setLocalName] = useState(props.name || '');
    useEffect(() => {
        if (props.name !== '') {
            setLocalName(props.name || '');
        }
    }, [props.name]);
    console.log({ name: props.name, localName });
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
                        props.onChange(localName || '');
                    }}
                >
                    Save
                </Button>
            </Form>
        );
    } else {
        nameArea = (
            <span onClick={() => setEditing(true)}>
                {!!props.name ? props.name : 'Your name'}
            </span>
        );
    }
    return (
        <div>
            <strong>{nameArea}</strong>
        </div>
    );
}
