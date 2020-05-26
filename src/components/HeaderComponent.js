import React,{Component} from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';


class Header extends Component{
    render(){
        return(
            <> 
            <Navbar className='navbar-dark'>
                <div className ='container'>
                    <NavbarBrand href="/">Restorante Confusion</NavbarBrand>
                </div>
            </Navbar>
            <Jumbotron>
            <div className ='container'>
                <div className='row row-header'>
                    <div className='col-12 col-sm-6'>
                        <h1>Restorante Confusion</h1>
                        <p>We take inspiration from world's best cuisines, and create some unique fusion experience. Our lipsmaking creations will tickle your culinary senses!</p>
                    </div>
                </div>
            </div>
            </Jumbotron>
            </>
        );
    }
}

export default Header;