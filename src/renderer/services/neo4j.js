import neo4j from 'neo4j-driver/lib/v1';
import _ from 'lodash';

/**
 * @class Session
 * @param {*} session
 */
const Session = class {
  constructor(session) {
    this.session = session;
    this.nodeLabels = [];
    this.relationTypes = [];
  }
  async getAllNodeLabels(refresh) {
    if (!refresh && this.nodeLabels.length) {
      return this.nodeLabels;
    }
    const res = await this.session.run('CALL db.labels()');
    const { records } = res;
    const labels = {};
    records.forEach((record) => {
      const lbl = record.get('label');
      const cnt = 0;
      labels[lbl] = labels[lbl] || 0;
      labels[lbl] += cnt;
      // const cnt = record.get('count') - 0;
      // lbls.forEach((l) => {
      //   labels[l] = labels[l] || 0;
      //   labels[l] += cnt;
      // });
    });
    this.nodeLabels = Object.keys(labels).map(l => ({ label: l, count: labels[l] }));
    return this.nodeLabels;
  }
  async getAllRelationTypes(refresh) {
    if (!refresh && this.relationTypes.length) {
      return this.relationTypes;
    }
    const res = await this.session.run('call db.relationshipTypes()');
    const { records } = res;
    const types = {};
    records.forEach((record) => {
      const type = record.get('relationshipType');
      const cnt = 0;
      // const cnt = record.get('count') - 0;
      types[type] = types[type] || 0;
      types[type] += cnt;
    });
    this.relationTypes = Object.keys(types).map(l => ({ type: l, count: types[l] }));
    return this.relationTypes;
  }
  async getSchemaGraph() {
    const [types, labels] = await Promise.all([
      this.session.run('MATCH (m)-[r]->(n) RETURN DISTINCT labels(m) as m, type(r) as r, labels(n) as n, count(*) AS count ORDER BY count DESC'),
      this.session.run('MATCH (m) RETURN DISTINCT labels(m) as m, count(*) AS count ORDER BY count DESC'),
    ]);
    const nodes = labels.records.map(label => ({
      id: label.get('m').join(','),
      label: label.get('m').join(','),
      value: label.get('count') - 0,
      model: {},
    }));

    const edges = types.records.map(type => ({
      from: type.get('m').join(','),
      to: type.get('n').join(','),
      label: type.get('r'),
      value: type.get('count') - 0,
    }));

    const allSchemas = {
      edges,
      nodes,
    };
    return allSchemas;
  }
  async getGraphByCypher(cypher) {
    function flatten(input) {
      if (!input.forEach) {
        return [input];
      }
      let result = [];
      input.forEach((o) => {
        result = result.concat(flatten(o));
      });
      return result;
    }
    function splitNodesAndRelations(records) {
      const list = flatten(records);
      let nodes = [];
      let relations = [];
      list.forEach((item) => {
        if (item instanceof neo4j.types.Node) {
          nodes.push(item);
        }
        if (item instanceof neo4j.types.Relationship) {
          relations.push(item);
        }
        if (item instanceof neo4j.types.Path) {
          item.segments.forEach((segment) => {
            const { start, end, relationship } = segment;
            nodes.push(start, end);
            relations.push(relationship);
          });
        }
      });
      nodes = _.uniqBy(nodes, 'identity');
      relations = _.unionBy(relations, 'identity');
      return {
        nodes,
        relations,
      };
    }
    // async function getNodesInRecords(records) {
    //   splitNodesAndRelations(records);
    // }
    // async function getRelationsInRecords() {
    //   // const {nodes, realtions} = splitNodesAndRelations(records);
    //   // console.log(records);
    // }
    let result = {};
    const res = await this.session.run(cypher);
    const { nodes, relations } = splitNodesAndRelations(res.records);
    const visNodes = _.uniqBy(nodes.map(node => ({
      id: `${node.identity.toNumber()}`,
      ...node,
    })), 'id');
    const visEdges = _.uniqBy(relations.map(r => ({
      ...r,
      id: `${r.identity.toNumber()}`,
      from: `${r.start.toNumber()}`,
      to: `${r.end.toNumber()}`,
    })), 'id');
    result = {
      edges: visEdges,
      nodes: visNodes,
    };
    return result;
  }
  /**
   * @function close
   */
  close() {
    return this.session.close();
  }
};

/**
 * 连接管理容器
 */
const pool = {};
/**
 * @function testConnection
 * @param {*} connection
 */
const testConnection = async (connection) => {
  const {
    host, port, user, password,
  } = connection;
  const uri = `bolt://${host}:${port}`;
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();
  try {
    await session.run('MATCH (n:a) return n LIMIT 1');
    return false;
  } catch (e) {
    return e;
  }
};


/**
 * @function connect
 * @param {*} connection
 */
const connect = async (connection) => {
  const {
    host, port, user, password, id,
  } = connection;
  const uri = `bolt://${host}:${port}`;
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();
  await session.run('MATCH (n:a) return n LIMIT 1');
  pool[id] = new Session(session);
};

const disconnect = (id) => {
  if (pool[id]) {
    pool[id].close();
    delete pool[id];
  }
};


export default null;
export { testConnection, connect, pool, disconnect };
