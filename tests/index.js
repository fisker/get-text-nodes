import test from 'ava'
import {JSDOM} from 'jsdom'
import dedent from 'dedent'
import getTextNodes from '../src/index.js'

const {window} = new JSDOM(dedent`
  <!DOCTYPE html>
  <html>
    <body>
      textNode1
      <div id="js-has-child">
        textNode2
        <div>
          textNode3
        </div>
        textNode4
      </div>
      <div id="js-no-child">
        textNode5
      </div>
    </body>
  </html>
`)

const {document} = window
const firstTextNode = getTextNodes(document.body)[0]

test('main', (t) => {
  t.true(Array.isArray(getTextNodes(document.body)), 'should return array')
})

test('nodeList', (t) => {
  const cases = [
    {
      constructor: window.Node,
      list: document.body,
    },
    {
      constructor: firstTextNode.constructor,
      list: firstTextNode,
    },
    {
      constructor: window.HTMLCollection,
      list: document.getElementsByTagName('*'),
    },
    {
      constructor: window.NodeList,
      list: document.querySelectorAll('*'),
    },
    {
      constructor: Array,
      list: [...document.getElementsByTagName('*')],
    },
    {
      tag: 'Arguments',
      list: (function () {
        return arguments
      })(...document.getElementsByTagName('*')),
    },
  ]

  for (const {constructor, tag, list} of cases) {
    if (constructor) {
      t.true(list instanceof constructor)
    } else if (tag) {
      t.is(Object.prototype.toString.call(list), `[object ${tag}]`)
    }
    t.true(
      getTextNodes(list).includes(firstTextNode),
      `should accept ${constructor ? constructor.name : tag}`,
    )
  }
})

test('options.deep', (t) => {
  const nodes = getTextNodes(document.getElementById('js-has-child'))
  const nodes2 = getTextNodes(document.getElementById('js-has-child'), {
    deep: true,
  })
  const nodes3 = getTextNodes(document.getElementById('js-has-child'), {
    deep: false,
  })

  t.deepEqual(nodes, nodes2, 'options.deep should be default true')
  t.true(nodes2.length > nodes3.length)
  t.true(
    nodes2.some((node) => node.nodeValue.trim() === 'textNode3'),
    'should include child node text nodes',
  )
  t.true(
    nodes3.every((node) => node.nodeValue.trim() !== 'textNode3'),
    'should not include child node text nodes',
  )
})

test('options.ignoreWhiteSpace', (t) => {
  const nodes = getTextNodes(document.body)
  const nodes2 = getTextNodes(document.body, {ignoreWhiteSpace: false})
  const nodes3 = getTextNodes(document.body, {ignoreWhiteSpace: true})

  t.deepEqual(nodes, nodes3, 'options.ignoreWhiteSpace should be default false')
  t.true(nodes2.length > nodes3.length)
  t.true(
    nodes.every((node) => node.nodeValue.trim() !== ''),
    'should has empty node',
  )
  t.true(
    nodes2.some((node) => node.nodeValue.trim() === ''),
    'should not has empty node',
  )
})
