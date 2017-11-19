const expect = require('chai').expect
const jsdom = require('jsdom-global')()

const {
  h,
  render
} = require('../dist/understated.js')

/* eslint-env mocha */

describe('understated', () => {
  it('should support JSX', () => {
    const test = (
      <div className="content">
        <h1 className="heading">Heading</h1>
        <p>No attributes.</p>
        Text node
      </div>
    )

    const sandbox = document.createElement('div')

    render(test, sandbox)

    expect(sandbox.innerHTML).to.equal('<div class="content"><h1 class="heading">Heading</h1><p>No attributes.</p>Text node</div>')
  })

  it('should support boolean prop values', () => {
    const test = (
      <input checked={ true }/>
    )

    const sandbox = document.createElement('div')

    render(test, sandbox)

    expect(sandbox.firstChild.hasAttribute('checked')).to.equal(true)
    expect(sandbox.firstChild.checked).to.equal(true)
  })

  it('should support style objects', () => {
    const style = {
      fontWeight: '500',
      fontSize: '1.2rem'
    }

    const test = (
      <p style={ style }>Styled paragraph.</p>
    )

    const sandbox = document.createElement('div')

    render(test, sandbox)

    expect(sandbox.firstChild.style.fontWeight).to.equal('500')
    expect(sandbox.firstChild.style.fontSize).to.equal('1.2rem')
  })

  it('should render a component', () => {
    const Component = props => (
      <p className="content">{ props.text }</p>
    )

    const sandbox = document.createElement('div')

    render(
      <Component text="A functional component."/>,
      sandbox
    )

    expect(sandbox.innerHTML).to.equal('<p class="content">A functional component.</p>')
  })

  it('should render nested components', () => {
    const Parent = ({ name, style, children }) => (
      <div className={ name } style={ style }>
        { children }
      </div>
    )

    const Child = ({ text }) => (
      <p className="inner">{ text }</p>
    )

    const test = (
      <Parent
        name="outer"
        style="cursor: pointer;">
        <Child text="A nested child component."/>
        <Child text="Another nested child component."/>
      </Parent>
    )

    const sandbox = document.createElement('div')

    render(
      test,
      sandbox
    )

    expect(sandbox.innerHTML).to.equal('<div class="outer" style="cursor: pointer;"><p class="inner">A nested child component.</p><p class="inner">Another nested child component.</p></div>')
  })

  it('should render component arrays', () => {
    const Item = ({ text }) => (
      <li className="item">{ text }</li>
    )

    const items = [
      'One',
      'Two',
      'Three'
    ].map(text => <Item text={ text }/>)

    const List = ({ children }) => (
      <ul className="list">{ children }</ul>
    )

    const test = (
      <List>{ items }</List>
    )

    const sandbox = document.createElement('div')

    render(
      test,
      sandbox
    )

    expect(sandbox.innerHTML).to.equal('<ul class="list"><li class="item">One</li><li class="item">Two</li><li class="item">Three</li></ul>')
  })
})
