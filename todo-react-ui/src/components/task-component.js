import React from 'react';
import { ListGroup, Button, Row, Col } from "react-bootstrap";

const TaskComponent = ({ todo, remove, user }) => {
    return <>
        <ListGroup.Item>
            <Row>
                <Col xs={12} md={8}>{todo.task}</Col>        
                <Col xs={6} md={4}>
                    <Button onClick={(event) => remove(todo.id)}
                        size="sm" disabled={user && user.role !== 'Admin'}>
                        Remove Task
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item> 
        
    </>;
}

export default TaskComponent;