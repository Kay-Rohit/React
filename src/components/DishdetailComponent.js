import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
    
class CommentForm extends Component
{
    constructor(props) {
        super(props);

        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
  
render()
{
    return(
        <>
          <Button color="light-grey" onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Col xs={12}>
                    <Label htmlFor="rating" ><strong>Rating</strong></Label>
                  </Col>
                  <Col xs={12}>
                    <Control.select model=".rating" name="rating"
                        className="form-control">
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                       <option>5</option>
                       </Control.select>
                  </Col>
                                
                </Row>
                <Row className="form-group">
                  <Col xs={12}>
                    <Label htmlFor="yourname"><strong>Your Name</strong></Label>
                  </Col>
                                        
                  <Col xs={12}>
                    <Control.text model=".yourname" id="yourname" name="yourname"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                      }}
                    />
                                            <Errors
                                                className="text-danger"
                                                model=".yourname"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                             />
                  </Col>
                                        
                                    </Row>
                                    <Row className="form-group">
                                        <Col xs={12}>
                                        <Label htmlFor="comment"><strong>Comment</strong></Label>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <Control.textarea model=".comment" id="comment" name="comment"
                                                placeholder="Comment"
                                                className="form-control"  
                                                rows="10"                                              
                                                 />                                            
                                        </Col>
                                        
                                    </Row>
        
                <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
        </ModalBody>
    </Modal>
      </>
       
    );
}    
}

function RenderDish(dishDetail) {
  return (
    <Card>
      <CardImg top src={dishDetail.image} alt={dishDetail.name} />
      <CardBody>
        <CardTitle>{dishDetail.name}</CardTitle>
        <CardText>{dishDetail.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments(comments) {
  return comments.comments.map((comment, i) => (
    <li key={i} className="commentList">
      {comment.comment}
      <br />
      <br />
      -- {comment.author},
      {new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
      }).format(new Date(Date.parse(comment.date)))}
      <br />
      <br />
    </li>
  ));
}

const Dishdetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish {...props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
          <CommentForm />
        </div>
      </div>
    </div>
  );
};



export default Dishdetail;