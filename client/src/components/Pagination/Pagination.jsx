import React from 'react';
import { connect } from 'react-redux';
import Recipes from '../Recipes/Recipes';
import Recipe from '../Recipe/Recipe';
import {getRecipes,getDiets} from '../../actions/index'
import store from '../../store/index'
import Filters from '../Filters/Filters';
import './Pagination.css'
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.recipes,
      recipes:this.props.recipes,
      currentPage: 1,
      todosPerPage: 8,
      diets: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  
  componentDidMount(){
    this.unsubscribeStore = store.subscribe(() => {
      this.setState({
        todos: this.props.recipes,
        currentPage: 1,
        todosPerPage: 8
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  };


  render() {
    const { todos, currentPage, todosPerPage } = this.state;
  
    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={index}>{todo}</li>;
    });
    const firstHalf = []
    const secondHalf = []
    for (let index = 0; index < renderTodos.length; index++) {
      if(index<renderTodos.length/2){
        firstHalf.push(renderTodos[index])
      }else{
        secondHalf.push(renderTodos[index])
      }
    }
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="pagination">
        <Filters/>
        <div className="section-meals">
          <ul className="meals-showcase">
          <Recipes>
                  {
                    firstHalf.map(recipe=><li> <Recipe id={recipe.props.children.id} image={recipe.props.children.image} title={recipe.props.children.title} diets={recipe.props.children.diets}/></li>)
                  }
          </Recipes>
          </ul>
          <ul className="meals-showcase">
          <Recipes >
                  {
                    secondHalf.map(recipe=><li> <Recipe id={recipe.props.children.id} image={recipe.props.children.image} title={recipe.props.children.title} diets={recipe.props.children.diets}/></li>)
                  }
          </Recipes>
          </ul>
        </div>
        <ul className="page-numbers" id="page-numbers" >
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

function mapStatesToProps(state){
  return {
    recipes: state.recipes,
  }
}

export default connect(mapStatesToProps, { getRecipes } )(Pagination);