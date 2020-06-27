import React, { useState } from 'react';
import { Button, Form, FormControl } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

const TodoFormComponent = ({ updatedTaskList }) => {
    const [taskValue, setTaskValue] = useState('');

    const handleChange = (event) => {
        setTaskValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updatedTaskList(taskValue);

        setTaskValue('');
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text" 
                            placeholder="Add Task" 
                            value={taskValue} 
                            onChange={handleChange} 
                        />
                        <InputGroup.Append>
                            <Button type="submit" variant="outline-secondary">Add Task</Button>
                        </InputGroup.Append>
                    </InputGroup>
            </Form>
        </div>
    );
};

export default TodoFormComponent;
