import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import Recipes from '../Recipes/Recipes';
import Recipe from '../Recipe/Recipe';
import './Pagination.css'

function Pagination({recipes}) {
  const [state, setState] = useState({
    todos: recipes,
    currentPage: 1,
    todosPerPage: 8,
  })

  useEffect(() => {
    setState({
      todos: recipes,
      currentPage: 1,
      todosPerPage: 8
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes])

  const handleClick = (e) => {
    setState({
      ...state,
      currentPage: Number(e.target.id)
    })
  }
    // Logic for displaying current todos
    const indexOfLastTodo = (state.currentPage * state.todosPerPage);
    const indexOfFirstTodo = indexOfLastTodo - state.todosPerPage;
    const currentTodos = state.todos.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={index}>{todo}</li>;
    });
    const firstHalf = []
    const secondHalf = []
    for (let index = 0; index < renderTodos.length; index++) {
      if(index<4){
        firstHalf.push(renderTodos[index])
      }else{
        secondHalf.push(renderTodos[index])
      }
    }
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(state.todos.length / state.todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if(number===state.currentPage){
        return (
          <li className = 'pageActive'
            key={number}
            id={number}
            onClick={handleClick}
          >
            {number}
          </li>
        );
      }else{
        return (
          <li
            key={number}
            id={number}
            onClick={handleClick}
          >
            {number}
          </li>
        );
      }
      
    });

    return (
      <div className="pagination">
        <div className="section-meals">
          <ul className="meals-showcase">
          <Recipes>
                  {
                    firstHalf.map((recipe,index)=><li key={index}> <Recipe id={recipe.props.children.id} image={recipe.props.children.image} title={recipe.props.children.title} diets={recipe.props.children.diets} spoonacularScore={recipe.props.children.spoonacularScore}/></li>)
                  }
          </Recipes>
          </ul>
          <ul className="meals-showcase">
          <Recipes >
                  {
                    secondHalf.map((recipe,index)=><li key={index}> <Recipe id={recipe.props.children.id} image={recipe.props.children.image} title={recipe.props.children.title} diets={recipe.props.children.diets} spoonacularScore={recipe.props.children.spoonacularScore}/></li>)
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

function mapStatesToProps(state){
  return {
    recipes: state.recipes,
  }
}

export default connect(mapStatesToProps, null )(Pagination);