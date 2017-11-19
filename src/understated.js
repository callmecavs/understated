const h = (tag, props, ...children) => {
  return {
    tag,
    props: props || {},
    children: [].concat(...children)
  }
}

export { h }

const createText = str => document.createTextNode(str)

const setClassAttr = (node, value) => node.setAttribute('class', value)

const setBooleanAttr = (node, name, value) => {
  if (value) {
    node.setAttribute(name, '')
    node[name] = true
  } else {
    node[name] = false
  }
}

const setStyleAttr = (node, value) => {
  if (typeof value === 'string') {
    node.setAttribute('style', value)
  } else {
    Object
      .keys(value)
      .forEach(key => {
        node.style[key] = value[key]
      })
  }
}

const createNode = (tag, props, children, ns) => {
  const svg = ns || tag === 'svg'

  const node = svg
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag)

  Object
    .keys(props)
    .forEach(name => {
      const value = props[name]

      if (name === 'className') {
        setClassAttr(node, value)
      } else if (name === 'style') {
        setStyleAttr(node, value)
      } else if (typeof value === 'boolean') {
        setBooleanAttr(node, name, value)
      } else {
        node.setAttribute(name, value)
      }
    })

  children.forEach(child => render(child, node, svg))

  return node
}

const createComponent = (tag, props, children) => {
  props['children'] = children
  return build(tag(props))
}

const build = (obj, ns) => {
  if (typeof obj === 'string') {
    return createText(obj)
  } else if (typeof obj.tag === 'function') {
    return createComponent(obj.tag, obj.props, obj.children)
  } else {
    return createNode(obj.tag, obj.props, obj.children, ns)
  }
}

const render = (tree, target, ns = false) => {
  target.appendChild(build(tree, ns))
}

export { render }
