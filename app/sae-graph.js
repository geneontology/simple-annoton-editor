import _ from 'lodash';

export default class SaeGraph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.numberOfEdges = 0;
  }

  findNode(id) {
    return _.find(nodes, {
      id: id
    });
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node.id] = {}
    this.edges[node.id]['nodes'] = [];
  };

  removeNode(node) {
    var index = this.nodes.indexOf(node);
    if (~index) {
      this.nodes.splice(index, 1);
    }
    while (this.edges[node].length) {
      var adjacentNode = this.edges[node].pop();
      this.removeEdge(adjacentNode, node);
    }
  };
  addEdge(source, target, edgeId) {
    this.edges[source.id].edgeId = edgeId;
    this.edges[source.id]['nodes'].push(target);
    //this.edges[target].push(source);
    this.numberOfEdges++;
  };
  removeEdge(source, target) {
    var index1 = this.edges[source] ? this.edges[source].indexOf(target) : -1;
    var index2 = this.edges[target] ? this.edges[target].indexOf(source) : -1;
    if (~index1) {
      this.edges[source].splice(index1, 1);
      this.numberOfEdges--;
    }
    if (~index2) {
      this.edges[target].splice(index2, 1);
    }
  };

  size() {
    return this.nodes.length;
  };

  relations() {
    return this.numberOfEdges;
  };

  traverseDFS(node, fn) {
    if (!~this.nodes.indexOf(node)) {
      return console.log('Node not found');
    }
    var visited = [];
    this._traverseDFS(node, visited, fn);
  };

  _traverseDFS(node, visited, fn) {
    visited[node] = true;
    if (this.edges[node] !== undefined) {
      fn(node);
    }
    for (var i = 0; i < this.edges[node].length; i++) {
      if (!visited[this.edges[node][i]]) {
        this._traverseDFS(this.edges[node][i], visited, fn);
      }
    }
  };

  traverseBFS(node, fn) {
    if (!~this.nodes.indexOf(node)) {
      return console.log('Node not found');
    }
    var queue = [];
    queue.push(node);
    var visited = [];
    visited[node] = true;

    while (queue.length) {
      node = queue.shift();
      fn(node);
      for (var i = 0; i < this.edges[node].length; i++) {
        if (!visited[this.edges[node][i]]) {
          visited[this.edges[node][i]] = true;
          queue.push(this.edges[node][i]);
        }
      }
    }
  };
  pathFromTo(nodeSource, nodeDestination) {
    if (!~this.nodes.indexOf(nodeSource)) {
      return console.log('Node not found');
    }
    var queue = [];
    queue.push(nodeSource);
    var visited = [];
    visited[nodeSource] = true;
    var paths = [];

    while (queue.length) {
      var node = queue.shift();
      for (var i = 0; i < this.edges[node].length; i++) {
        if (!visited[this.edges[node][i]]) {
          visited[this.edges[node][i]] = true;
          queue.push(this.edges[node][i]);
          // save paths between nodes
          paths[this.edges[node][i]] = node;
        }
      }
    }
    if (!visited[nodeDestination]) {
      return undefined;
    }

    var path = [];
    for (var j = nodeDestination; j != nodeSource; j = paths[j]) {
      path.push(j);
    }
    path.push(j);
    return path.reverse().join('-');
  };
  print() {
    console.log(this.nodes.map(function (node) {
      return (node + ' -> ' + this.edges[node].join(', ')).trim();
    }, this).join(' | '));
  };

}