import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index'
import { Router } from 'react-router-dom';
import {createMemoryHistory} from "history"

test("Landing",()=>{
  const history = createMemoryHistory()
  render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  )
  expect(screen.getByText(/Welcome to PI-FOOD/i)).toBeInTheDocument()
})

test("Create Recipe",()=>{
  const history = createMemoryHistory()
  history.push('/recipe')
  render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  )
  expect(screen.getByText(/Create your own recipe/i)).toBeInTheDocument()
})

test("NavBar exists", ()=>{
  const history = createMemoryHistory()
  history.push('/recipes')
  render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  )
  expect(screen.queryByText(/All recipes/i)).toBeInTheDocument()
})

test("NavBar not exists in landing", ()=>{
  const history = createMemoryHistory()
  history.push('/')
  render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  )
  expect(screen.queryByText(/All recipes/i)).not.toBeInTheDocument()
})