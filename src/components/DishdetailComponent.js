import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

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
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
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
      <CardImg top src={baseUrl + dishDetail.image} alt={dishDetail.name} />
      <CardBody>
        <CardTitle>{dishDetail.name}</CardTitle>
        <CardText>{dishDetail.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment => (
          <ul key={comment.id} className="list-unstyled">
            <li className="mb-2">{comment.comment}</li>
            <li>
              -- {comment.author}{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </li>
          </ul>
        ))}
        <CommentForm addComment={addComment} dishId={dishId} />
      </div>
    );
  } else return <div />;
}

const Dishdetail = props => {
  if(props.isLoading) {
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
          <div className='row'>
            <h4>{props.errMess}</h4>
          </div>
      </div>
    );
  }
  else{
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
            <RenderComments comments={props.comments} 
              addComment={props.addComment}
              dishId={props.dish.id} />
          </div>
        </div>
      </div>
    );
  }
};



export default Dishdetail;